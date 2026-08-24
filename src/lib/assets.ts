/** Prefixo de assets para GitHub Pages (basePath). */
export const BASE_PATH = "/portfolio-camilo";

/**
 * Monta URL publica respeitando o basePath do Next.
 *
 * Args:
 *   path: Caminho relativo a /public (ex.: "/avatar.jpg").
 *
 * Returns:
 *   URL absoluta com basePath.
 */
export function assetUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}
