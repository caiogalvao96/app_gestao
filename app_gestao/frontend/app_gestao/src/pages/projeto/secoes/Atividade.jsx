import React, { useState } from 'react'

import { RiTaskLine, RiEdit2Fill, RiDeleteBin6Line} from "react-icons/ri";
import { TiPlus } from "react-icons/ti";

import styles from './Atividade.module.css'
import ModalAtividade from '../../../components/ModalAtividade';



const Atividade = () => {


const atividade = [
    {id: 1, descricao: 'Montagem de infra', dataInicio: '2026-02-19', dataFim: '2026-02-22', atvStatus: 'Agendada', obs: 'Executar numa PP'},
    {id: 2, descricao: 'Passagem de cabos', dataInicio: '2026-02-19', dataFim: '2026-02-22', atvStatus: 'Agendada', obs: 'Executar numa PP'},
    {id: 3, descricao: 'Ligação', dataInicio: '2026-02-19', dataFim: '2026-02-22', atvStatus: 'Agendada', obs: 'Executar numa PP'},
    {id: 4, descricao: 'Teste e comissionamento', dataInicio: '2026-02-19', dataFim: '2026-02-22', atvStatus: 'Agendada', obs: 'Executar numa PP'},
    {id: 5, descricao: 'Teste e comissionamento', dataInicio: '2026-02-19', dataFim: '2026-02-22', atvStatus: 'Agendada', obs: 'Executar numa PP'},
];

const [atividadeEdicao, setAtvidadeEdicao] = useState(null);

 
if(atividadeEdicao) return (
    <ModalAtividade dadosAtividade={atividadeEdicao} onClose={() => setAtvidadeEdicao(null)}/>
)

return (
        

       
        
        <div className={styles.container}>

             

            <div className={styles.resumo}>
                <div className={styles.tAtividade}>
                    <div className={styles.atividade}>
                        <RiTaskLine className={styles.aIcon}/>
                        <h3 className={styles.h3Atividade}>Resumo das atividades</h3>
                    </div>
                    <button  className={styles.aButton}> <TiPlus/> Criar atividade</button>
                </div>
                <div className={styles.detalhes}>
                    <div className={styles.subDetalhe}>
                        <label className={styles.aLabel}>Progresso total</label>
                        <progress value={47} max={100} className={styles.progresso} />
                    </div>
                    <div className={styles.subDetalhe}>
                        <label className={styles.aLabel}>Duração total</label>
                        <label>30 dias</label>
                    </div>
                    <div className={styles.subDetalhe}>
                        <label className={styles.aLabel}>Atividades críticas</label>
                        <label>03</label>
                    </div>
                </div>
            </div>
            <div className={styles.listaAtividade}>
                {atividade.map((atv) => (
                    <div key={atv.id} className={styles.cardAtv}>
                        <div className={styles.cardInfo}>
                            <div className={styles.cardHeader}>
                                <h4>{atv.descricao}</h4>
                            </div>           
                            <div className={styles.cardBody}>
                                <p><strong>Data inicio:</strong> <span>{atv.dataInicio}</span></p>
                                <p><strong>Data fim:</strong> <span>{atv.dataFim}</span></p>
                                <p><strong>Status:</strong> <span>{atv.atvStatus}</span></p>
                                <p><strong>Observação</strong> <span>{atv.obs}</span></p>
                            </div>
                        </div>
                        <div className={styles.opcoes}>
                            <button onClick={() => setAtvidadeEdicao(atv)} className={styles.btnOpcao}> <RiEdit2Fill /> Editar</button>
                            <button className={styles.btnExcluir}> <RiDeleteBin6Line /> Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
       
  )
}

export default Atividade