import React from 'react'

import { useNavigate } from 'react-router-dom';

import { 
  RiBuilding2Line, 
  RiCalendarCheckLine, 
  RiLayoutMasonryLine,
  RiInboxArchiveLine, 
  RiGroupLine, 
  RiHammerLine, 
  RiListCheck2,
  RiMoneyDollarCircleLine, 
  RiBarChartGroupedLine, 
  RiFileTextLine, 
  RiNotificationBadgeLine,
  RiLogoutBoxLine,
  RiArrowLeftSLine
} from "react-icons/ri";

import styles from './Sidebar.module.css'

const Sidebar = ({ isOpen, setShowDetail, onMenuClick}) => {


  const navigate = useNavigate(); // 2. Inicialize o navigate

    const handleLogin = (e) => {
        e.preventDefault(); // Evita o recarregamento da página
        
        // Aqui você faria sua lógica de autenticação
        console.log("Logando...");

        // 3. Redireciona para a rota definida no seu App.jsx
        navigate('/login');
    }

  return(
    <div>
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div className={styles.closeSidebar}>
                <span className={styles.sectionTitle}>Principal</span>
                <button onClick={onMenuClick} className={styles.close}><RiArrowLeftSLine className={styles.iClose}/></button>
            </div>
            <ul>
                <li onClick={() => setShowDetail('Projetos')}>
                  <RiBuilding2Line className={styles.icon}/>
                  Projetos
                </li>
                <li onClick={() => setShowDetail('Dashboard')}>
                  <RiLayoutMasonryLine className={styles.icon}/>
                  Dashboard
                </li>
                <li onClick={() => setShowDetail('Planejamento')}>
                  <RiCalendarCheckLine className={styles.icon}/>
                  Planejamento
                </li>
            </ul>
            <span className={styles.sectionTitle}>Gestão</span>
            <ul>
                <li onClick={() => setShowDetail('Materiais')}>
                  <RiInboxArchiveLine className={styles.icon}/>
                  Materiais
                </li>
                <li onClick={() => setShowDetail('Colaboradores')}>
                  <RiGroupLine className={styles.icon}/>
                  Colaboradores
                </li>
                <li onClick={() => setShowDetail('Equipamentos')}>
                  <RiHammerLine className={styles.icon}/>
                  Equipamentos
                </li>
                <li onClick={() => setShowDetail('Atividades')}>
                  <RiListCheck2 className={styles.icon}/>
                  Atividades
                </li>
            </ul>
            <span className={styles.sectionTitle}>Controle</span>
            <ul>
                <li>
                  <RiMoneyDollarCircleLine className={styles.icon}/>
                  Financeiro
                </li>
                <li>
                  <RiBarChartGroupedLine className={styles.icon}/>
                  Relatórios
                </li>
                <li>
                  <RiFileTextLine className={styles.icon}/>
                  Documentos 
                </li>
                <li>
                  <RiNotificationBadgeLine className={styles.icon}/>
                  Alertas
                </li>
            </ul>
            <button onClick={handleLogin} className={styles.logout}><RiLogoutBoxLine className={styles.icon}/>Logout</button>
        </aside>
    </div>
  )
}

export default Sidebar