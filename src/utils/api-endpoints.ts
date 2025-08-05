const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ENDPOINTS = {
  /* ---------- Modifier Groups ----------- */
  getModifierGroups: `${API_BASE_URL}/modifier-groups/1/modifier`,
  getModifierGroupById: (id: number | string) =>
    `${API_BASE_URL}/modifier-groups/1/modifier/${id}`,
  addModifierGroup: `${API_BASE_URL}/modifier-groups/1/modifier`,
  updateModifierGroup: (id: number | string) =>
    `${API_BASE_URL}/modifier-groups/1/modifier/${id}`,
  deleteModifierGroup: (id: number | string) =>
    `${API_BASE_URL}/modifier-groups/1/modifier/${id}`,

  /* ---------- Prefixes ----------- */
  getPrefixes: `${API_BASE_URL}/prefixes`,
  deletePrefix: (id: number | string) => `${API_BASE_URL}/prefixes/${id}`,
  addPrefix: `${API_BASE_URL}/prefixes`,
  updatePrefix: (id: number | string) => `${API_BASE_URL}/prefixes/${id}`,
};
