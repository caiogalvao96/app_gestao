import api from '../api/api'

export const obraService = {
    
  getAll: async () => {
    try {
      const res = await api.get('/obra');
      return res.data;
    } catch (error) {
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

    delete: async (id) => {
    const res = await api.delete(`/obra/${id}`);
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/obra/${id}`, data);
    return res.data;
  },
  // obraService.js
  calcularCustoObra: async (id) => {
    try {
        const response = await api.patch(`/obra/${id}/calcular-custo`);
        return response.data;
    } catch (error) {
        throw error; // Lança para o hook tratar
    }
  } 

};