'use strict';

/** @type {import('sequelize-cli').Migration} */

  export async function up (queryInterface, Sequelize) {
    await queryInterface.addColumn('obra', 'obra_valor_venda', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    });
  }

  export async function down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('obra', 'obra_valor_venda');
  }

