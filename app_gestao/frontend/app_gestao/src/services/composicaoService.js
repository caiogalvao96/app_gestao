import api from '../api/api'

export const composicaoService = {
  // Adicione o .then(res => res.data) para entregar só o que interessa
  getAll: () => api.get('/composicao').then(res => res.data),
  
  getById: (id) => api.get(`/composicao/${id}`).then(res => res.data),
  
  create: (data) => api.post('/composicao', data).then(res => res.data),
  
  update: (id, data) => api.put(`/composicao/${id}`, data).then(res => res.data),
  
  delete: (id) => api.delete(`/composicao/${id}`).then(res => res.data),
};