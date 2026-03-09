import React, { useState } from 'react'

import styles from './Insumo.module.css'
import { CiImport } from "react-icons/ci";
import { TiPlus } from "react-icons/ti";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import ModalInsumo from '../../../components/ModalInsumo';

const Insumo = ({ idProjeto }) => {

const [ novoInsumo, setNovoInsumo ] = useState(false);

const ins = [
    { id: 1, descricao:'Cantoneira', und:'un', preco:'120,50' },
    { id: 2, descricao:'terminal tubolar', und:'un', preco:'5,50' },
    { id: 3, descricao:'Eletroduto', und:'un', preco:'86,50' },
    { id: 4, descricao:'Condulete 2"', und:'un', preco:'60,45' },
    { id: 5, descricao:'Unidute cônico', und:'un', preco:'20,10' },
    { id: 6, descricao:'Cantoneira', und:'un', preco:'120,50' },
    { id: 7, descricao:'terminal tubolar', und:'un', preco:'5,50' },
    { id: 8, descricao:'Eletroduto', und:'un', preco:'86,50' },
    { id: 9, descricao:'Condulete 2"', und:'un', preco:'60,45' },
    { id: 10, descricao:'Unidute cônico', und:'un', preco:'20,10' },
]

  return (
    <div className={styles.main}>
        {novoInsumo && <ModalInsumo id={idProjeto} onClose={() => setNovoInsumo(false)} />}

        {!novoInsumo && (
            <div className={styles.main}>
        <h2>Insumos ⚒️</h2>
        <div className={styles.opcoes}>
            <button className={styles.btnInsumo} onClick={() => setNovoInsumo(true)} ><TiPlus />Criar insumo</button>
            <button className={styles.btnInsumo}><CiImport /> Importar insumo</button>
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
                {ins.map((i) => (
                <div className={styles.cardIns}>
                        <div className={styles.cDescricao}>
                            <span className={styles.spanIns}>{i.descricao}</span>
                        </div>
                        <div className={styles.cUnd} >
                            <span className={styles.spanIns}>{i.und}</span>
                        </div>
                        <div className={styles.cPreco} >
                            <span className={styles.spanIns}>{i.preco}</span>
                        </div>
                        <div className={styles.containerBtn}>
                            <button><FaRegTrashCan /></button>
                            <button><MdOutlineEdit /></button>
                        </div>
                 </div>
                ))}
            </div>
        </div>
        </div>
        )}
    </div>
  )
}

export default Insumo