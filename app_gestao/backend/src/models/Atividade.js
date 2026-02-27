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
    }
},{
    tableName: 'atividade'
});

Obra.hasMany(Atividade)

Atividade.belongsTo(Obra, {
    constraints:true,
    foreignKey: 'obra_id',
    targetKey: 'obra_id',
    onDelete: 'CASCADE'
});

Atividade.belongsTo(ClassificacaoArea, {
    foreignKey: 'clas_id',
    as: 'classificacao_area'
});

export default Atividade; 