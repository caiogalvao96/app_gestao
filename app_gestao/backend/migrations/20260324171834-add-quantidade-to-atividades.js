'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';


  export async function up (queryInterface, Sequelize) {
    // Adiciona a coluna 'ativ_quantidade' na tabela 'Atividades'
    await queryInterface.addColumn('atividade', 'ativ_quantidade', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    });
  }

  export async function down (queryInterface, Sequelize) {
    // Caso precise reverter, removemos a coluna
    await queryInterface.removeColumn('atividade', 'ativ_quantidade');
  }
