import React from 'react'

import styles from './ModalAtividade.module.css'

const ModalAtividade = ({dadosAtividade, onClose}) => {

   
  return (
    <div className={styles.modal}>
            <div className={styles.container}>
                <div className={styles.titulo}>
                    <h2>Atividade</h2>
                </div>
                <div className={styles.group}>
                    <div className={styles.mInput}>
                        <label>Descrição da atividade</label>
                        <input type="text" placeholder='Ex: Lançamento de cabos...' defaultValue={dadosAtividade.descricao}/> 
                    </div>
                    <div className={styles.mInput}>
                        <label>Observação</label>
                        <input type="text" placeholder='Ex: Atividade será executada na PG' defaultValue={dadosAtividade.obs}/> 
                    </div>
                </div>
                <div className={styles.group}>
                    <div className={styles.groupInputs}>
                        <label>Data de início</label>
                        <input type="date" defaultValue={dadosAtividade.dataInicio}/>
                    </div>
                    <div className={styles.groupInputs}>
                        <label>Previsão de término</label>
                        <input type="date" defaultValue={dadosAtividade.dataFim}/>
                    </div>
                </div>
                
                 <div className={styles.mInput}>
                        <label>Status da atvidade</label>
                        <input type="text" placeholder='Ex: Agendada, em andamento...' defaultValue={dadosAtividade.atvStatus}/>
                </div>
                <div className={styles.groupButtons} >
                    <button className={styles.aButton}>Salvar</button>
                    <button onClick={onClose} className={styles.aButton}>Fechar</button>
                </div>
            </div>
        </div>
  )
}

export default ModalAtividade