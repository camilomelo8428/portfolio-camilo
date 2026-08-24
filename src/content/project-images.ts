/**
 * Imagens dos projetos em /public/projects/.
 * Troque o arquivo mantendo o mesmo nome (recomendado: .webp ou .jpg, 1200×675px).
 */
export const PROJECT_IMAGES: Record<string, string> = {
  "Sensores AMASA": "/projects/sensores-amasa.svg",
  "JBFlexa Chat": "/projects/jbflexa-chat.svg",
  "Frequência AMASA RPM": "/projects/frequencia-amasa-rpm.svg",
  "Questionário Satisfação AMASA": "/projects/questionario-amasa.svg",
  "Lina IA Local": "/projects/lina-ia-local.svg",
};

/**
 * Retorna o caminho da imagem de um projeto, se existir.
 *
 * Args:
 *   projectName: Nome exibido do projeto.
 *
 * Returns:
 *   Caminho relativo a /public ou undefined.
 */
export function getProjectImage(projectName: string): string | undefined {
  return PROJECT_IMAGES[projectName];
}
