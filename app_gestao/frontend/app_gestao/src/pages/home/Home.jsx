import React from 'react'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

import styles from './Home.module.css'
import Modal from '../../components/Modal'

import Projeto from '../projeto/Projeto'

import { useObra } from '../../hooks/useObra'
import { RiTaskLine, RiEdit2Fill, RiDeleteBin6Line} from "react-icons/ri";

const Home = () => {

  const {obras, deleteObra} = useObra(null);

  const [idSelecionado, setIdSelecionado] = useState(null);

  const [sidebar, setSidebar] = useState(false)

  const[showDetail, setShowDetail] = useState('home')

  const[showModal, setShowModal] = useState(false)

  const[showProjeto, setShowProjeto] = useState(false)

  const [obra, setObra] = useState(null);
  
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

  const edicao = (obra) => {
    setObra(obra);
    setShowModal(!showModal)
  }

  const excluirObra = (id) => {
    const c = window.confirm("Deseja realmente excluir o orçamento?")

    if(c && id){
      deleteObra(id)
      alert("Obra deletada!");
    }
  }

  return (
    <div className={styles.main}>
        {showModal &&(<Modal  clicou={toggleModal} obra={obra}/>)}
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
                  <button type='button' className={styles.btnAcao} onClick={()=> excluirObra(obra.obra_id)} ><RiDeleteBin6Line className={styles.svgTrash}/></button>
                  <button type='button' className={styles.btnAcao} onClick={()=> edicao(obra) }><RiEdit2Fill className={styles.svgEdit}/></button>
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