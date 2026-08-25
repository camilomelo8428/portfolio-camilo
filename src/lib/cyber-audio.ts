/**
 * SFX procedurais + tema musical do Audio Memory Robot.
 * Usa elemento <audio> no DOM para compatibilidade iOS/mobile.
 */

import { assetUrl } from "@/lib/assets";

export type CyberSfx =
  | "boot"
  | "click"
  | "hover"
  | "glitch"
  | "beep"
  | "memory"
  | "success";

const STORAGE_KEY = "portfolio-cyber-audio-enabled-v4";
const THEME_VOLUME = 0.1;
const SFX_MASTER_VOLUME = 0.28;

/** Seletores de elementos interativos que emitem SFX. */
export const SFX_INTERACTIVE_SELECTOR = [
  ".btn-outline",
  ".btn-whatsapp",
  ".whatsapp-float",
  ".nav-link",
  ".tech-tile",
  ".tech-filter",
  ".project-card__trigger",
  ".terminal-outdoor__dot",
  ".lang-switch",
  "a[href^='mailto:']",
  "a[href^='tel:']",
].join(", ");

export const THEME_AUDIO_SRC = assetUrl("/audio/memory-robot.mp3");

/**
 * Notifica React sobre mudanca de estado do audio.
 */
function notifyAudioChange(): void {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new CustomEvent("cyber-audio-changed"));
}

/**
 * Engine de audio com tema em loop, mute persistente e unlock por gesto.
 */
export class CyberAudioEngine {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private theme: HTMLAudioElement | null = null;
  private enabled = true;
  private primed = false;
  private unlockPromise: Promise<void> | null = null;
  private lastHoverAt = 0;
  private lastFabTapAt = 0;

  constructor() {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      this.enabled = stored === "1";
      return;
    }

