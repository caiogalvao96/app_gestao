import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { atividadeService } from '../services/atividadeService';

export function useAtividade({ id = null, idProjeto = null } = {}){
    const queryClient = useQueryClient();

       
    const atividadeQuery = useQuery ({
        queryKey: ['atividades', idProjeto],
        queryFn: ()=> atividadeService.getAll(idProjeto),
        staleTime: 1000 * 60 * 5,
        enabled: !!idProjeto
    });  

    const atividadeByIdQuery = useQuery ({
        queryKey: ['atividades', id],
        queryFn: () => atividadeService.getById,
        enabled: !!id
    });

    const createMutation = useMutation({
        mutationFn: (data) => atividadeService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['atividades']});
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => atividadeService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['atividades'] })
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => atividadeService.delete(id),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['atividades'] });
        },
      });

    return {
        atividades: atividadeQuery.data ?? [],
        atividade: atividadeByIdQuery.data,

        isLoading: atividadeQuery.isLoading || atividadeByIdQuery.isLoading,
        isError: atividadeQuery.isError || atividadeByIdQuery.isError,

        storeAtividade: createMutation.mutate,
        updateAtividade: updateMutation.mutate,
        deleteAtividade: deleteMutation.mutate, 

        isSaving: createMutation.isPending || updateMutation.isPending,
        isDeleting: deleteMutation.isPending
    }
}