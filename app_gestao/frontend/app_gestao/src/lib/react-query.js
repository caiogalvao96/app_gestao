import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Mantém os dados no cache por 5 minutos
      retry: 1, 
      refetchOnWindowFocus: false, 
    },
  },
});