import { DataTypes } from "sequelize";
import sequelize from "../database/conn.js";

const Categoria = sequelize.define('categoria', {
    cat_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cat_nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'categoria'
});

export default Categoria;