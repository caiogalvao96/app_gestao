'use strict';

/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('atividade', 'cat_id', {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'categoria',
      key: 'cat_id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  });

  await queryInterface.addColumn('atividade', 'ativ_global', {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('atividade', 'cat_id');
  await queryInterface.removeColumn('atividade', 'ativ_global');
}