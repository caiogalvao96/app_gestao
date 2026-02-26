import React from 'react'

import styles from'./Navbar.module.css'
import { useState } from 'react';

import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { RiAddFill, RiBuilding2Line, RiLayoutMasonryLine } from "react-icons/ri"
import { TiPlus } from "react-icons/ti";

const Navbar = ({ onMenuClick, isSidebarOpen, showDetail, clicou}) => {

  const renderDetalhe = () => {
    switch(showDetail){
      case 'projetos':
        return(
          <div className={styles.cDetalhe}>
            <RiBuilding2Line className={styles.nIcon}/>
            <span>{showDetail}</span>
            <button onClick={clicou}>
              <TiPlus/>
               Nova obra
            </button>
          </div>
        );
        case 'dashboard':
        return(
          <>
            <RiLayoutMasonryLine className={styles.nIcon}/>
            <span>{showDetail}</span>
          </>
        );
      
      }
    }

  return (
    <div className={styles.navbar}>
        <div className={styles.detalhe}>
          {renderDetalhe()}
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