/**
 * Sintese procedural de SFX cyberpunk via Web Audio API.
 * Sem arquivos de audio — leve e compativel com GitHub Pages.
 */

export type CyberSfx =
  | "boot"
  | "click"
  | "hover"
  | "glitch"
  | "beep"
  | "memory"
  | "success";

const STORAGE_KEY = "portfolio-cyber-audio-muted";

/**
 * Engine de audio com mute persistente e unlock por gesto.
 */
export class CyberAudioEngine {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private muted = true;
  private unlocked = false;
  private lastHoverAt = 0;

  constructor() {
    if (typeof window === "undefined") {
      return;
    }
    const saved = window.localStorage.getItem(STORAGE_KEY);
    this.muted = saved === null ? true : saved === "1";
  }

  /**
   * Indica se o audio esta mudo.
   */
  isMuted(): boolean {
    return this.muted;
  }

  /**
   * Define mute e persiste a preferencia.
   *
   * Args:
   *   muted: True para silenciar.
   */
  setMuted(muted: boolean): void {
    this.muted = muted;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
    }
    if (this.master) {
      this.master.gain.value = muted ? 0 : 0.28;
    }
  }

  /**
   * Alterna mute.
   *
   * Returns:
   *   Novo estado de mute.
   */
  toggleMuted(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  /**
   * Desbloqueia AudioContext apos gesto do usuario.
   */
  async unlock(): Promise<void> {
    if (typeof window === "undefined") {
      return;
    }

    if (!this.context) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.context = new AudioCtx();
      this.master = this.context.createGain();
      this.master.gain.value = this.muted ? 0 : 0.28;
      this.master.connect(this.context.destination);
    }

    if (this.context.state === "suspended") {
      await this.context.resume();
    }

    this.unlocked = true;
  }

  /**
   * Toca um efeito sonoro.
   *
   * Args:
   *   sfx: Identificador do som.
   */
  play(sfx: CyberSfx): void {
    if (this.muted || typeof window === "undefined") {
      return;
    }

    void this.unlock().then(() => {
      if (!this.context || !this.master || this.muted) {
        return;
      }

      if (sfx === "hover") {
        const now = performance.now();
        if (now - this.lastHoverAt < 90) {
          return;
        }
        this.lastHoverAt = now;
      }

      switch (sfx) {
        case "click":
          this.tone(880, 0.05, "square", 0.18);
          this.tone(440, 0.07, "square", 0.1, 0.04);
          break;
        case "hover":
          this.tone(1320, 0.035, "triangle", 0.06);
          break;
        case "beep":
          this.tone(740, 0.08, "sine", 0.14);
          break;
        case "memory":
          this.tone(520, 0.07, "triangle", 0.12);
          this.tone(780, 0.09, "triangle", 0.1, 0.08);
          break;
        case "success":
          this.tone(523, 0.08, "sine", 0.12);
          this.tone(659, 0.09, "sine", 0.12, 0.07);
          this.tone(784, 0.12, "sine", 0.14, 0.14);
          break;
        case "boot":
          this.tone(220, 0.08, "sawtooth", 0.08);
          this.tone(330, 0.08, "sawtooth", 0.09, 0.07);
          this.tone(440, 0.1, "sawtooth", 0.1, 0.14);
          this.tone(660, 0.12, "square", 0.08, 0.22);
          break;
        case "glitch":
          this.noiseBurst(0.22, 0.16);
          break;
        default:
          break;
      }
    });
  }

  private tone(
    frequency: number,
    duration: number,
    type: OscillatorType,
    gainValue: number,
    delay = 0,
  ): void {
    if (!this.context || !this.master) {
      return;
    }

    const now = this.context.currentTime + delay;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  private noiseBurst(duration: number, gainValue: number): void {
    if (!this.context || !this.master) {
      return;
    }

    const sampleRate = this.context.sampleRate;
    const length = Math.floor(sampleRate * duration);
    const buffer = this.context.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    }

    const source = this.context.createBufferSource();
    const filter = this.context.createBiquadFilter();
    const gain = this.context.createGain();
    source.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.value = 1800;
    filter.Q.value = 0.7;
    const now = this.context.currentTime;
    gain.gain.setValueAtTime(gainValue, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    source.start(now);
    source.stop(now + duration + 0.02);
  }
}

export const cyberAudio = new CyberAudioEngine();
