import React, { useState } from 'react'

import { Link } from 'react-router-dom';

import { RiHammerLine, RiStackLine, RiListCheck2, RiDashboardLine, RiCloseFill } from "react-icons/ri";

import styles from './Projeto.module.css'
import VisaoGeral from './secoes/VisaoGeral'
import Atividade from './secoes/Atividade';
import Composicao from './secoes/Composicao';
import ModalAtividade from '../../components/ModalAtividade';
import { Component } from 'react';
import Insumo from './secoes/Insumo';


const Projeto = ({ projeto, id }) => {

  const[opcao, setOpcao] = useState(1)

  const[modalAtividade, setModalAtividade] = useState(false)

  const toggleModal = () => setModalAtividade(!modalAtividade);


  const renderDetalhe = () => {
    switch(opcao){
      case 1: return <VisaoGeral idProjeto={id}/>;
        case 2: return <Atividade showModal={toggleModal} idProjeto={id} />;
        case 3: return <Composicao idProjeto={id}/>
        case 4: return <Insumo idProjeto={id} />
    }
  }

  const [ativo, setAtivo] = useState(1);

  const selecao = (opcao) => {
    setOpcao(opcao);
    setAtivo(opcao);
  }



  return (

    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <ul className={styles.lista}>  
            <li>
              <button onClick={() => selecao(1)} className={ativo != 1 ? styles.btnProjeto : styles.ativo}> <RiDashboardLine className={ativo === 1 ? styles.svgAtivo : '' }/> Visão geral</button>
            </li>
            <li>
              <button onClick={() => selecao(2)} className={ativo != 2 ? styles.btnProjeto : styles.ativo}> <RiListCheck2 className={ativo === 2 ? styles.svgAtivo : '' }/> Atividades</button>
            </li>
            <li>
              <button onClick={() => selecao(3)} className={ativo != 3 ? styles.btnProjeto : styles.ativo}> <RiStackLine className={ativo === 3 ? styles.svgAtivo : '' }/>Composições</button>
            </li>
            <li>
              <button onClick={() => selecao(4)} className={ativo != 4 ? styles.btnProjeto : styles.ativo}> <RiHammerLine className={ativo === 4 ? styles.svgAtivo : '' }/>Insumos</button>
            </li>
            <li>
              <button onClick={projeto} className={ativo ? styles.btnProjeto : styles.ativo}> <RiCloseFill /> Sair</button>
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