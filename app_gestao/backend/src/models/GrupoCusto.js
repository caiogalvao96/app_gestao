import { DataTypes } from "sequelize";
import sequelize from "../database/conn.js";

const GrupoCusto = sequelize.define('grupo_custo',{
    gpc_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    gcp_descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gcp_codigo: {
        type: DataTypes.STRING,
        allowNull:true
    }
},{
    tableName: 'grupo_custo'
})

export default GrupoCusto;