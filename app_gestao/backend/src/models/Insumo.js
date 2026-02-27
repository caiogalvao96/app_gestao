import { DataTypes } from "sequelize";
import sequelize from "../database/conn.js";

import GrupoCusto from "./GrupoCusto.js";
import Unidade from "./Unidade.js";

const Insumo = sequelize.define('insumo', {
    ism_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ism_descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ism_preco: {
        type: DataTypes.DECIMAL,
        allowNull: true
    }
},{
    tableName: 'insumo'
})

Insumo.belongsTo(GrupoCusto, {
    foreignKey: 'gpc_id',
    as: 'grupo'
});

Insumo.belongsTo(Unidade, {
    foreignKey: 'und_id',
    as: 'unidade'
});

export default Insumo;