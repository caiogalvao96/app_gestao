import sequelize from '../database/conn.js';
import Obra from './Obra.js';
import Atividade from './Atividade.js';
import ClassificacaoArea from './ClassificacaoArea.js';
import Composicao from './Composicao.js';
import Insumo from './Insumo.js';
import ItemComposicao from './ItemComposicao.js';
import Unidade from './Unidade.js'

// Aqui é o lugar sagrado das associações!
// Fazemos aqui porque ambos os models já foram carregados.

// 1. Relacionamento Obra -> Atividades
Obra.hasMany(Atividade, { 
    foreignKey: 'obra_id', 
    as: 'atividades' 
});

// 2. Relacionamento Atividade -> Obra
Atividade.belongsTo(Obra, {
    constraints: true,
    foreignKey: 'obra_id',
    as: 'obra',
    onDelete: 'CASCADE'
});

// 3. Relacionamento Atividade -> Classificacao
Atividade.belongsTo(ClassificacaoArea, {foreignKey: 'clas_id', as: 'classificacao_area'});

// A Composição possui vários itens (Ingredientes)
Composicao.hasMany(ItemComposicao, { foreignKey: 'comp_id', as: 'itens' });
ItemComposicao.belongsTo(Composicao, { foreignKey: 'comp_id', as: 'composicao_pai' });

// O Item pode ser um Insumo
ItemComposicao.belongsTo(Insumo, { foreignKey: 'insumo_id', as: 'insumo' });

// O Item pode ser uma Sub-Composição
ItemComposicao.belongsTo(Composicao, { foreignKey: 'sub_comp_id', as: 'sub_composicao' });

// Relacionamento Atividade -> Composição (1:N)
Composicao.hasMany(Atividade, { foreignKey: 'comp_id', as: 'atividade' });
Atividade.belongsTo(Composicao, { foreignKey: 'comp_id', as: 'composicao' });

//Relacionamento Obra -> Insumo (1:N)
Obra.hasMany(Insumo, { foreignKey: 'obra_id', as: 'insumo' })
Insumo.belongsTo(Obra, { foreignKey: 'obra_id', as: 'obra'})

//Relacionamento insumo -> unidade de medidida
Insumo.belongsTo(Unidade, { foreignKey: 'und_id', as: 'unidade' });
Unidade.hasMany(Insumo, { foreignKey: 'und_id', as: 'insumo' });

export { sequelize, Obra, Atividade, ClassificacaoArea , Composicao, Insumo, ItemComposicao, Unidade };

