
import sequelize from './database/conn.js';

import express from 'express'
const app = express()



app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

// Função para validar a conexão
async function conectarBanco() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados realizada com sucesso!');
    
    // Sincroniza os modelos (cria as tabelas se não existirem)
    await sequelize.sync({ alter: true });
    console.log('✅ Tabelas sincronizadas.');
  } catch (error) {
    console.error('❌ Erro ao conectar no banco:', error);
  }
}

conectarBanco();

// rotas - endpoints
app.get('/', (req,res) => {
    res.json({message: "Primeiro endpoint criado!"})
})

app.listen(3003)