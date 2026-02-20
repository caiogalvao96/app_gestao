import React from 'react'

import { Link, useNavigate } from 'react-router-dom';

import styles from './ModalAtividade.module.css'

const ModalAtividade = ({showModal}) => {

    const navigate = useNavigate();

    const handleProjeto = (e) => {
        e.preventDefault(); // Evita o recarregamento da página
        
        // Aqui você faria sua lógica de autenticação
        console.log("Logando...");

        // 3. Redireciona para a rota definida no seu App.jsx
        navigate('/projeto');

        showModal();


    }


  return (
    <div className={styles.modal}>
            <div className={styles.container}>
                <div className={styles.titulo}>
                    <h2>Nova atividade</h2>
                </div>
                <div className={styles.mInput}>
                    <label>Descrição da atividade</label>
                    <input type="text" placeholder='Ex: Lançamento de cabos...' /> 
                </div>
                <div className={styles.mInput}>
                    <label>Observação</label>
                    <input type="text" placeholder='Ex: Atividade será executada na PG' /> 
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
                
                 <div className={styles.mInput}>
                        <label>Status da atvidade</label>
                        <input type="text" placeholder='Ex: Agendada, em andamento...'/>
                </div>
                <button className={styles.aButton}>Salvar</button>
                <button onClick={handleProjeto} className={styles.aButton}>Fechar</button>
                
            </div>
        </div>
  )
}

export default ModalAtividade