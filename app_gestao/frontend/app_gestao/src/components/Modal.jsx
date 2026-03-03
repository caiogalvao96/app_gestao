import React from 'react'

import { useState } from 'react'

import styles from './Modal.module.css'

import {useObra} from '../hooks/useObra'



const Modal = ({aberto, clicou, isSaving}) => {      

const { saveObra} = useObra();

const initialState = {
    obra_nome: '',
    obra_localizacao: '',
    obra_resp_obra: '',
    obra_resp_cliente: '',
    obra_data_inicio: '',
    obra_data_fim: ''
  };

  const [formData, setFormData] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveObra(formData, {
      onSuccess: () => {
        setFormData(initialState);
        alert("Obra salva com sucesso!");
        // Limpar formulário ou fechar modal aqui
      }
    });
  };


    
    if(!aberto) return null;
    return (
    <div className={styles.modal}>
        <form onSubmit={handleSubmit} className={styles.modal}>
            <div className={styles.container}>
                <div className={styles.titulo}>
                    <h2>Novo projeto</h2>
                </div>
                <div className={styles.mInput}>
                    <label>Nome do projeto</label>
                    <input 
                    type="text" 
                    placeholder='Ex: 1293_SUZ_JAC_ANEL DE FIBRA' 
                    name="obra_nome"
                    value={formData.obra_nome}
                    onChange={handleChange}
                    required
                    /> 
                </div>
                <div className={styles.mInput}>
                    <label>Cliente</label>
                    <input 
                    type="text" 
                    placeholder='Ex: SUZANO JACAREÍ' 
                    />
                </div>
                <div className={styles.mInput}>
                <label>Localização</label>
                <input 
                type="text" 
                placeholder='Ex: Jacareí - SP'
                name="obra_localizacao"
                value={formData.obra_localizacao}
                onChange={handleChange}
                required
                     />
                </div>
                <div className={styles.group}>
                    <div className={styles.groupInputs}>
                        <label>Data de início</label>
                        <input 
                        type="date"
                        name="obra_data_inicio"
                        value={formData.obra_data_inicio}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <div className={styles.groupInputs}>
                        <label>Previsão de término</label>
                        <input 
                        type="date"
                        name="obra_data_fim"
                        value={formData.obra_data_fim}
                        onChange={handleChange}
                        required
                        />
                    </div>
                </div>
                <div className={styles.group}>
                    <div className={styles.groupInputs}>
                        <label>Responsável projeto:</label>
                        <input 
                        type="text" 
                        placeholder='Responsável obra'
                        name="obra_resp_obra"
                        value={formData.obra_resp_obra}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <div className={styles.groupInputs}>
                        <label>Cliente responsável</label>
                        <input 
                        type="text" 
                        placeholder='Cliente responsável'
                        name="obra_resp_cliente"
                        value={formData.obra_resp_cliente}
                        onChange={handleChange}
                        required
                        />
                        
                    </div>
                </div>
                <div className={styles.groupBtn}>
                    <button onClick={clicou}>Fechar</button>
                    <button type="submit" disabled={isSaving}>
                        salvar
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Modal