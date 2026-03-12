import React, { useState } from 'react'

import styles from './Insumo.module.css'
import { LuImport } from "react-icons/lu";
import { TiPlus } from "react-icons/ti";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import ModalInsumo from '../../../components/ModalInsumo';
import { useInsumo } from '../../../hooks/useInsumo'

const Insumo = ({ idProjeto }) => {

const [ novoInsumo, setNovoInsumo ] = useState(false);

const { insumos, isLoading, isError, deleteInsumo } = useInsumo({idProjeto});

// Estado para controlar o modal de edição
const [insumoParaEditar, setInsumoParaEditar] = useState(null);

const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este insumo?")) {
        deleteInsumo(id);
    }
};

const handleCloseModal = () => {
    setNovoInsumo(false);
    setInsumoParaEditar(null);
};

  return (
    <div className={styles.main}>
        {(novoInsumo || insumoParaEditar) && <ModalInsumo id={idProjeto} onClose={handleCloseModal} insumoExistente={insumoParaEditar}/>}

            <div className={styles.main}>
        <h2>Insumos ⚒️</h2>
        <div className={styles.opcoes}>
            <button className={styles.btnInsumo} onClick={() => setNovoInsumo(true)} ><TiPlus /></button>
            <button className={styles.btnInsumo}><LuImport /></button>
        </div>
        <div className={styles.listaInsumos}>
            <div className={styles.lista}>
                <div className={styles.cDescricao}>
                    <span className={styles.spanLista}>Descrição</span>
                </div>
                <div className={styles.cUnd} >
                    <span className={styles.spanLista}>Unidade</span>
                </div>
                <div className={styles.cPreco} >
                    <span className={styles.spanLista}>Preço</span>
                </div>
            </div>
            <div className={styles.containerIns}>
                {insumos?.map((i) => (
                <div className={styles.cardIns} key={i.ism_id}>
                        <div className={styles.cDescricao}>
                            <span className={styles.spanIns}>{i.ism_descricao}</span>
                        </div>
                        <div className={styles.cUnd} >
                            <span className={styles.spanIns}>{i.unidade?.und_codigo || 'N/A'}</span>
                        </div>
                        <div className={styles.cPreco} >
                            <span className={styles.spanIns}>{i.ism_preco 
                                    ? Number(i.ism_preco).toLocaleString('pt-BR', { 
                                        style: 'currency', 
                                        currency: 'BRL' 
                                        }) 
                                    : 'R$ 0,00'}
                            </span>
                        </div>
                        <div className={styles.containerBtn}>
                            <button onClick={()=> handleDelete(i.ism_id)} ><FaRegTrashCan /></button>
                            <button onClick={() => setInsumoParaEditar(i)} 
                               title="Editar"><MdOutlineEdit /></button>
                        </div>
                 </div>
                ))}
            </div>
        </div>
        </div>
    </div>
  )
}

export default Insumo