/**
 * Imagens dos projetos em /public/projects/.
 * Uma string = capa unica; array = galeria ao expandir detalhes.
 * Sem imagem = card so com texto (sem placeholder quebrado).
 */
export const PROJECT_IMAGES: Record<string, string | string[]> = {
  "Sensores AMASA": [
    "/projects/sensores-amasa-1.jpg",
    "/projects/sensores-amasa-2.jpg",
    "/projects/sensores-amasa-3.jpg",
    "/projects/sensores-amasa-4.jpg",
    "/projects/sensores-amasa-5.jpg",
    "/projects/sensores-amasa-6.jpg",
    "/projects/sensores-amasa-7.jpg",
  ],
  // Adicione quando tiver screenshots reais, ex.:
  // "JBFlexa Chat": "/projects/jbflexa-chat.webp",
};

/**
 * Normaliza caminhos de imagem de um projeto.
 *
 * Args:
 *   projectName: Nome exibido do projeto.
 *
 * Returns:
 *   Lista de caminhos relativos a /public (pode ser vazia).
 */
export function getProjectImages(projectName: string): string[] {
  const value = PROJECT_IMAGES[projectName];
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

/**
 * Retorna a capa (primeira imagem) do projeto.
 *
 * Args:
 *   projectName: Nome exibido do projeto.
 *
 * Returns:
 *   Caminho relativo a /public ou undefined.
 */
export function getProjectImage(projectName: string): string | undefined {
  return getProjectImages(projectName)[0];
}
