import { DataTypes } from 'sequelize';
import sequelize from '../database/conn.js';

const ItemComposicao = sequelize.define('ItemComposicao', {
    item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'composicao', key: 'comp_id' }
    },
    // Campo para o Insumo (pode ser nulo se o item for uma sub-composição)
    ism_id: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: { model: 'insumo', key: 'ism_id' }
    },  
    // Campo para Sub-composição (pode ser nulo se o item for um insumo)
    sub_comp_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'composicao', key: 'comp_id' }
    },
    quantidade: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'item_composicao',
    underscored: true,
    timestamps: false
});

export default ItemComposicao;