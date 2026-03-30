import React, { useState } from 'react';
import styles from './ModalInsumo.module.css';
import { useUnidade } from '../hooks/useUnidade';
import { useInsumo } from '../hooks/useInsumo';
import { useProducts } from '../hooks/useProducts'; 
import { NumericFormat } from 'react-number-format';

const ModalInsumo = ({ id, onClose, insumoExistente }) => {
    const [mensagemSucesso, setMensagemSucesso] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const { unidades = [] } = useUnidade();
    const { storeInsumo, updateInsumo, isSaving } = useInsumo();

    const initialState = {
        ism_descricao: insumoExistente?.ism_descricao || '',
        ism_preco: insumoExistente?.ism_preco || '',
        und_id: insumoExistente?.unidade?.und_id || '',
    };
    const [formData, setFormData] = useState(initialState);

    // Busca no RM
    const { data: sugestoesRM, isLoading: isLoadingRM } = useProducts(formData.ism_descricao);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'ism_descricao') setShowSuggestions(true);
    };

    const handleSelectRM = (item) => {
        // Lendo do JSON (minúsculo conforme seu print anterior)
        const desc = item.description;
        const undRM = item.unitMeasure;

        const unidadeLocal = unidades.find(
            u => u.und_codigo?.toUpperCase() === undRM?.toUpperCase()
        );

        setFormData(prev => ({
            ...prev,
            ism_descricao: desc,
            und_id: unidadeLocal ? unidadeLocal.und_id : prev.und_id
        }));
        setShowSuggestions(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ism_descricao: formData.ism_descricao,
            ism_preco: parseFloat(formData.ism_preco) || 0,
            und_id: parseInt(formData.und_id, 10),
            obra_id: parseInt(id, 10)
        };

        const callback = {
            onSuccess: () => {
                if (!insumoExistente) setFormData(initialState);
                setMensagemSucesso(true);
                setTimeout(() => setMensagemSucesso(false), 3000);
            }
        };

        insumoExistente?.ism_id 
            ? updateInsumo({ id: insumoExistente.ism_id, data: payload }, callback)
            : storeInsumo(payload, callback);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container} onClick={() => setShowSuggestions(false)}>
            {mensagemSucesso && <span style={{color: 'green', display: 'block'}}>Salvo com sucesso!</span>}

            <div className={styles.linha}>
                <div style={{ position: 'relative', width: '100%' }}>
                    <label htmlFor="descricao">Descrição</label>
                    <input 
                        id='descricao'
                        type="text" 
                        autoComplete="off"
                        className={styles.iDescricao}
                        name="ism_descricao"
                        value={formData.ism_descricao}
                        onChange={handleChange}
                        onFocus={() => setShowSuggestions(true)}
                        onClick={(e) => e.stopPropagation()}
                    />  

                    {showSuggestions && formData.ism_descricao.length >= 3 && (
                        <ul className={styles.suggestionList} onClick={(e) => e.stopPropagation()}>
                            {isLoadingRM && <li className={styles.itemInfo}>Buscando no RM...</li>}
                            
                            {sugestoesRM?.map((item, index) => (
                                <li 
                                    key={`${item.code}-${index}`} 
                                    className={styles.itemSuggestion}
                                    onClick={() => handleSelectRM(item)}
                                >
                                    <strong>{item.description}</strong>
                                    <small>Cód: {item.code} | Un: {item.unitMeasure}</small>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className={styles.linha}>
                <div className={styles.group}>
                    <label htmlFor="preco">Preço</label>
                    <NumericFormat
                        id='preco'
                        className={styles.outros}
                        value={formData.ism_preco}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        decimalScale={2}
                        fixedDecimalScale
                        onValueChange={(v) => setFormData({...formData, ism_preco: v.value})}
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
                        <option value="">Escolha...</option>
                        {unidades.map((u) => (
                            <option key={u.und_id} value={u.und_id}>
                                {u.und_codigo} - {u.und_descricao?.toLowerCase()}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.groupBtn}>
                <button type='submit' disabled={isSaving}>{isSaving ? 'Salvando...' : 'Salvar'}</button>
                <button type='button' onClick={onClose}>Fechar</button>
            </div>
        </form>
    );
};

export default ModalInsumo;