    this.enabled = true;
  }

  /**
   * Indica se o audio esta habilitado pelo usuario.
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Indica se o tema esta audivel agora.
   */
  isThemeAudible(): boolean {
    return Boolean(
      this.theme && !this.theme.paused && !this.theme.muted && this.enabled,
    );
  }

  /**
   * Indica se o tema foi precarregado (mesmo mudo).
   */
  isThemePrimed(): boolean {
    return this.primed;
  }

  /**
   * Vincula o elemento <audio> renderizado no DOM.
   *
   * Args:
   *   element: Tag audio do React.
   */
  bindThemeElement(element: HTMLAudioElement): void {
    this.theme = element;
    element.loop = true;
    element.preload = "auto";
    element.volume = THEME_VOLUME;
    element.setAttribute("playsinline", "true");
    element.setAttribute("webkit-playsinline", "true");

    if (this.enabled) {
      this.primeTheme();
    } else {
      element.pause();
      element.muted = true;
    }
  }

  /**
   * Habilita ou desabilita audio e persiste a preferencia.
   *
   * Args:
   *   active: True para ligar o som.
   */
  setEnabled(active: boolean): void {
    this.enabled = active;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, active ? "1" : "0");
    }
    this.syncMasterGain();

    if (!active) {
      this.muteTheme();
    }

    notifyAudioChange();
  }

  /**
   * Tenta autoplay mudo ao carregar (permitido pelos navegadores).
   */
  primeTheme(): void {
    if (!this.enabled || !this.theme || typeof window === "undefined") {
      return;
    }

    this.theme.muted = true;
    this.theme.volume = THEME_VOLUME;

    const attempt = this.theme.play();
    if (attempt !== undefined) {
      void attempt
        .then(() => {
          this.primed = true;
          notifyAudioChange();
        })
        .catch(() => {
          this.primed = false;
        });
    }
  }

  /**
   * Desbloqueia AudioContext apos gesto do usuario.
   */
  unlock(): Promise<void> {
    if (typeof window === "undefined") {
      return Promise.resolve();
    }

    if (this.unlockPromise) {
      return this.unlockPromise;
    }

    this.unlockPromise = (async () => {
      if (!this.context) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        this.context = new AudioCtx();
        this.master = this.context.createGain();
        this.master.connect(this.context.destination);
        this.syncMasterGain();
      }

      if (this.context.state === "suspended") {
        await this.context.resume();
      }
    })();

    return this.unlockPromise.finally(() => {
      this.unlockPromise = null;
    });
  }

  /**
   * Ativa o som do tema dentro de um gesto (sync) — iOS/mobile.
   *
   * Returns:
   *   True se o tema ficou audivel.
   */
  unmuteFromGesture(): boolean {
    if (!this.enabled || !this.theme || typeof window === "undefined") {
      return false;
    }

    this.theme.muted = false;
    this.theme.volume = THEME_VOLUME;

    if (this.theme.paused) {
      const attempt = this.theme.play();
      if (attempt !== undefined) {
        void attempt.catch(() => {
          // Ignora — aguarda proximo gesto.
        });
      }
    }

    this.primed = true;
    void this.unlock();
    notifyAudioChange();
    return true;
  }

  /**
   * Handler do botao FAB — chamado por eventos nativos (touch/click).
   *
   * Returns:
   *   Novo estado audivel do tema.
   */
  handleFabGesture(): boolean {
    const now = performance.now();
    if (now - this.lastFabTapAt < 280) {
      return this.isThemeAudible();
    }
    this.lastFabTapAt = now;

    if (this.isThemeAudible()) {
      this.setEnabled(false);
      return false;
    }

    this.setEnabled(true);
    this.unmuteFromGesture();
    this.play("boot");
    return true;
  }

  /**
   * Primeiro gesto na pagina — ativa som se preferencia estiver ligada.
   */
  handlePageGesture(): void {
    if (!this.enabled || this.isThemeAudible()) {
      return;
    }
    this.unmuteFromGesture();
  }

  /**
   * Pausa e silencia o tema.
   */
  muteTheme(): void {
    if (!this.theme) {
      return;
    }
    this.theme.pause();
    this.theme.muted = true;
    this.primed = false;
    notifyAudioChange();
  }

  /**
   * Toca um efeito sonoro (no-op se desabilitado).
   *
   * Args:
   *   sfx: Identificador do som.
   *   allowReducedMotion: Se false, nao toca (acessibilidade).
   */
  play(sfx: CyberSfx, allowReducedMotion = true): void {
    if (!allowReducedMotion || !this.enabled || typeof window === "undefined") {
      return;
    }

    void this.unlock().then(() => {
      if (!this.context || !this.master || !this.enabled) {
        return;
      }

      if (sfx === "hover") {
        const now = performance.now();
        if (now - this.lastHoverAt < 120) {
          return;
        }
        this.lastHoverAt = now;
      }

      switch (sfx) {
        case "click":
          this.tone(920, 0.045, "square", 0.14);
          this.tone(520, 0.06, "square", 0.08, 0.03);
          break;
        case "hover":
          this.tone(1240, 0.028, "triangle", 0.05);
          break;
        case "beep":
          this.tone(680, 0.07, "sine", 0.11);
          break;
        case "memory":
          this.tone(480, 0.05, "triangle", 0.07);
          this.tone(720, 0.06, "triangle", 0.06, 0.06);
          break;
        case "success":
          this.tone(523, 0.07, "sine", 0.1);
          this.tone(659, 0.08, "sine", 0.1, 0.06);
          this.tone(784, 0.1, "sine", 0.11, 0.12);
          break;
        case "boot":
          this.tone(180, 0.07, "sawtooth", 0.06);
          this.tone(280, 0.07, "sawtooth", 0.07, 0.06);
          this.tone(420, 0.09, "sawtooth", 0.08, 0.12);
          this.tone(620, 0.1, "square", 0.07, 0.2);
          break;
        case "glitch":
          this.noiseBurst(0.16, 0.12);
          break;
        default:
          break;
      }
    });
  }

  private syncMasterGain(): void {
    if (this.master) {
      this.master.gain.value = this.enabled ? SFX_MASTER_VOLUME : 0;
    }
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
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(gainValue, now + 0.008);
    gain.gain.linearRampToValueAtTime(0, now + duration);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + duration + 0.03);
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
    filter.frequency.value = 1600;
    filter.Q.value = 0.6;
    const now = this.context.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(gainValue, now + 0.01);
    gain.gain.linearRampToValueAtTime(0, now + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    source.start(now);
    source.stop(now + duration + 0.03);
  }
}

export const cyberAudio = new CyberAudioEngine();

/**
 * Retorna o elemento interativo mais proximo, se existir.
 */
export function findInteractiveTarget(
  target: EventTarget | null,
): Element | null {
  if (!(target instanceof Element)) {
    return null;
  }
  return target.closest(SFX_INTERACTIVE_SELECTOR);
}

/**
 * Verifica se o alvo e o botao de audio.
 */
export function isAudioFabTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false;
  }
  return Boolean(target.closest(".audio-robot__fab"));
}
