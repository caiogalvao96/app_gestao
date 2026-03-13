import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { TiPlus } from "react-icons/ti";
import { useUnidade} from '../../../hooks/useUnidade'
import { useInsumo } from '../../../hooks/useInsumo';

import Select from "react-select";

import styles from './Composicao.module.css'

import { useComposicoes } from '../../../hooks/useComposicoes'  

const Composicao = ({ idProjeto }) => {

    const {unidades, isError: isErrorUnd, isLoading: isLoadingUnd } = useUnidade();

    const { composicoes, isLoading, isError, error } = useComposicoes();

    const [ativo, setAtivo ] = useState(true);

    const { control, handleSubmit, register } = useForm({
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
        minHeight: '5vh', // Força a altura mesmo em telas pequenas
      }),
      valueContainer: (base) => ({
        ...base,
        height: '5vh',
        padding: '0 8px',
        display: 'flex',
        alignItems: 'center', // Garante que o texto não fique "subido"
      }),
      indicatorsContainer: (base) => ({
        ...base,
        height: '5vh',
      }),
    };

    const aoSalvar = (dados) => {
    // Por enquanto, vamos apenas ver se os campos do cabeçalho estão vindo
    console.log("Cabeçalho da Composição:", dados);
    
    // No próximo passo, vamos injetar o array de insumos aqui
  };

  return (
    <div className={styles.mainComp}>
        <h2>Composições 🧱</h2>
        <div className={styles.opcoesComp}>
          <button onClick={()=> setAtivo(!ativo)}><TiPlus /></button>
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
              <button type='submit'>Salvar</button>
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

            </div>
            
            <div className={styles.container}>

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
                </div>
                <div className={styles.acoesComp}>
                  <button>Excluir</button>
                  <button>Editar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  )
}


export default Composicao