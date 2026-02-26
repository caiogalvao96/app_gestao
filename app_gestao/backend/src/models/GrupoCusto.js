import { DataTypes } from "sequelize";
import sequelize from "../database/conn.js";

const GrupoCusto = sequelize.define('GrupoCusto',{
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
})

export default GrupoCusto;