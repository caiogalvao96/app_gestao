import { DataTypes } from "sequelize";
import sequelize from "../database/conn.js";

const ClassificacaoArea = sequelize.define('ClassificacaoArea', {
    clas_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    clas_cod: {
        type: DataTypes.STRING,
        allowNull: true
    },
    clas_descricao: {
        type: DataTypes.STRING,
        allowNull: true
    }

})

export default ClassificacaoArea;