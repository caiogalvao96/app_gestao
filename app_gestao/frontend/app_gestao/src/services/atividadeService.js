import api from '../api/api'

export const atividadeService = {

    getAll: async (obraId) => {
    try {
      const url = obraId ? `/atividade?obra_id=${obraId}` : '/atividade';
      const res = await api.get(url);
      return res.data;
    } catch (error) {
      console.error("Erro no Service (getAll):", error);
      throw error; // Repassa o erro para o TanStack Query detectar o 'isError'
    }
  },

    create: async (data) => {
    const res = await api.post('/atividade', data);
    return res.data;
  },

    getById: async (id) => {
    const res = await api.get(`/atividade/${id}`);
    return res.data;
  },

    update: async (id, data) => {
    const res = await api.put(`/atividade/${id}`, data);
    return res.data;
  },

    delete: async (id) => {
    const res = await api.delete(`/atividade/${id}`);
    return res.data;
  },

};