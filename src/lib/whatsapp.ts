/**
 * Monta link wa.me com mensagem pré-preenchida.
 */
export function buildWhatsAppHref(phoneHref: string, message: string): string {
  const separator = phoneHref.includes("?") ? "&" : "?";

  return `${phoneHref}${separator}text=${encodeURIComponent(message)}`;
}
