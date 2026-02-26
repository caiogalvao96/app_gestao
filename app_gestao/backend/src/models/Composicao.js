import { DataTypes } from 'sequelize';
import sequelize from '../database/conn.js';

const Composicao = sequelize.define('Composicao', {
    comp_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comp_nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comp_unidade: { 
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'un'
    },
    // Campo para separar as composições globais das específicas
    comp_tipo: {
        type: DataTypes.ENUM('GLOBAL', 'OBRA', 'AUXILIAR'),
        allowNull: false,
        defaultValue: 'GLOBAL'
    }
});

export default Composicao;