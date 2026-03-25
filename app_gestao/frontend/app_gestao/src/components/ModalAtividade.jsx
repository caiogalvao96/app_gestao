import React,  { useState } from 'react'

import styles from './ModalAtividade.module.css'

import { useAtividade } from '../hooks/useAtividade'

import { useComposicoes } from '../hooks/useComposicoes'




const ModalAtividade = ({dadosAtividade = {}, onClose, idProjeto }) => {

    

const {storeAtividade, updateAtividade , deleteAtividade, isSaving, isDeleting } = useAtividade();

const initialState = {
    ativ_id: dadosAtividade?.ativ_id || '',
    ativ_descricao: dadosAtividade?.ativ_descricao || '',
    ativ_observacao: dadosAtividade?.ativ_observacao || '',
    ativ_data_inicio: dadosAtividade?.ativ_data_inicio ||'',
    ativ_data_fim: dadosAtividade?.ativ_data_fim ||'',
    ativ_status: dadosAtividade?.status || 'Pendente',
    ativ_concluida: dadosAtividade?.concluida || false, // Booleano: passar true ou false no JSON (sem aspas)
    ativ_valor_unitario: dadosAtividade?.ativ_valor_unitario || 0,
    ativ_valor_total: dadosAtividade?.ativ_valor_total || 0,
    ativ_quantidade: Number(dadosAtividade?.ativ_quantidade) > 0 ? Number(dadosAtividade?.ativ_quantidade) : 1,
    obra_id: idProjeto,
    clas_id: null,
    comp_id: dadosAtividade?.comp_id || ""
  };

  const [formData, setFormData] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
        const novoEstado = { ...prev, [name]: value }

        if(name === 'comp_id'){

            const composicaoSelecionada = composicoes?.find(
                (c) => String(c.comp_id) === String(value)
            );

            novoEstado.ativ_valor_unitario = composicaoSelecionada 
                ? Number(composicaoSelecionada.comp_valor_total) 
                : 0;
        }

        const qtd = Number(novoEstado.ativ_quantidade) || 0;
        const valorUnit = Number(novoEstado.ativ_valor_unitario) || 0;

        novoEstado.ativ_valor_total = Number( qtd * valorUnit );

            return novoEstado;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload =  { ...formData, 

        comp_id: formData.comp_id === "" ? null : Number(formData.comp_id),
        ativ_quantidade: Number(formData.ativ_quantidade) || 1,
        ativ_valor_unitario: Number(formData.ativ_valor_unitario) || 0,
        obra_id: Number(idProjeto)
    };

    if(formData.ativ_id){
        updateAtividade({ id: formData.ativ_id, data:payload}, {
            onSuccess: () => {
                setFormData(initialState);
                alert("Atividade atualizada com sucesso!");
            }
        })
            console.log('Esse é o formdata',formData);
    }else{
         storeAtividade(payload, {
         onSuccess: () => {
         setFormData(initialState);
         alert("Atividade salva com sucesso!");
        // Limpar formulário ou fechar modal aqui
        }
        });
    }

   
  };

  //carregando as composições disponiveis 
  const { composicoes, isLoading: isLoadingComp, isError: isErrorComp } = useComposicoes({ idProjeto });

  const listaComposicoes = composicoes;

   
  return (
    <div className={styles.modal}>
        <form onSubmit={handleSubmit} className={styles.modal}>
            <div className={styles.container}>
                <div className={styles.titulo}>  
                    <h2>Atividade --- {} </h2>
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
                    <div className={styles.groupInputs}>
                        <label>Quantidade</label>
                        <input 
                        type="text" 
                        name='ativ_quantidade'
                        value={formData.ativ_quantidade}
                        onChange={handleChange}
                        />
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