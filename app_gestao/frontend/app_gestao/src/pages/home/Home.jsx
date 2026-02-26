import React from 'react'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

import styles from './Home.module.css'
import Modal from '../../components/Modal'

import { Link } from 'react-router-dom';
import Projeto from '../projeto/Projeto'

const Home = () => {

  const [sidebar, setSidebar] = useState(false)

  const[showDetail, setShowDetail] = useState('home')

  const[showModal, setShowModal] = useState(false)

  const[showProjeto, setShowProjeto] = useState(false)
  
  // Função para inverter o estado
  const toggleSidebar = () => setSidebar(!sidebar);

  // Função para inverter o estado
  const toggleModal = () => setShowModal(!showModal);

  const obras = [
  { id: 1, nome: "Edifício Alpha", cliente: "Construtora X", status: "Em andamento" },
  { id: 2, nome: "Residencial Solar", cliente: "Cliente Y", status: "Planejamento" },
  { id: 3, nome: "Galpão Industrial", cliente: "Logística Z", status: "Concluído" },
  { id: 4, nome: "Galpão Industrial", cliente: "Logística Z", status: "Concluído" },
  { id: 5, nome: "Galpão Industrial", cliente: "Logística Z", status: "Concluído" }
];

     const toggleProjeto = () => {

    setShowProjeto(!showProjeto); 
  }


  return (
    <div className={styles.main}>
        { !showModal && <Navbar onMenuClick={toggleSidebar} isSidebarOpen={sidebar} showDetail={showDetail} clicou={toggleModal}/>}
        <div className={styles.container}>
          { !showModal && <Sidebar isOpen={sidebar} setShowDetail={setShowDetail} onMenuClick={toggleSidebar}/>}

      <div className={styles.listaProjetos}>
          {/* --- ÁREA DOS CARDS --- */}
        {showProjeto && <Projeto projeto={toggleProjeto}/>}
        {!showProjeto && <div className={styles.content}>
          <div className={styles.gridObras}>
            {obras.map((obra) => (
              <div key={obra.id} className={styles.cardObra}>
                <div className={styles.cardHeader}>
                  <h3>{obra.nome}</h3>
                </div>
                
                <div className={styles.cardBody}>
                  <p><strong>Cliente:</strong> {obra.cliente}</p>
                  <p><strong>Início:</strong> {obra.inicio}</p>
                </div>

                <div className={styles.cardFooter}>
                  <button onClick={toggleProjeto} className={styles.btnAcessar}>Acessar detalhes</button>
                </div>
              </div>
            ))}
          </div>
        </div>}
        {/* ----------------------- */}
      </div>
          <Modal aberto={showModal} clicou={toggleModal}/>
        </div>
    </div>
  )

}

export default Home