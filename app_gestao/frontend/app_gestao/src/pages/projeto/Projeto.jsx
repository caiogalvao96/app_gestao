import React, { useState } from 'react'



import styles from './Projeto.module.css'
import VisaoGeral from './secoes/VisaoGeral'

const Projeto = () => {

  const[opcao, setOpcao] = useState(1)

  const renderDetalhe = () => {
    switch(opcao){
      case 1: return <VisaoGeral/>;
        case 2:
        return(
          <h1>Atividades</h1>
        );
        case 3:
        return(
          <h1>Composições</h1>
        );
        case 4:
        return(
          <h1>Insumos</h1>
        );
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <ul>
            <li>
              <button onClick={() => setOpcao(1)}>Visão geral</button>
            </li>
            <li>
              <button onClick={() => setOpcao(2)}>Atividades</button>
            </li>
            <li>
              <button onClick={() => setOpcao(3)}>Composições</button>
            </li>
            <li>
              <button onClick={() => setOpcao(4)}>Insumos</button>
            </li>
          </ul>
        </div>
        <div className={styles.detalhe}>
            {renderDetalhe()}
        </div>
      </div>
    </div>
  )
}

export default Projeto