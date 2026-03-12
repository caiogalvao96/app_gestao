import React from 'react'

import { RiCalendar2Line, RiBuilding2Line, RiMapPin2Line, RiUserFollowLine } from "react-icons/ri"

import styles from './VisaoGeral.module.css'

import { useObra} from '../../../hooks/useObra'


const VisaoGeral = ({ idProjeto }) => {

const { isSaving, obra} = useObra(idProjeto);

const aObra = Array.isArray(obra) ? obra[0] : obra;

const formatarDataBR = (dataIso) => {
  if (!dataIso) return "Data não informada";
  
  // O banco envia "2026-03-09", o split separa em [2026, 03, 09]
  const [ano, mes, dia] = dataIso.split("-");
  return `${dia}/${mes}/${ano}`;
};

if (!aObra) {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <span>Carregando dados da obra...</span>
        </div>
      </div>
    );
  }


  return (
    <div className={styles.main}>
        <div className={styles.container}>
            <div className={styles.titulo}>
                  <RiBuilding2Line />
                <span>Informações da obra: {aObra.obra_nome} </span>
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
                    <span> {aObra.obra_localizacao}</span>
                </div>
                <div className={styles.conteudo}>
                    <div className={styles.lTitulo}>
                        <RiCalendar2Line />
                        <span className={styles.sNegrito}>
                            Data de início:
                        </span>
                    </div>
                    <span> {formatarDataBR(aObra["obra_data_inicio"])} </span>
                </div>
                <div className={styles.conteudo}>
                    <div className={styles.lTitulo}>
                        <RiCalendar2Line />
                        <span className={styles.sNegrito}>
                            Previsão término:
                        </span>
                    </div>
                    <span> {formatarDataBR(aObra["obra_data_fim"])}</span>
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
                    <span>{aObra.obra_resp_obra}</span>
                </div>
                <div className={styles.conteudo}>
                    <div className={styles.lTitulo}>
                        <RiUserFollowLine  />
                        <span className={styles.sNegrito}>
                            Responsável cliente:
                        </span>
                    </div>
                    <span> {aObra.obra_resp_cliente}  </span>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VisaoGeral