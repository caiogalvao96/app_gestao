import { useEffect, useState } from 'react';

const TesteInsumos = () => {
  const [insumos, setInsumos] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // URL completa para o seu GET
    fetch('http://localhost:3003/insumos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na rede: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setInsumos(data);
        setCarregando(false);
      })
      .catch((err) => {
        setErro(err.message);
        setCarregando(false);
      });
  }, []);

  if (carregando) return <p>Carregando insumos...</p>;
  if (erro) return <p style={{ color: 'red' }}>Erro: {erro}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Lista de Insumos (Teste API)</h2>
      {insumos.length === 0 ? (
        <p>Nenhum insumo encontrado no banco.</p>
      ) : (
        <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              <th>ID</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>UND</th>
            </tr>
          </thead>
          <tbody>
            {insumos.map((insumo) => (
              <tr key={insumo.ism_id}>
                <td>{insumo.ism_id}</td>
                <td>{insumo.ism_descricao}</td>
                <td>{insumo.ism_preco}</td>
                <td>{insumo.und_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TesteInsumos;