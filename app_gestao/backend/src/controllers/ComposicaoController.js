import { Composicao, ItemComposicao, sequelize, Unidade } from '../models/index.js'
import ComposicaoService from '../services/ComposicaoService.js';

class ComposicaoController{


    async store(req, res) {
        // Iniciamos a transação - O "Contrato de Tudo ou Nada"
        const t = await sequelize.transaction();

        try {
            const {
                comp_nome,
                und_id,
                comp_tipo,
                itens // Esperamos um array de itens aqui
            } = req.body;

            // 1. Criar a Composição (Pai) dentro da transação
            const novaComp = await Composicao.create({
                comp_nome,
                und_id,
                comp_tipo,
                comp_valor_total: 0 // Começa zerada, calcularemos ao final
            }, { transaction: t });

            // 2. Se houver itens, vamos vinculá-los e salvá-los
            if (itens && itens.length > 0) {
                const itensFormatados = itens.map(item => ({
                    quantidade: item.quantidade,
                    insumo_id: item.insumo_id || null,
                    sub_comp_id: item.sub_comp_id || null,
                    comp_id: novaComp.comp_id // O ID que o banco acabou de gerar
                }));

                // Salvamos todos os itens de uma vez só
                await ItemComposicao.bulkCreate(itensFormatados, { transaction: t });
            }

            // 3. Efetivamos as gravações no banco de dados
            await t.commit();

            /** * 4. PÓS-PROCESSAMENTO: Calcular o valor total 
             * Chamamos o service para somar os preços dos insumos e atualizar a comp_valor_total
             */
            await ComposicaoService.recalcularTotal(novaComp.comp_id);

            // 5. Buscamos a composição completa (com os itens) para devolver ao Front
            const composicaoFinalizada = await Composicao.findByPk(novaComp.comp_id, {
                include: { 
                    model: ItemComposicao, 
                    as: 'itens',
                    include: ['insumo', 'sub_composicao'] // Opcional: já traz os nomes dos itens
                }
            });

            return res.status(201).json(composicaoFinalizada);

        } catch (error) {
            // Se algo deu errado, desfazemos TUDO (Rollback)
            if (t) await t.rollback();
            
            console.error("Erro ao criar composição:", error);
            return res.status(400).json({ 
                error: 'Erro ao salvar composição e itens',
                details: error.message 
            });
        }
    }

    async index(req, res) {
    try {
        // Buscamos todas, mas podemos ordenar por nome
        const composicoes = await Composicao.findAll({
            order: [['comp_id', 'ASC']],
            include: [{ model: Unidade, as: 'unidade', attributes: ['und_codigo'] }]
        });
        
        return res.json(composicoes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar composições' });
    }
}

    async show(req, res) {
    try {
        const { id } = req.params;
        const composicao = await Composicao.findByPk(id, {
            // "Traga os itens junto com a composição"
            include: [
                {
                    model: ItemComposicao,
                    as: 'itens', // Deve ser o mesmo nome definido no model/associação
                    include: [
                        {
                            model: Insumo,
                            as: 'insumo',
                            attributes: ['ism_nome', 'ism_preco', 'ism_unidade'] // Dados que o Front vai exibir
                        },
                        {
                            model: Composicao,
                            as: 'sub_composicao',
                            attributes: ['comp_nome', 'comp_valor_total', 'comp_unidade']
                        },
                        { model: Unidade, as: 'unidade', attributes: ['und_codigo'] }
                    ]
                }
            ]
        });

        if (!composicao) {
            return res.status(404).json({ error: 'Composição não encontrada' });
        }

        return res.json(composicao);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar detalhes da composição' });
    }
}
}

export default new ComposicaoController();