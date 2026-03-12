import React, {useState} from 'react'
import styles from './ModalInsumo.module.css'
import { useUnidade} from '../hooks/useUnidade'
import { useInsumo } from '../hooks/useInsumo'
import { NumericFormat } from 'react-number-format';

const ModalInsumo = ({ id, onClose, insumoExistente }) => {

    const [mensagemSucesso, setMensagemSucesso] = useState(false);

    // Para o NumericFormat
const handlePriceChange = (values) => {
    const { value } = values;
    setFormData(prev => ({ ...prev, ins_preco: value }));
};

  const {unidades, isError, isLoading } = useUnidade();

  const {storeInsumo, isSaving, onSuccess} = useInsumo();

  // Estado inicial condicional
    const initialState = {
        ism_descricao: insumoExistente?.ism_descricao || '',
        ism_preco: insumoExistente?.ism_preco || '',
        und_id: insumoExistente?.unidade?.und_id || '', // Verifique se o ID da unidade vem assim
    };
    
    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // --- AS TRAVAS (Validações) ---
        if (!formData.und_id || formData.und_id === "") {
            alert("Por favor, selecione uma unidade de medida!");
            return; 
        }

        if (!formData.ism_descricao || formData.ism_descricao.trim() === "") {
            alert("A descrição do insumo é obrigatória!");
            return;
        }

        // --- PREPARAÇÃO DO PAYLOAD ---
        const payload = {
            ism_descricao: formData.ism_descricao,
            ism_preco: parseFloat(formData.ism_preco) || 0,
            und_id: parseInt(formData.und_id, 10),
            obra_id: parseInt(id, 10)
        };

        // --- LÓGICA DE DECISÃO: UPDATE OU STORE ---
        if (insumoExistente?.ism_id) {
            // Se temos um ID, chamamos o UPDATE
            updateInsumo(
                { id: insumoExistente.ism_id, data: payload }, 
                {
                    onSuccess: () => {
                        alert("Insumo atualizado com sucesso!");
                        onClose(); // Na edição, fechamos o modal para ver a lista atualizada
                    },
                    onError: (err) => {
                        alert("Erro ao atualizar insumo.");
                        console.error(err);
                    }
                }
            );
        } else {
            // Se NÃO temos ID, seguimos com o STORE original
            storeInsumo(payload, {
                onSuccess: () => {
                    setFormData(initialState);
                    setMensagemSucesso(true);
                    setTimeout(() => setMensagemSucesso(false), 3000);
                },
                onError: (err) => {
                    alert("Erro ao cadastrar insumo.");
                    console.error(err);
                }
            });
        }
    };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
        <h2>Cadastro de insumos ⚒️</h2>
        {mensagemSucesso && <span style={{color: 'green'}}>Cadastrado com sucesso!</span>}
        <div className={styles.linha}>
            <div className={styles.group}>
                <label htmlFor="descricao">Descrição</label>
                <input 
                    id='descricao'
                    type="text" 
                    className={styles.iDescricao}
                    name="ism_descricao"
                    value={formData.ism_descricao}
                    onChange={handleChange}
                />  
            </div>
        </div>
        <div className={styles.linha}>
            <div className={styles.group}>
                <label htmlFor="preco">Preço</label>
               <NumericFormat
                    id='preco'
                    className={styles.outros} // Mantém sua classe de estilo
                    name="ism_preco"
                    value={formData.ism_preco}
                    
                    // Configurações da Máscara Brasileira
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale
                    allowNegative={false}

                    // Como atualizar o estado
                    onValueChange={(values) => {
                        const { value } = values; // 'value' é a string do número puro (ex: "10.50")
                        setFormData({
                            ...formData,
                            ism_preco: value // Salva o número puro no estado para o banco de dados
                        });
                    }}
                />
            </div>
            <div className={styles.group}>
                <label htmlFor="unidade">Unidade</label>
                <select 
                    id='unidade'
                    className={styles.outros} 
                    name="und_id"
                    value={formData.und_id}
                    onChange={handleChange}
                    >
                    {
                    <option value="" disabled hidden>
                        Escolha uma unidade...
                    </option>
                    }
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
                <label htmlFor="grupocusto">Grupo de custo</label>
                <input id='grupocusto' type="text"  className={styles.outros}/>
            </div>
        </div>
        <div className={styles.groupBtn}>
                <button type='submit'>{isSaving ? 'Salvando...' : 'Salvar'}</button>
                <button type='button' onClick={onClose} disabled={isSaving}>Fechar</button>
        </div>
    </form>
  )
}

export default ModalInsumo