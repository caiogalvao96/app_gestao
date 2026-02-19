import React from 'react'

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
  RiNotificationBadgeLine
} from "react-icons/ri";

import styles from './Sidebar.module.css'

const Sidebar = ({ isOpen, setShowDetail}) => {
  if (!isOpen) return null;

  return(
    <div>
        <aside className={styles.sidebar}>
            <span className={styles.sectionTitle}>Principal</span>
            <ul>
                <li onClick={() => setShowDetail('projetos')}>
                  <RiBuilding2Line className={styles.icon}/>
                  Projetos
                </li>
                <li onClick={() => setShowDetail('dashboard')}>
                  <RiLayoutMasonryLine className={styles.icon}/>
                  Dashboard
                </li>
                <li>
                  <RiCalendarCheckLine className={styles.icon}/>
                  Planejamento
                </li>
            </ul>
            <span className={styles.sectionTitle}>Gestão  </span>
            <ul>
                <li>
                  <RiInboxArchiveLine className={styles.icon}/>
                  Materiais
                </li>
                <li>
                  <RiGroupLine className={styles.icon}/>
                  Colaboradores
                </li>
                <li>
                  <RiHammerLine className={styles.icon}/>
                  Equipamentos
                </li>
                <li>
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
        </aside>
    </div>
  )
}

export default Sidebar