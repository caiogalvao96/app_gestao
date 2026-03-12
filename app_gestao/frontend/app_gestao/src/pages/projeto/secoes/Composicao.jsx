import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { TiPlus } from "react-icons/ti";

import styles from './Composicao.module.css'

import { useComposicoes } from '../../../hooks/useComposicoes'  

const Composicao = () => {

    const { composicoes, isLoading, isError, error } = useComposicoes();

    const [ativo, setAtivo ] = useState(true);


  if (isLoading) return <div>Carregando composições...</div>;
  
  if (isError) return <div>Erro ao buscar dados: {error.message}</div>;


  return (
    <div className={styles.mainComp}>
        <h2>Composições 🧱</h2>
        <div className={styles.opcoesComp}>
          <button onClick={()=> setAtivo(!ativo)}><TiPlus /></button>
        </div>

        {!ativo &&(
          <form action="">

          </form>
        )}

        {ativo &&(
            <div className={ styles.listaComp }>
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
        )}
      </div>
  )
}


export default Composicao