import React from 'react'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

import styles from './Home.module.css'
import Modal from '../../components/Modal'

import Projeto from '../projeto/Projeto'

import { useObra } from '../../hooks/useObra'

const Home = () => {

  const {obras} = useObra(null);

  const [idSelecionado, setIdSelecionado] = useState(null);

  const [sidebar, setSidebar] = useState(false)

  const[showDetail, setShowDetail] = useState('home')

  const[showModal, setShowModal] = useState(false)

  const[showProjeto, setShowProjeto] = useState(false)
  
  // Função para inverter o estado
  const toggleSidebar = () => setSidebar(!sidebar);

  // Função para inverter o estado
  const toggleModal = () => {
    
    setShowModal(!showModal);
  }

  const toggleProjeto = (id) => {

    setShowProjeto(!showProjeto); 
    setIdSelecionado(id);
  }


  return (
    <div className={styles.main}>
        <Modal aberto={showModal} clicou={toggleModal}/>
        <Navbar onMenuClick={toggleSidebar} isSidebarOpen={sidebar} showDetail={showDetail} clicou={toggleModal}/>
        <div className={styles.container}>
          { !showModal && <Sidebar isOpen={sidebar} setShowDetail={setShowDetail} onMenuClick={toggleSidebar}/>}

      <div className={styles.listaProjetos}>  
          {/* --- ÁREA DOS CARDS --- */}
        {showProjeto && <Projeto projeto={toggleProjeto} id={idSelecionado} />}
        {!showProjeto && <div className={styles.content}>
          <div className={styles.gridObras}>
            {Array.isArray(obras) && obras.map((obra) => (
              <div key={obra.obra_id} className={styles.cardObra}>
                <div className={styles.cardHeader}>
                  <h3>{obra.obra_nome}</h3>
                </div>
                
                <div className={styles.cardBody}>
                  <p><strong>Localização:</strong> {obra.obra_localizacao}</p>
                  <p><strong>Resposável:</strong> {obra.obra_resp_obra}</p>
                </div>

                <div className={styles.cardFooter}>
                  <button onClick={() => toggleProjeto(obra.obra_id)} className={styles.btnAcessar}>Acessar detalhes</button>
                </div>
              </div>
            ))}
          </div>
        </div>}
        {/* ----------------------- */}
      </div>
        </div>
    </div>
  )

}

export default Home