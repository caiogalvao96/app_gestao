
import sequelize from './database/conn.js';

import insumoRoutes from './routes/InsumoRoutes.js';
import obraRoutes from './routes/ObraRoutes.js';
import atividadeRoutes from './routes/AtividadeRoutes.js'

import cors from 'cors';

import './models/Obra.js'
import './models/Atividade.js'
import './models/Insumo.js'
import './models/GrupoCusto.js'
import './models/Unidade.js'
import './models/Composicao.js'
import './models/ItemComposicao.js'
import './models/ClassificacaoArea.js'


import express from 'express'




const app = express()

app.use(cors());

app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

// Rotas
app.use('/insumos', insumoRoutes);
app.use('/obra', obraRoutes);
app.use('/atividade', atividadeRoutes)

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