import React from 'react'

import styles from'./Navbar.module.css'
import { useState } from 'react';

import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

const Navbar = ({ onMenuClick, isSidebarOpen }) => {

  return (
    <div className={styles.navbar}>
        <button className={styles.btnMenu} onClick={onMenuClick}>
             {isSidebarOpen ? <IoClose/> : <TiThMenu />}
        </button>  
    </div>
  )
}

export default Navbar