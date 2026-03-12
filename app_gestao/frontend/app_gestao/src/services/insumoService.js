import api from '../api/api'

export const insumoService = {

    getAll: async (obraId) => {
    try {
      const url = obraId ? `/insumo?obra_id=${obraId}` : '/insumo';
      const res = await api.get(url);
      return res.data;
    } catch (error) {
      console.error("Erro no Service (getAll):", error);
      throw error; // Repassa o erro para o TanStack Query detectar o 'isError'
    }
  },

    create: async (data) => {
    const res = await api.post('/insumo', data);
    return res.data;
  },

    getById: async (id) => {
    const res = await api.get(`/insumo/${id}`);
    return res.data;
  },

    update: async (id, data) => {
    const res = await api.put(`/insumo/${id}`, data);
    return res.data;
  },

    delete: async (id) => {
    const res = await api.delete(`/insumo/${id}`);
    return res.data;
  },

}