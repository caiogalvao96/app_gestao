import { DataTypes } from 'sequelize';
import sequelize from '../database/conn.js';

const Composicao = sequelize.define('composicao', {
    comp_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comp_nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    und_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Ou true, se quiser permitir vazio no início
        references: {
        model: 'unidade',
        key: 'und_id'
      }
    },
    // Campo para separar as composições globais das específicas
    comp_tipo: {
        type: DataTypes.ENUM('PRINCIPAL', 'AUXILIAR'),
        allowNull: false,
        defaultValue: 'PRINCIPAL'
    },
    comp_valor_total:{
        type: DataTypes.DECIMAL(12,2),
        allowNull: false,
        defaultValue: 0
    },
    comp_is_global: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    comp_obra_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Null apenas se for Global
        references: {
            model: 'obra',
            key: 'obra_id',
        },
    }
},{
    tableName: 'composicao'
});

export default Composicao;