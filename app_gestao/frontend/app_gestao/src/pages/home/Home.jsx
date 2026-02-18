import React from 'react'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

import styles from './Home.module.css'


const Home = () => {

  const [sidebar, setSidebar] = useState(false)
  
  // Função para inverter o estado
  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <div className={styles.main}>
        <Navbar onMenuClick={toggleSidebar} isSidebarOpen={sidebar}/>
        <Sidebar isOpen={sidebar} />
        <h1>Home</h1>
    </div>
  )
}

export default Home