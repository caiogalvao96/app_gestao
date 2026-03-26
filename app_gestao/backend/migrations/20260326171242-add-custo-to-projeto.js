'use strict';

/** @type {import('sequelize-cli').Migration} */

  export async function up (queryInterface, Sequelize) {
    await queryInterface.addColumn('obra', 'custo_obra', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    });
  }

  export async function down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('obra', 'custo_obra');
  }

