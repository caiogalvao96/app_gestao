import React, { useState } from 'react'

import { Link } from 'react-router-dom';

import { RiHammerLine, RiStackLine, RiListCheck2, RiDashboardLine, RiCloseFill } from "react-icons/ri";

import styles from './Projeto.module.css'
import VisaoGeral from './secoes/VisaoGeral'
import Atividade from './secoes/Atividade';
import ModalAtividade from '../../components/ModalAtividade';


const Projeto = ({projeto}) => {

  const[opcao, setOpcao] = useState(1)

  const[modalAtividade, setModalAtividade] = useState(false)

  const toggleModal = () => setModalAtividade(!modalAtividade);

  const renderDetalhe = () => {
    switch(opcao){
      case 1: return <VisaoGeral/>;
        case 2: return <Atividade showModal={toggleModal} />
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
          <ul className={styles.lista}>  
            <li>
              <button onClick={() => setOpcao(1)} className={styles.btnProjeto}> <RiDashboardLine/> Visão geral</button>
            </li>
            <li>
              <button onClick={() => setOpcao(2)} className={styles.btnProjeto}> <RiListCheck2/> Atividades</button>
            </li>
            <li>
              <button onClick={() => setOpcao(3)} className={styles.btnProjeto}> <RiStackLine/>Composições</button>
            </li>
            <li>
              <button onClick={() => setOpcao(4)} className={styles.btnProjeto}> <RiHammerLine/>Insumos</button>
            </li>
            <li>
              <button onClick={projeto} className={styles.btnProjeto}> <RiCloseFill /> Sair</button>
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