import React from 'react'

import styles from './Modal.module.css'

const Modal = ({aberto, clicou}) => {   
    
    if(!aberto) return null;
    return (
    <div className={styles.modal}>
        <div className={styles.container}>
            <div className={styles.titulo}>
                <h2>Novo projeto</h2>
            </div>
            <div className={styles.mInput}>
                <label>Nome do projeto</label>
                <input type="text" placeholder='Ex: 1293_SUZ_JAC_ANEL DE FIBRA' /> 
            </div>
            <div className={styles.mInput}>
                <label>Cliente</label>
                <input type="text" placeholder='Ex: SUZANO JACAREÍ' />
            </div>
            <div className={styles.mInput}>
               <label>Localização</label>
               <input type="text" placeholder='Ex: Jacareí - SP' />
            </div>
            <div className={styles.group}>
                <div className={styles.groupInputs}>
                    <label>Data de início</label>
                    <input type="date"/>
                </div>
                <div className={styles.groupInputs}>
                    <label>Previsão de término</label>
                    <input type="date"/>
                </div>
            </div>
             <div className={styles.group}>
                <div className={styles.groupInputs}>
                    <label>Fase do projeto</label>
                    <input type="text" placeholder='Ex: Orçamento, planejamento, execução'/>
                </div>
                <div className={styles.groupInputs}>
                    <label>Custo aproximado</label>
                    <input type="text" placeholder='R$ 1.000.000,00'/>
                </div>
            </div>
            <button onClick={clicou}>Fechar</button>
        </div>
        
        
    </div>
  )
}

export default Modal