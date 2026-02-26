import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

import Home from './pages/home/Home'
import Projeto from './pages/projeto/Projeto'
import About from './pages/abaout/About'
import { Footer } from './components/Footer'
import Login from './pages/login/Login'
import ModalAtividade from './components/ModalAtividade'





function App() {
  const [count, setCount] = useState(0)

  const [sidebar, setSidebar] = useState(false)

  // Função para inverter o estado
  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/projeto' element={<Projeto/>}/>
          <Route path='/atividade' element={<ModalAtividade />}/>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
