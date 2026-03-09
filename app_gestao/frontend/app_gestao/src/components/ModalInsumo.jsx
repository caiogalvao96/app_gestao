import React from 'react'
import styles from './ModalInsumo.module.css'
import { useUnidade} from '../hooks/useUnidade'

const ModalInsumo = ({ id, onClose }) => {

  const {unidades, isError, isLoading } = useUnidade();

  return (
    <div className={styles.container}>
        <h2>Cadastro de insumos ⚒️</h2>
        <div className={styles.linha}>
            <div className={styles.group}>
                <label htmlFor="">Descrição</label>
                <input type="text" className={styles.iDescricao} />
            </div>
            <div className={styles.group}>
                <label htmlFor="">Unidade</label>
                <select name="und_id">
                    {unidades.map((unidade) => (
                    <option key={unidade.und_id} value={unidade.und_id}>
                    {unidade.und_codigo} - {unidade.und_descricao?.toLowerCase()}
                    </option>
                    ))}
                </select>
            </div>
        </div>
        <div className={styles.linha}>
            <div className={styles.group}>
                <label htmlFor="">Preço</label>
                <input type="text" />
            </div>
            <div className={styles.group}>
                <label htmlFor="">Grupo de custo</label>
                <input type="text" />
            </div>
        </div>
        <div className={styles.groupBtn}>
            <button>Salvar</button>
            <button onClick={onClose}>Fechar</button>
        </div>
    </div>
  )
}

export default ModalInsumo