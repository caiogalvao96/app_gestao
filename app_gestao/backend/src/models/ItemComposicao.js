import { DataTypes } from 'sequelize';
import sequelize from '../database/conn.js';
import Insumo from './Insumo.js';
import Composicao from './Composicao.js';

const ItemComposicao = sequelize.define('ItemComposicao', {
    item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantidade: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: false,
        defaultValue: 1.0000
    }
}, {
    tableName: 'itens_composicao',
    underscored: true
});

// --- ASSOCIAÇÕES ---

// A composição "Pai" que está sendo montada
ItemComposicao.belongsTo(Composicao, { foreignKey: 'composicao_pai_id', as: 'Pai' });

// O item filho (pode ser um Insumo...)
ItemComposicao.belongsTo(Insumo, { foreignKey: 'insumo_id', as: 'Insumo' });

// (...ou pode ser outra Composição, como a Caixa de Ferramentas dentro de uma Atividade)
ItemComposicao.belongsTo(Composicao, { foreignKey: 'composicao_filha_id', as: 'Filha' });

export default ItemComposicao;