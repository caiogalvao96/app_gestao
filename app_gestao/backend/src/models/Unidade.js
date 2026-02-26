import { DataTypes } from "sequelize";
import sequelize from "../database/conn.js";

const Unidade = sequelize.define('Unidade', {
    und_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    und_codigo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    und_descricao: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

export default Unidade;