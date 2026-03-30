import axios from 'axios';

const apiRM = axios.create({
  baseURL: 'https://gennariaraujo147911.rm.cloudtotvs.com.br:8051/api/est/v2',
  auth: {
    username: 'caio.galvao',
    password: 'Totvs@123',
  },
});

export const getProductsRM = async (searchTerm) => {
  if (!searchTerm || searchTerm.length < 3) return [];

  const { data } = await apiRM.get('/Products', {
    params: {
      // Usando a sintaxe que validamos: contains + toupper
      '$filter': `contains(toupper(Description),'${searchTerm.toUpperCase()}')`,
      'fields': 'Code,Description,UnitMeasure',
      'pageSize': 50,
    },
  });

  return data.items || [];
};