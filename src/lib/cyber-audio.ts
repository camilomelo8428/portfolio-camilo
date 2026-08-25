/**
 * SFX procedurais + tema musical do Audio Memory Robot.
 *
 * - SFX (hover/click) ficam sempre ativos apos o primeiro gesto.
 * - O FAB controla apenas a musica-tema.
 * - unlock/resume rodam de forma SINCRONA no gesto (exigencia dos browsers).
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

const THEME_STORAGE_KEY = "portfolio-cyber-theme-enabled-v5";
const LEGACY_STORAGE_KEY = "portfolio-cyber-audio-enabled-v4";
const THEME_VOLUME = 0.1;
const SFX_MASTER_VOLUME = 0.42;

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
  "a[href^='#']",
  "button:not(.audio-robot__fab)",
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
 * Engine de audio: SFX sempre ativos; tema opcional via FAB.
 */
export class CyberAudioEngine {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private theme: HTMLAudioElement | null = null;
  private themeEnabled = true;
  private primed = false;
  private lastHoverAt = 0;
  private lastFabTapAt = 0;
  private lastClickAt = 0;

  constructor() {
    if (typeof window === "undefined") {
      return;
    }

    const themeStored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (themeStored !== null) {
      this.themeEnabled = themeStored === "1";
      return;
    }

    const legacy = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy !== null) {
      this.themeEnabled = legacy === "1";
      window.localStorage.setItem(
        THEME_STORAGE_KEY,
        this.themeEnabled ? "1" : "0",
      );
      return;
    }

    this.themeEnabled = true;
  }

  /**
   * Indica se a musica-tema esta habilitada pelo usuario.
   */
  isEnabled(): boolean {
    return this.themeEnabled;
  }

  /**
   * Indica se o tema esta audivel agora.
   */
  isThemeAudible(): boolean {
    return Boolean(
      this.theme &&
        !this.theme.paused &&
        !this.theme.muted &&
        this.themeEnabled,
    );
  }

  /**
   * Indica se o tema foi precarregado (mesmo mudo).
   */
  isThemePrimed(): boolean {
    return this.primed;
  }

  /**
   * Indica se o AudioContext esta pronto para SFX.
   */
  isSfxReady(): boolean {
    return Boolean(this.context && this.context.state === "running");
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

    if (this.themeEnabled) {
      this.primeTheme();
    } else {
      element.pause();
      element.muted = true;
    }
  }

  /**
   * Liga/desliga apenas a musica-tema (SFX continuam ativos).
   *
   * Args:
   *   active: True para permitir o tema.
   */
  setEnabled(active: boolean): void {
    this.themeEnabled = active;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, active ? "1" : "0");
    }

    if (!active) {
      this.muteTheme();
    }

    notifyAudioChange();
  }

  /**
   * Tenta autoplay mudo ao carregar (permitido pelos navegadores).
   */
  primeTheme(): void {
    if (!this.themeEnabled || !this.theme || typeof window === "undefined") {
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
   * Cria/resume o AudioContext de forma SINCRONA no gesto do usuario.
   * Critico para Chrome/Safari (autoplay policy).
   *
   * Returns:
   *   True se o contexto esta running (ou resume foi disparado).
   */
  unlockFromGesture(): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    if (!this.context) {
      const AudioCtx =
        window.AudioContext ||
        (
          window as unknown as {
            webkitAudioContext: typeof AudioContext;
          }
        ).webkitAudioContext;
      this.context = new AudioCtx();
      this.master = this.context.createGain();
      this.master.connect(this.context.destination);
      this.master.gain.value = SFX_MASTER_VOLUME;
    }

    if (this.context.state === "suspended") {
      // Nao usar await aqui — precisa permanecer no tick do gesto.
      void this.context.resume().then(() => {
        notifyAudioChange();
      });
    }

    if (this.master) {
      this.master.gain.value = SFX_MASTER_VOLUME;
    }

    return true;
  }

  /**
   * Compat: alias usado por codigo antigo.
   */
  unlock(): Promise<void> {
    this.unlockFromGesture();
    if (!this.context) {
      return Promise.resolve();
    }
    if (this.context.state === "running") {
      return Promise.resolve();
    }
    return this.context.resume().then(() => undefined);
  }

  /**
   * Ativa o som do tema dentro de um gesto (sync) — iOS/mobile.
   *
   * Returns:
   *   True se o tema ficou audivel.
   */
  unmuteFromGesture(): boolean {
    this.unlockFromGesture();

    if (!this.themeEnabled || !this.theme || typeof window === "undefined") {
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
    notifyAudioChange();
    return true;
  }

  /**
   * Handler do botao FAB — so controla a musica-tema.
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

    this.unlockFromGesture();

    if (this.isThemeAudible()) {
      this.setEnabled(false);
      return false;
    }

    this.setEnabled(true);
    this.unmuteFromGesture();
    this.play("boot", true);
    return true;
  }

  /**
   * Primeiro gesto na pagina — libera SFX e, se preferido, o tema.
   */
  handlePageGesture(): void {
    this.unlockFromGesture();
    if (!this.themeEnabled || this.isThemeAudible()) {
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
   * Toca um efeito sonoro (sempre ativo; ignora mute do tema).
   *
   * Args:
   *   sfx: Identificador do som.
   *   allowReducedMotion: Se false, nao toca (acessibilidade).
   */
  play(sfx: CyberSfx, allowReducedMotion = true): void {
    if (!allowReducedMotion || typeof window === "undefined") {
      return;
    }

    // Garante contexto; se ainda suspended, tenta resume e toca depois.
    this.unlockFromGesture();

    const emit = (): void => {
      if (!this.context || !this.master) {
        return;
      }
      if (this.context.state !== "running") {
        return;
      }

      this.master.gain.value = SFX_MASTER_VOLUME;

      if (sfx === "hover") {
        const now = performance.now();
        if (now - this.lastHoverAt < 90) {
          return;
        }
        this.lastHoverAt = now;
      }

      if (sfx === "click") {
        const now = performance.now();
        if (now - this.lastClickAt < 80) {
          return;
        }
        this.lastClickAt = now;
      }

      switch (sfx) {
        case "click":
          this.tone(980, 0.05, "square", 0.22);
          this.tone(560, 0.07, "square", 0.12, 0.03);
          break;
        case "hover":
          this.tone(1320, 0.035, "triangle", 0.12);
          break;
        case "beep":
          this.tone(680, 0.07, "sine", 0.14);
          break;
        case "memory":
          this.tone(480, 0.05, "triangle", 0.1);
          this.tone(720, 0.06, "triangle", 0.09, 0.06);
          break;
        case "success":
          this.tone(523, 0.07, "sine", 0.12);
          this.tone(659, 0.08, "sine", 0.12, 0.06);
          this.tone(784, 0.1, "sine", 0.13, 0.12);
          break;
        case "boot":
          this.tone(180, 0.07, "sawtooth", 0.1);
          this.tone(280, 0.07, "sawtooth", 0.11, 0.06);
          this.tone(420, 0.09, "sawtooth", 0.12, 0.12);
          this.tone(620, 0.1, "square", 0.1, 0.2);
          break;
        case "glitch":
          this.noiseBurst(0.16, 0.16);
          break;
        default:
          break;
      }
    };

    if (this.context?.state === "running") {
      emit();
      return;
    }

    void this.context?.resume().then(() => {
      emit();
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
