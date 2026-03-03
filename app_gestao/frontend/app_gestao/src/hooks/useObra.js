import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { obraService } from '../services/obraService'

export function useObra (id = null){
     const queryClient = useQueryClient();

     const obrasQuery = useQuery({
         queryKey: ['obras'],
         queryFn: obraService.getAll,
         staleTime: 1000 * 60 * 5,
         //enabled: !id, // Só busca tudo se não for passado um ID específico
       });

      const createMutation = useMutation({
          mutationFn: (data) => obraService.create(data),
          onSuccess: () => {
             // Invalida o cache para atualizar a lista automaticamente na tela
          queryClient.invalidateQueries({ queryKey: ['obras'] });
           },
        });

      const obraByIdQuery = useQuery({
          queryKey: ['obras', id],
          queryFn: () => obraService.getById(id),
          enabled: !!id, // Só executa se o ID existir
        });

       return{

        obras: obrasQuery.data ?? [],
        isLoading: obrasQuery.isLoading || obraByIdQuery.isLoading,
        isError: obrasQuery.isError || obraByIdQuery.isError,

        obra: obraByIdQuery.data,

        saveObra: createMutation.mutate,
        isSaving: createMutation.isPending

       };
}