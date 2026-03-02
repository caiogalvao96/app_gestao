import { useQuery } from '@tanstack/react-query';
import { composicaoService } from '../services/composicaoService';

export function useComposicoes() {
  return useQuery({
    queryKey: ['composicoes'], // Chave única para o cache
    queryFn: composicaoService.getAll, // A função que você já criou no service
    staleTime: 1000 * 60 * 5, // Dados "frescos" por 5 minutos
  });
}