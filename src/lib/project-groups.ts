/** Grupos de exibição dos projetos no portfólio. */
export type ProjectGroupId = "amasa" | "corporate" | "commercial" | "personal";

const GROUP_ORDER: ProjectGroupId[] = [
  "amasa",
  "corporate",
  "commercial",
  "personal",
];

/**
 * Classifica um projeto pelo campo production.
 *
 * Args:
 *   production: Contexto de produção exibido no card.
 *
 * Returns:
 *   Identificador do grupo visual.
 */
export function resolveProjectGroup(production: string): ProjectGroupId {
  const value = production.toLowerCase();

  if (value.includes("amasa") || value.includes("embarca")) {
    return "amasa";
  }

  if (value.includes("corporativo") || value.includes("corporate")) {
    return "corporate";
  }

  if (
    value.includes("comercial") ||
    value.includes("commercial") ||
    value.includes("studio")
  ) {
    return "commercial";
  }

  return "personal";
}

/**
 * Ordena grupos na sequência padrão do portfólio.
 *
 * Args:
 *   groupIds: Grupos presentes na lista de projetos.
 *
 * Returns:
 *   Grupos ordenados para renderização.
 */
export function sortProjectGroups(
  groupIds: ProjectGroupId[],
): ProjectGroupId[] {
  return GROUP_ORDER.filter((groupId) => groupIds.includes(groupId));
}
