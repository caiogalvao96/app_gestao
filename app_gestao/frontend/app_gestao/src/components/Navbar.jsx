

import styles from'./Navbar.module.css'


import { TiThMenu } from "react-icons/ti";

import { RiBuilding2Line, RiLayoutMasonryLine } from "react-icons/ri"
import { LuChartNoAxesCombined } from "react-icons/lu";
import { TiPlus } from "react-icons/ti";

const Navbar = ({ onMenuClick, isSidebarOpen, showDetail, clicou}) => {

  const renderDetalhe = () => {
    switch(showDetail){
      case 'Projetos':
        return(
          <div className={styles.cDetalhe}>
            <RiBuilding2Line className={styles.nIcon}/>
            <span>{showDetail}</span>
          </div>
        );
        case 'Dashboard':
        return(
          <div className={styles.cDetalhe}>
            <RiLayoutMasonryLine className={styles.nIcon}/>
            <span>{showDetail}</span>
          </div>
        );
        default:
         return(
          <div className={styles.cDetalhe}>
            <RiBuilding2Line className={styles.nIcon}/>
            <span>Projetos</span>
          </div>
        );
      }
    }

  return (
    <div className={styles.navbar}>
       
        <div className={styles.detalhe}>
          {renderDetalhe()}
        </div>
         <div className={styles.logo}>
            <LuChartNoAxesCombined />
            <span>Gestão de Orçamentos</span>
        </div>
        <div className={styles.menu}>
          <button className={styles.btnMenu} onClick={onMenuClick}>
              <TiThMenu />
          </button>  
        </div>
    </div>
  )
}

export default Navbar