import React from 'react'

import { useNavigate } from 'react-router-dom';
import { RiLockPasswordLine, RiUserLine, RiAccountCircleLine } from "react-icons/ri";


import styles from './Login.module.css'

const Login = () => {

const navigate = useNavigate(); // 2. Inicialize o navigate

    const handleLogin = (e) => {
        e.preventDefault(); // Evita o recarregamento da página
        
        // Aqui você faria sua lógica de autenticação
        console.log("Logando...");

        // 3. Redireciona para a rota definida no seu App.jsx
        navigate('/home');
    }

  return (
    <div className={styles.main}>
        <div className={styles.container}>
            <div className={styles.login}>
                <RiAccountCircleLine size={70} color='lightgray'/>
                <h1>Login</h1>
            </div>
            <div className={styles.inputs}>
                <RiUserLine className={styles.inputIcon}/>
                <input type="text" placeholder='Login' />
            </div>
            <div className={styles.inputs}>
                <RiLockPasswordLine className={styles.inputIcon}/>
                <input type="password" placeholder='Senha' />
            </div>
            <button onClick={handleLogin}>Logar</button>
        </div>
    </div>
  )
}

export default Login