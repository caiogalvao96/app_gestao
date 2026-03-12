import api from '../api/api'

export const unidadeService = {
     getAll: async () => {
    try {
      const res = await api.get('/unidades');
      return res.data;
    } catch (error) {
      console.error("Erro no Service (getAll):", error);
      throw error; // Repassa o erro para o TanStack Query detectar o 'isError'
    }
  },
}