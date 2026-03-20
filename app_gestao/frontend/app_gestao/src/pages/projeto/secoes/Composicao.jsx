import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { TiPlus } from "react-icons/ti";
import { useUnidade} from '../../../hooks/useUnidade'
import { useInsumo } from '../../../hooks/useInsumo';
import { IoClose } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";

import Select from "react-select";

import styles from './Composicao.module.css'

import { useComposicoes } from '../../../hooks/useComposicoes'  


const Composicao = ({ idProjeto }) => {

    const {unidades, isError: isErrorUnd, isLoading: isLoadingUnd } = useUnidade();

    const { composicoes, isLoading, isError, error, storeComposicao, updateComposicao, deleteComposicao } = useComposicoes({idProjeto});

    const [ativo, setAtivo ] = useState(true);

   

    const { control, handleSubmit, register, watch, setValue, reset} = useForm({
      defaultValues: {
        comp_nome: '',
        und_id: '',
        comp_tipo: 'PRINCIPAL',
        comp_global: false
      }
    });

    const { insumos } = useInsumo({ idProjeto });

     const insumosOptions = insumos?.map(i => ({
      value: i.ism_id,
      label: `${i.ism_descricao} - ${i.unidade.und_codigo}`
    })) || [];

    const selectStyles = {
      control: (base) => ({
        ...base,
        height: '5vh',
        width: '35vw',
        minHeight: '5vh', // Força a altura mesmo em telas pequenas
      }),
      valueContainer: (base) => ({
        ...base,
        height: '5vh',
        width: '35vw',
        padding: '0 8px',
        display: 'flex',
        alignItems: 'center', // Garante que o texto não fique "subido"
      }),
      indicatorsContainer: (base) => ({
        ...base,
        height: '5vh',
        
      }),
    };

  //Inserindo insumos na composição
   const [itensComposicao, setItensComposicao] = useState([]);
   const [insumoSelecionado, setInsumoSelecionado] = useState(null);

// Função para adicionar o item do Select à tabela
const adicionarInsumo = () => {
  const idSelecionado = watch("ism_id"); // Usamos watch para pegar o valor atual do select
  
  if (!idSelecionado) return;

  // Evita duplicados
  if (itensComposicao.find(i => i.ism_id === idSelecionado)) {
    alert("Insumo já adicionado!");
    return;
  }

  // Busca os dados completos do insumo para exibir na tela
  const dadosInsumo = insumos.find(i => i.ism_id === idSelecionado);

  setItensComposicao([
    ...itensComposicao,
    { 
      ism_id: dadosInsumo.ism_id, 
      descricao: dadosInsumo.ism_descricao, 
      unidade: dadosInsumo.unidade?.und_codigo,
      preco_unitario: dadosInsumo.ism_preco,
      quantidade: 1 // Default inicial
    }
  ]);

  // Limpa o select após adicionar
  setValue("ism_id", null);
  };

    // Função para mudar a quantidade na linha
    const mudarQtd = (id, valor) => {
      setItensComposicao(prev => prev.map(item => 
        item.ism_id === id ? { ...item, quantidade: Number(valor) } : item
        ));
  };

  // salvando os itens no banco
  const aoSalvar = (dadosDoForm) => {
  const payloadFinal = {
    ...dadosDoForm,
    obra_id: idProjeto,
    itens: itensComposicao.map(it => ({
      ism_id: it.ism_id,
      quantidade: it.quantidade
    }))
  };

  if (editandoId) {
    // Aqui você chamaria o seu hook de update: updateComposicao(editandoId, payloadFinal)
    updateComposicao({ id: editandoId, data: payloadFinal });
  } else {
    storeComposicao(payloadFinal);
  }
  
  // Limpa tudo após salvar
  setEditandoId(null);
  setItensComposicao([]);
  reset();
  setAtivo(true);
};
// update da composição

  const [editandoId, setEditandoId] = useState(null);

  const prepararEdicao = (comp) => {
    // 1. Abre o formulário (no seu código, !ativo mostra o form)
    setAtivo(false);

    // 2. Preenche os campos básicos do useForm (comp_nome, und_id, comp_tipo, etc.)
    reset({
      comp_nome: comp.comp_nome,
      und_id: comp.und_id,
      comp_tipo: comp.comp_tipo,
      comp_global: comp.comp_is_global,
    });

    // 3. Carrega os itens na tabela temporária
    // Mapeamos para garantir que as chaves batam com o que sua tabela espera (ism_id, descricao, etc.)
    const itensParaEditar = comp.itens.map(item => ({
      ism_id: item.insumo?.ism_id || item.ism_id,
      descricao: item.insumo?.ism_descricao || "Sub-composição",
      unidade: item.insumo?.unidade?.und_codigo || item.unidade?.und_codigo,
      preco_unitario: item.insumo?.ism_preco || 0, // <--- ADICIONE ESTA LINHA
      quantidade: Number(item.quantidade)
    }));

    setItensComposicao(itensParaEditar);
    
    // Opcional: guardar o ID que está sendo editado para saber se o aoSalvar deve dar POST ou PUT
    setEditandoId(comp.comp_id); 
  };

  // O reduce percorre seu array de itens e soma os resultados
  const totalComposicao = itensComposicao.reduce((acumulador, item) => {
    const preco = Number(item.preco_unitario || 0);
    const qtd = Number(item.quantidade || 0);
    return acumulador + (preco * qtd);
  }, 0);

  return (
    <div className={styles.mainComp}>
        <h2>Composições 🧱</h2>
        <div className={styles.opcoesComp}>
          {ativo &&(<button onClick={()=> setAtivo(!ativo)}><TiPlus /></button>)}
          {!ativo && (
            <button onClick={() => {
                setAtivo(!ativo);
                setEditandoId(null);
                reset({ comp_nome: '', und_id: '', comp_tipo: 'PRINCIPAL' });
                setItensComposicao([]);
              }}>
                <IoClose className={styles.close} />
              </button>
            )}
        </div>

        {!ativo &&(
          <div className={styles.main}>
            <form className={styles.formulario} onSubmit={handleSubmit(aoSalvar)} >
              <div className={styles.group}>
                <label htmlFor="comp_nome">Descrição</label>
                <input 
                  id="comp_nome" 
                  type="text"  
                  className={styles.descricao}  
                  {...register("comp_nome", { required: "Descrição obrigatória" })}
                />
              </div>
              <div className={styles.group}>
                <label htmlFor="unidade">Unidade</label>
                <select 
                    id='unidade'
                    className={styles.outros} 
                    name="und_id"
                    {...register("und_id", { required: "Selecione uma unidade" })}
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
              <div className={styles.group}>
                <label htmlFor="tipo">Tipo</label>
                <select 
                name="tipo" 
                id="tipo"
                {...register("comp_tipo", { required: "Selecione o tipo" })}
                >
                  <option value="" disabled hidden>
                        Escolha o tipo...
                  </option>
                  <option value="PRINCIPAL">Principal</option>
                  <option value="AUXILIAR">Auxiliar</option>
                </select>
              </div>
              <div className={styles.group}>
                <label htmlFor="global">Global</label>
                <input 
                  type="checkbox"
                  id='global'
                  name='global'
                  {...register("comp_global")}
                />
              </div>
              <button type='submit' className={styles.inserir} >Salvar</button>
            </form>
            <div className={styles.acoes}>
              <div className={styles.group}>
                  <Controller
                    name="ism_id"
                    control={control} // 'control' vem do useForm()
                    //rules={{ required: "Selecione um insumo" }}
                    render={({ field }) => (
                      <Select
                        className={styles.aselect}
                        {...field}
                        options={insumosOptions}
                        placeholder="Busque um insumo..."
                        isClearable
                        styles={selectStyles}
                        // O react-select trabalha com o objeto {value, label}, 
                        // mas o Hook Form costuma preferir salvar apenas o ID:
                        value={insumosOptions.find(opt => opt.value === field.value)}
                        onChange={(option) => field.onChange(option ? option.value : "")}
                      />
                    )}
                  />
              </div>
              <button type='button' className={styles.inserir} onClick={adicionarInsumo} >Inserir</button>
              <h4>Total: {totalComposicao}</h4>
            </div>
            
            <div className={styles.container}>
              <h3>Itens composição </h3>
                  <div className={styles.tabela}>
                    <div className={styles.cabecalho}>
                        <div className={styles.acao}>Ação</div>
                        <div className={styles.tdescricao}>Descrição</div>
                        <div className={styles.tund}>Und</div>
                        <div className={styles.tund}>Qtd</div>
                        <div className={styles.preco_unit}>Preço Unitário</div>
                        <div className={styles.preco_unit}>Subtotal</div>
                    </div>
                    <div>
                      {itensComposicao.map((item) => (
                        <div className={styles.linha} key={item.ism_id}>
                          <div className={styles.acao}>
                            <button type="button" onClick={() => setItensComposicao(itensComposicao.filter(i => i.ism_id !== item.ism_id))}>
                                <IoClose className={styles.close} />
                            </button>
                          </div>
                          <div className={styles.tdescricao}>{item.descricao}</div>
                          <div className={styles.tund}>{item.unidade}</div>
                          <div className={styles.tund}>
                            <input 
                              className={styles.tund}
                              type="number" 
                              min={1}
                              value={item.quantidade} 
                              onChange={(e) => mudarQtd(item.ism_id, e.target.value)}
                            />
                          </div>
                          <div className={styles.preco_unit} >R$ {Number(item.preco_unitario || 0).toFixed(2)}</div>
                          <div className={styles.preco_unit} >
                            R$ {(Number(item.preco_unitario || 0) * Number(item.quantidade || 0)).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                   
            </div>
                     
          </div>
 
          

        
        )}

        {ativo &&(
            <div className={ styles.listaComp }>
            {Array.isArray(composicoes) && composicoes.map((comp) => (
              <div key={comp.comp_id} className={styles.rowComp}>
                <div className={styles.infoComp}>
                  <span>{comp.comp_id}</span>
                  <span>{comp.comp_nome}</span>
                  <span>{comp.comp_unidade}</span>
                  <span>{comp.comp_tipo}</span>
                  <span>{comp.comp_valor_total}</span>
                </div>
                <div className={styles.acoesComp}>
                  <button 
                      onClick={() => {
                        if (window.confirm(`Deseja realmente excluir a composição: ${comp.comp_nome}?`)) {
                          deleteComposicao(comp.comp_id);
                        }
                      }}
                  ><FaRegTrashCan /> </button>
                  <button onClick={() => prepararEdicao(comp)}><MdOutlineEdit /> </button>
                </div>
              </div>  
            ))}
          </div>
        )}
      </div>
  )
}


export default Composicao