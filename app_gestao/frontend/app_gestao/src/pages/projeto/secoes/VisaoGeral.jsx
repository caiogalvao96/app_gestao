import React from 'react'

import { RiCalendar2Line, RiBuilding2Line, RiMapPin2Line, RiUserFollowLine } from "react-icons/ri"

import styles from './VisaoGeral.module.css'



const VisaoGeral = () => {
  return (
    <div className={styles.main}>
        <div className={styles.container}>
            <div className={styles.titulo}>
                  <RiBuilding2Line />
                <span>Informações da obra</span>
            </div>
            <div className={styles.detalhe}>
                <div className={styles.dEsquerda}>
                      <div className={styles.conteudo}>
                    <div className={styles.lTitulo}>
                        <RiMapPin2Line />
                        <span className={styles.sNegrito}>
                            Localização:
                        </span>
                    </div>
                    <span> Jacareí - SP</span>
                </div>
                <div className={styles.conteudo}>
                    <div className={styles.lTitulo}>
                        <RiCalendar2Line />
                        <span className={styles.sNegrito}>
                            Data de início:
                        </span>
                    </div>
                    <span> 19/02/2026 </span>
                </div>
                <div className={styles.conteudo}>
                    <div className={styles.lTitulo}>
                        <RiCalendar2Line />
                        <span className={styles.sNegrito}>
                            Previsão término:
                        </span>
                    </div>
                    <span> 20/12/2026</span>
                </div>
                </div>
                <div className={styles.dDireita}>
                      <div className={styles.conteudo}>
                    <div className={styles.lTitulo}>
                        <RiUserFollowLine  />
                        <span className={styles.sNegrito}>
                            Responsável obra:
                        </span>
                    </div>
                    <span> Danilo Evaristo</span>
                </div>
                <div className={styles.conteudo}>
                    <div className={styles.lTitulo}>
                        <RiUserFollowLine  />
                        <span className={styles.sNegrito}>
                            Responsável cliente:
                        </span>
                    </div>
                    <span> Yamaguchi </span>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VisaoGeral