import { DataTypes } from "sequelize";
import sequelize from "../database/conn.js";




const Produto = sequelize.define('produto', {
    pro_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pro_descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pro_preco: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue:0 
    },
    und_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Ou true, se quiser permitir vazio no início
        references: {
        model: 'unidade',
        key: 'und_id'
      }
    },
},{
    tableName: 'produto'
})

export default Produto;