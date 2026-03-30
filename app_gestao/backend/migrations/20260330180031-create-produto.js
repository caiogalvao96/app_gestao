'use strict';

/** @type {import('sequelize-cli').Migration} */

  export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('produto', {
      pro_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      pro_descricao: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pro_preco: {
        type: Sequelize.DECIMAL(12, 2), // Definido com precisão para evitar problemas com centavos
        allowNull: true,
        defaultValue: 0
      },
      und_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'unidade', // Certifique-se que a tabela 'unidade' já existe
          key: 'und_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      // Campos padrão do Sequelize (timestamps)
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  }

  export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('produto');
  }
