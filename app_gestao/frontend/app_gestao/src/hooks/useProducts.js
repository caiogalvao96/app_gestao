import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchRMProducts = async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 3) return [];

    // URL usando CONTAINS conforme solicitado
    const url = `https://gennariaraujo147911.rm.cloudtotvs.com.br:8051/api/est/v2/Products`;
    
    const response = await axios.get(url, {
        params: {
            // O RM exige PascalCase no nome do campo dentro do filtro: Description
            '$filter': `contains(Description,'${searchTerm}')`,
            'fields': 'Code,Description,UnitMeasure',
            'pageSize': 50
        },
        auth: { 
            username: 'caio.galvao', 
            password: 'Totvs@123' 
        }
    });

    return response.data.items || [];
};

export function useProducts(searchTerm) {
    return useQuery({
        queryKey: ['productsRM', searchTerm],
        queryFn: () => fetchRMProducts(searchTerm),
        enabled: !!searchTerm && searchTerm.length >= 3,
        staleTime: 1000 * 60 * 5,
        retry: false
    });
}