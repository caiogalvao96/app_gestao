import React from 'react'

import { useComposicoes } from '../../../hooks/useComposicoes'

const Composicao = () => {

    const { data: composicoes, isLoading, isError, error } = useComposicoes();

  if (isLoading) return <div>Carregando composições...</div>;
  
  if (isError) return <div>Erro ao buscar dados: {error.message}</div>;

  return (
    <div>
        <h1>Listagem de Composições</h1>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Unidade</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(composicoes) && composicoes.map((comp) => (
            <tr key={comp.comp_id}>
              <td>{comp.comp_codigo}</td>
              <td>{comp.comp_nome}</td>
              <td>{comp.comp_unidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Composicao