import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { composicaoService } from '../services/composicaoService';

export function useComposicoes(id = null) {
  const queryClient = useQueryClient();

  // 1. BUSCAR TODAS (getAll)
  const composicoesQuery = useQuery({
    queryKey: ['composicoes'],
    queryFn: composicaoService.getAll,
    //staleTime: 1000 * 60 * 5,
    staleTime:0,
    enabled: !id, // Só busca tudo se não for passado um ID específico
  });


  // 2. BUSCAR UMA POR ID (getById)
  const composicaoByIdQuery = useQuery({
    queryKey: ['composicoes', id],
    queryFn: () => composicaoService.getById(id),
    enabled: !!id, // Só executa se o ID existir
  });

  // 3. CRIAR (store)
  const createMutation = useMutation({
    mutationFn: (data) => composicaoService.create(data),
    onSuccess: () => {
      // Invalida o cache para atualizar a lista automaticamente na tela
      queryClient.invalidateQueries({ queryKey: ['composicoes'] });
    },
  });

  // 4. ATUALIZAR (update)
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => composicaoService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['composicoes'] });
    },
  });

  // 5. DELETAR (delete)
  const deleteMutation = useMutation({
    mutationFn: (id) => composicaoService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['composicoes'] });
    },
  });

  

  return {
    // Dados e Estados de carregamento
    composicoes: composicoesQuery.data ?? [],
    composicao: composicaoByIdQuery.data,
    isLoading: composicoesQuery.isLoading || composicaoByIdQuery.isLoading,
    isError: composicoesQuery.isError || composicaoByIdQuery.isError,

    // Funções de ação
   storeComposicao: createMutation.mutate,
   updateComposicao: updateMutation.mutate,
   deleteComposicao: deleteMutation.mutate,
    
    //Status das mutações (opcional, útil para desativar botões de "Salvando...")
    isSaving: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}