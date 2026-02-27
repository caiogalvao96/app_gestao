import { useState } from 'react';

const CatalogoInsumos = () => {
  const [produtos, setProdutos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [temMais, setTemMais] = useState(true);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  // CONFIGURAÇÃO
  const USUARIO = "SEU_USUARIO";
  const SENHA = "SUA_SENHA";
  const URL_API = "SUA_URL_AQUI";
  const ITENS_POR_PAGINA = 20;

  const buscarDados = async (p) => {
    setCarregando(true);
    setErro(null);

    try {
      const credentials = btoa(`${USUARIO}:${SENHA}`);
      // A query string usa os parâmetros da sua doc: page e pageSize
      const url = `${URL_API}?page=${p}&pageSize=${ITENS_POR_PAGINA}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error(`Erro ${response.status}: Verifique conexão/autenticação`);

      const data = await response.json();

      // Atualiza a lista e verifica se ainda há dados (hasNext)
      setProdutos(data.items || []);
      setTemMais(data.hasNext);
      setPagina(p);
      
      // Scroll para o topo da tabela ao trocar de página
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Catálogo de Insumos ({produtos.length === 0 ? '5000+' : 'Página ' + pagina})</h2>
        
        {produtos.length === 0 && !carregando && (
          <button onClick={() => buscarDados(1)} style={btnStyle}>Iniciar Carga</button>
        )}
      </header>

      {erro && <div style={{ color: 'red', padding: '10px', background: '#fee' }}>{erro}</div>}
      
      {carregando && <div style={{ textAlign: 'center', padding: '20px' }}>🔄 Acessando banco de dados...</div>}

      {produtos.length > 0 && (
        <>
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead style={{ background: '#333', color: '#fff' }}>
              <tr>
                <th style={{ padding: '10px' }}>Foto</th>
                <th>Código</th>
                <th>Descrição</th>
                <th>Custo Unitário</th>
                <th>Unidade</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((item) => (
                <tr key={item.productId} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ textAlign: 'center', width: '80px', padding: '5px' }}>
                    {item.image ? (
                      <img 
                        src={`data:image/png;base64,${item.image}`} 
                        alt="Foto" 
                        style={{ width: '60px', height: '60px', objectFit: 'contain' }} 
                      />
                    ) : (
                      <div style={{ fontSize: '10px', color: '#999' }}>Sem Foto</div>
                    )}
                  </td>
                  <td style={{ padding: '10px' }}>{item.code}</td>
                  <td style={{ padding: '10px', fontSize: '14px' }}>{item.description}</td>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>
                    {item.priceCurrency1Code} {item.unitaryCost?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{item.purchaseUnitCode}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginação Estilo ERP */}
          <footer style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
            <button 
              disabled={pagina === 1 || carregando} 
              onClick={() => buscarDados(pagina - 1)}
              style={pagina === 1 ? btnDisabled : btnStyle}
            >
              ⬅️ Anterior
            </button>

            <div style={{ padding: '0 20px' }}>
              Página <strong>{pagina}</strong>
            </div>

            <button 
              disabled={!temMais || carregando} 
              onClick={() => buscarDados(pagina + 1)}
              style={!temMais ? btnDisabled : btnStyle}
            >
              Próxima ➡️
            </button>
          </footer>
        </>
      )}
    </div>
  );
};

// Estilos rápidos
const btnStyle = { padding: '8px 16px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' };
const btnDisabled = { ...btnStyle, backgroundColor: '#ccc', cursor: 'not-allowed' };

export default CatalogoInsumos;