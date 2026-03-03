import React from 'react'

import styles from './Composicao.module.css'

import { useComposicoes } from '../../../hooks/useComposicoes'

const Composicao = () => {

    const { composicoes, isLoading, isError, error } = useComposicoes();



  if (isLoading) return <div>Carregando composições...</div>;
  
  if (isError) return <div>Erro ao buscar dados: {error.message}</div>;

  return (
    <div className={styles.mainComp}>
      <div className={styles.opcoesComp}>
        <button>Nova composição</button>
      </div>
      <div className={styles.listaComp}>
           {Array.isArray(composicoes) && composicoes.map((comp) => (
            <div key={comp.comp_id} className={styles.rowComp}>
              <div className={styles.infoComp}>
                <span>{comp.comp_id}</span>
                <span>{comp.comp_nome}</span>
                <span>{comp.comp_unidade}</span>
                <span>{comp.comp_tipo}</span>
              </div>
              <div className={styles.acoesComp}>
                <button>Excluir</button>
                <button>Editar</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}


export default Composicao