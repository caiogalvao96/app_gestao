import React,  { useState } from 'react'

import styles from './ModalAtividade.module.css'

import { useAtividade } from '../hooks/useAtividade'

import { useComposicoes } from '../hooks/useComposicoes'




const ModalAtividade = ({dadosAtividade = {}, onClose, idProjeto }) => {

const {storeAtividade, isSaving } = useAtividade();

const initialState = {
    ativ_descricao: dadosAtividade?.descricao || '',
    ativ_observacao: '',
    ativ_data_inicio: '',
    ativ_data_fim: '',
    ativ_status: dadosAtividade?.status || 'Pendente',
    ativ_concluida: dadosAtividade?.concluida || false, // Booleano: passar true ou false no JSON (sem aspas)
    obra_id: idProjeto,
    clas_id: null,
    comp_id: ''
  };

  const [formData, setFormData] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storeAtividade(formData, {
      onSuccess: () => {
        setFormData(initialState);
        alert("Atividade salva com sucesso!");
        // Limpar formulário ou fechar modal aqui
      }
    });
  };

  //carregando as composições disponiveis 
  const { composicoes, isLoading: isLoadingComp, isError: isErrorComp } = useComposicoes({ idProjeto });

  const listaComposicoes = composicoes;

   
  return (
    <div className={styles.modal}>
        <form onSubmit={handleSubmit} className={styles.modal}>
            <div className={styles.container}>
                <div className={styles.titulo}>  
                    <h2>Atividade --- {idProjeto} </h2>
                </div>
                <div className={styles.group}>
                    <div className={styles.mInput}>
                        <label>Descrição da atividade</label>
                        <input 
                        type="text" 
                        name='ativ_descricao'
                        placeholder='Ex: Lançamento de cabos...' 
                        defaultValue={dadosAtividade.descricao}
                        value={formData.ativ_descricao}
                        onChange={handleChange}
                        /> 
                    </div>
                    <div className={styles.mInput}>
                        <label>Observação</label>
                        <input 
                        type="text" 
                        name='ativ_observacao'
                        placeholder='Ex: Atividade será executada na PG' 
                        defaultValue={dadosAtividade.obs}
                        value={formData.ativ_observacao}
                        onChange={handleChange}
                        /> 
                    </div>
                </div>
                <div className={styles.group}>
                    <div className={styles.groupInputs}>
                        <label>Data de início</label>
                        <input 
                        type="date" 
                        name='ativ_data_inicio'
                        defaultValue={dadosAtividade.dataInicio}
                        value={formData.ativ_data_inicio}
                        onChange={handleChange}
                        />
                    </div>
                    <div className={styles.groupInputs}>
                        <label>Previsão de término</label>
                        <input 
                        type="date" 
                        name='ativ_data_fim'
                        defaultValue={dadosAtividade.dataFim}
                        value={formData.ativ_data_fim}
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={styles.group}>
                    <div className={styles.groupInputs}>
                        <label>Status</label>
                        <select 
                            name="ativ_status" 
                            value={formData.ativ_status} 
                            onChange={handleChange}
                            className={styles.nativeSelect}
                        >
                            <option value="Pendente">Pendente</option>
                            <option value="Atrasada">Em andamento</option>
                            <option value="Concluída">Concluída</option>
                        </select>
                    </div>
                    <div className={styles.groupInputs}>
                        <label>Recurso</label>
                        <select 
                            name="comp_id" 
                            value={formData.comp_id} 
                            onChange={handleChange}
                            className={styles.nativeSelect}
                        >
                            <option value="">
                                Escolha uma composição...
                            </option>
                            {composicoes?.map((c) => (
                                <option key={c.comp_id} value={c.comp_id}>{c.comp_nome}</option>
                            ))}
                            
                        </select>
                    </div>
                </div>
                 
                <div className={styles.groupButtons} >
                    <button type='submit' className={styles.aButton}>{isSaving ? (
            <>
                <span className={styles.spinner}></span> 
                Salvando...
            </>
        ) : (
            'Salvar Atividade'
        )}</button>
                    <button type='button' onClick={onClose} className={styles.aButton}>Fechar</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default ModalAtividade