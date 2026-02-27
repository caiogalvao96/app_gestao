import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('app_projetos', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    underscored: false,     // Não transforma camelCase em snake_case
    freezeTableName: true,  // Não deixa o Sequelize pluralizar (trava o nome que você der)
    timestamps: true        // Mantém createdAt e updatedAt em camelCase
  }
});

export default sequelize;