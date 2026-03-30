import sequelize from '../database/conn.js';
import Obra from './Obra.js';
import Atividade from './Atividade.js';
import ClassificacaoArea from './ClassificacaoArea.js';
import Composicao from './Composicao.js';
import Insumo from './Insumo.js';
import ItemComposicao from './ItemComposicao.js';
import Unidade from './Unidade.js'
import Produto from './Produto.js';
import Categoria from './Categoria.js'

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

// Relacionamento Atividade -> Composição (1:N)
Composicao.hasMany(Atividade, { foreignKey: 'comp_id', as: 'atividade' });
Atividade.belongsTo(Composicao, { foreignKey: 'comp_id', as: 'composicao' });

//Relacionamento Obra -> Insumo (1:N)
Obra.hasMany(Insumo, { foreignKey: 'obra_id', as: 'insumo' })
Insumo.belongsTo(Obra, { foreignKey: 'obra_id', as: 'obra'})

//Relacionamento insumo -> unidade de medidida
Insumo.belongsTo(Unidade, { foreignKey: 'und_id', as: 'unidade' });
Unidade.hasMany(Insumo, { foreignKey: 'und_id', as: 'insumo' });

//Relacionamento Produto -> unidade de medidida
Produto.belongsTo(Unidade, { foreignKey: 'und_id', as: 'unidade' });
Unidade.hasMany(Produto, { foreignKey: 'und_id', as: 'produto' });


// O CORAÇÃO: COMPOSIÇÃO E SEUS ITENS ---

// 1. A Composição "Pai" possui vários itens nela
Composicao.hasMany(ItemComposicao, { 
    foreignKey: 'comp_id', 
    as: 'itens', 
    onDelete: 'CASCADE' // Se deletar a composição, remove os itens dela
});
ItemComposicao.belongsTo(Composicao, { foreignKey: 'comp_id', as: 'composicao_pai' });

// 2. Um ItemComposicao pode ser um Insumo
ItemComposicao.belongsTo(Insumo, { foreignKey: 'ism_id', as: 'insumo' });
Insumo.hasMany(ItemComposicao, { foreignKey: 'ism_id', as: 'usos_em_composicoes' });

// 3. Um ItemComposicao pode ser uma Sub-Composição (Composição Auxiliar)
ItemComposicao.belongsTo(Composicao, { foreignKey: 'sub_comp_id', as: 'sub_composicao' });
// Importante: Indica que uma composição pode estar dentro de várias outras
Composicao.hasMany(ItemComposicao, { foreignKey: 'sub_comp_id', as: 'onde_e_usada' });

Composicao.belongsTo(Unidade, { foreignKey: 'und_id', as: 'unidade' });
Unidade.hasMany(Composicao, { foreignKey: 'und_id' });

Obra.hasMany(Composicao, { 
    foreignKey: 'obra_id', 
    as: 'composicoes_locais',
    onDelete: 'CASCADE' // Se a obra for deletada, as locais morrem. As globais (null) ficam.
});
Composicao.belongsTo(Obra, { 
    foreignKey: 'obra_id', 
    as: 'obra_dona' 
});

// Relacionamento Categoria -> Atividade
Categoria.hasMany(Atividade, { foreignKey: 'cat_id' });
Atividade.belongsTo(Categoria, { foreignKey: 'cat_id' });


export { sequelize, Obra, Atividade, ClassificacaoArea, Composicao, Insumo, ItemComposicao, Unidade, Produto, Categoria };



