import { DataTypes } from "sequelize";
import sequelize from "../database/conn.js";

import Obra from './Obra.js'
import ClassificacaoArea from "./ClassificacaoArea.js";

const Atividade = sequelize.define('atividade', {
    ativ_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ativ_descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ativ_observacao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ativ_data_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
     ativ_data_fim: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    ativ_status: {
        type: DataTypes.ENUM('Atrasada','Concluída', 'Pendente'),
        defaultValue: 'Pendente'
    },
    ativ_concluida: {
        type: DataTypes.BOOLEAN
    },
    ativ_quantidade: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
    },
    ativ_valor_unitario: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
    },
    ativ_valor_total: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
    },
    // Chaves Estrangeiras (FKs) que conectam tudo
    obra_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'obra', key: 'obra_id' }
    },
    comp_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'composicao', key: 'comp_id' }
    },
    clas_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'classificacao_area', key: 'clas_id' }
    }
},{
    tableName: 'atividade',
    underscored: true,
    timestamps: true
});


export default Atividade; 