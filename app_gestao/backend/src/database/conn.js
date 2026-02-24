
import { Sequelize } from 'sequelize';

// Substitua pelos seus dados do PostgreSQL
const sequelize = new Sequelize('app_projetos', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Define como true se quiser ver as queries SQL no console
  pool: {
    max: 5,         // Máximo de conexões abertas
    min: 0,         // Mínimo de conexões
    acquire: 30000, // Tempo máximo tentando conectar antes de dar erro
    idle: 10000     // Tempo que uma conexão pode ficar parada antes de fechar
  }
});

export default sequelize;