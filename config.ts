//export const API_BASE_URL = 'http://localhost:3000';
 export const API_BASE_URL = 'http://macmini-acfsoft:8585/dynarest/mockprefixes/1.0';


export const ENDPOINTS = {
  getPrefixes: `${API_BASE_URL}/dashboard/prefixes`,
  deletePrefix: (id:number | string) => `${API_BASE_URL}/prefix-groups/${id}`,
  addPrefix:`${API_BASE_URL}/new-prefix-group`,
  updatePrefix: (id: number | string) => `${API_BASE_URL}/prefix-groups/${id}`,
};


