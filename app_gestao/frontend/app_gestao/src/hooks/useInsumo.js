   import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
   import { insumoService } from '../services/insumoService';

   export function useInsumo({ id = null, idProjeto = null } = {}){
    const queryClient = useQueryClient();

     const insumoQuery = useQuery ({
            queryKey: ['insumos', idProjeto],
            queryFn: ()=> insumoService.getAll(idProjeto),
            staleTime: 1000 * 60 * 5,
            enabled: !!idProjeto
        });  
    
        const insumoByIdQuery = useQuery ({
            queryKey: ['insumos', id],
            queryFn: () => insumoService.getById,
            enabled: !!id
        });
    
        const createMutation = useMutation({
            mutationFn: (data) => insumoService.create(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['insumos']});
            },
        });
    
        const updateMutation = useMutation({
            mutationFn: ({ id, data }) => insumoService.update(id, data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['insumos'] })
            },
        });
    
        const deleteMutation = useMutation({
            mutationFn: (id) => insumoService.delete(id),
            onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['insumos'] });
            },
          });



    return{

        insumos: insumoQuery.data ?? [],
        insumo: insumoByIdQuery.data,

        isLoading: insumoQuery.isLoading || insumoByIdQuery.isLoading,
        isError: insumoQuery.isError || insumoByIdQuery.isError,

        storeInsumo: createMutation.mutate,
        updateInsumo: updateMutation.mutate,
        deleteInsumo: deleteMutation.mutate, 

        isSaving: createMutation.isPending || updateMutation.isPending,
        isDeleting: deleteMutation.isPending
    }
   }