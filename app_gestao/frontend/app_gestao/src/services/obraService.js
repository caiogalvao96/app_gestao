import api from '../api/api'

export const obraService = {
    
  getAll: async () => {
    try {
      const res = await api.get('/obra');
      return res.data;
    } catch (error) {
      console.error("Erro no Service (getAll):", error);
      throw error; // Repassa o erro para o TanStack Query detectar o 'isError'
    }
  },

  create: async (data) => {
    const res = await api.post('/obra', data);
    return res.data;
  },

    getById: async (id) => {
    const res = await api.get(`/obra/${id}`);
    return res.data;
  },

};