'use strict';

/** @type {import('sequelize-cli').Migration} */

  export async function up (queryInterface, Sequelize) {
    await queryInterface.addColumn('atividade', 'ativ_bdi', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    });
    await queryInterface.addColumn('atividade', 'ativ_valor_venda', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    });
  }



  export async function down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('atividade', 'ativ_bdi');
   await queryInterface.removeColumn('atividade', 'ativ_valor_venda');
  }

