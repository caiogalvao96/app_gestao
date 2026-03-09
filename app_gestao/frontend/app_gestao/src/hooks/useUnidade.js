import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { unidadeService } from '../services/unidadeService';

export function useUnidade(id = null){
    const queryClient = useQueryClient();

    // 1. BUSCAR TODAS (getAll)
      const unidadeQuery = useQuery({
        queryKey: ['unidades'],
        queryFn: unidadeService.getAll,
        staleTime: 1000 * 60 * 5,
        enabled: !id, // Só busca tudo se não for passado um ID específico
      });

      return {
        unidades: unidadeQuery.data ?? [],
        isLoading: unidadeQuery.isLoading,
        isError: unidadeQuery.isError
      }
}