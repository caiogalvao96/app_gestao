import api from '../api/api'

export const composicaoService = {
  // getAll com tratamento de erro básico e log para conferência
    getAll: async (obraId) => {
    try {
      const url = obraId ? `/composicao?obra_id=${obraId}` : '/composicao';
      const res = await api.get(url);
      return res.data;
    } catch (error) {
      console.error("Erro no Service (getAll):", error);
      throw error; // Repassa o erro para o TanStack Query detectar o 'isError'
    }
  },

  getById: async (id) => {
    const res = await api.get(`/composicao/${id}`);
    return res.data;
  },
  
  // No create, é bom garantir que o dado enviado não seja nulo
  create: async (data) => {
    const res = await api.post('/composicao', data);
    return res.data;
  },
  
  update: async (id, data) => {
    const res = await api.put(`/composicao/${id}`, data);
    return res.data;
  },
  
  delete: async (id) => {
    const res = await api.delete(`/composicao/${id}`);
    return res.data;
  },
};