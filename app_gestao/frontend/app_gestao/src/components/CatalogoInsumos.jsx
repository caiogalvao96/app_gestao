import { useState } from 'react';

const PaginaProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [temMais, setTemMais] = useState(true);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  // --- DADOS DE ACESSO ---
  const USUARIO = "caio.galvao";
  const SENHA = "Totvs@123";
  // Importante: Verifique se o endpoint termina exatamente em /Products
  const URL_API = "https://gennariaraujo147911.rm.cloudtotvs.com.br:8051/api/est/v2/Products"
  const carregarPagina = async (numeroPagina) => {
    setCarregando(true);
    setErro(null);

    try {
      const credentials = btoa(`${USUARIO}:${SENHA}`);
      // pageSize=20 é o padrão para não pesar o carregamento das imagens
      const url = `${URL_API}?page=${numeroPagina}&pageSize=20`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Accept': 'application/json'
        }
      });

      // Se o servidor mandar algo que não é 200 (OK)
      if (!response.ok) {
        throw new Error(`Servidor respondeu com status ${response.status}`);
      }

      const data = await response.json();

      // Se chegar aqui, o JSON é válido
      setProdutos(data.items || []);
      setTemMais(data.hasNext);
      setPagina(numeroPagina);

      // Volta o scroll para o topo da tabela
      window.scrollTo(0, 0);

    } catch (err) {
      // Captura o erro "Unexpected token <" e traduz para algo útil
      const msgErro = err.message.includes("Unexpected token") 
        ? "Erro: A API retornou HTML em vez de JSON. Verifique a URL ou Permissões."
        : err.message;
      
      setErro(msgErro);
      console.error("Erro na requisição:", err);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Gestão de Insumos (Paginado)</h2>

      {/* Botão Inicial */}
      {produtos.length === 0 && !carregando && !erro && (
        <button onClick={() => carregarPagina(1)} style={estiloBotao}>
          Carregar Primeiros Itens
        </button>
      )}

      {carregando && <p style={{ color: '#0056b3' }}>🔄 Carregando página {pagina}...</p>}
      
      {erro && (
        <div style={{ color: 'red', border: '1px solid red', padding: '10px', marginBottom: '10px' }}>
          <strong>Falha:</strong> {erro}
          <br />
          <button onClick={() => carregarPagina(pagina)} style={{ marginTop: '5px' }}>Tentar Novamente</button>
        </div>
      )}

      {produtos.length > 0 && (
        <>
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead style={{ backgroundColor: '#f0f0f0' }}>
              <tr>
                <th>Imagem</th>
                <th>Código</th>
                <th>Descrição</th>
                <th>Custo</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((item) => (
                <tr key={item.productId}>
                  <td style={{ textAlign: 'center', padding: '5px' }}>
                    {item.image ? (
                      <img 
                        src={`data:image/png;base64,${item.image}`} 
                        alt="item" 
                        style={{ width: '50px', height: '50px', objectFit: 'contain' }} 
                      />
                    ) : "—"}
                  </td>
                  <td style={{ padding: '8px' }}>{item.code}</td>
                  <td style={{ padding: '8px' }}>{item.description}</td>
                  <td style={{ padding: '8px' }}>R$ {item.unitaryCost?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* CONTROLES DE NAVEGAÇÃO */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
              disabled={pagina === 1 || carregando} 
              onClick={() => carregarPagina(pagina - 1)}
              style={pagina === 1 ? estiloInativo : estiloBotao}
            >
              ⬅️ Anterior
            </button>

            <span>Página <strong>{pagina}</strong></span>

            <button 
              disabled={!temMais || carregando} 
              onClick={() => carregarPagina(pagina + 1)}
              style={!temMais ? estiloInativo : estiloBotao}
            >
              Próxima ➡️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Estilos Simples
const estiloBotao = { padding: '8px 16px', cursor: 'pointer', backgroundColor: '#212529', color: '#fff', border: 'none' };
const estiloInativo = { ...estiloBotao, backgroundColor: '#ccc', cursor: 'not-allowed' };

export default PaginaProdutos;