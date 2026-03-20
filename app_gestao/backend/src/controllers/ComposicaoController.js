import { Composicao, ItemComposicao, sequelize, Unidade, Insumo } from '../models/index.js'
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
                obra_id,
                itens // Esperamos um array de itens aqui
            } = req.body;

            // 1. Criar a Composição (Pai) dentro da transação
            const novaComp = await Composicao.create({
                comp_nome,
                und_id,
                comp_tipo,
                obra_id,
                comp_valor_total: 0 // Começa zerada, calcularemos ao final
            }, { transaction: t });

            // 2. Se houver itens, vamos vinculá-los e salvá-los
            if (itens && itens.length > 0) {
                const itensFormatados = itens.map(item => ({
                    quantidade: item.quantidade,
                    ism_id: item.ism_id || null,
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

        const { obra_id } = req.query; // Pega o ID enviado pelo front

        const whereClause = {};
        if (obra_id) {
        // Filtra por composições da obra OU composições globais (obra_id null)
        whereClause.obra_id = obra_id; 
        }

        // Buscamos todas, mas podemos ordenar por nome
        const composicoes = await Composicao.findAll({
            where: whereClause,
            order: [['comp_id', 'ASC']],
            include: [
                { model: Unidade, as: 'unidade', attributes: ['und_codigo'] },
                { model: ItemComposicao, as: 'itens', include: [
                    {
                        model: Insumo,
                        as: 'insumo',
                        include:[{model: Unidade, as: 'unidade'}]
                    }
                ] },
            ]
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
                                attributes: ['ism_descricao', 'ism_preco'] // Dados que o Front vai exibir
                            },
                            {
                                model: Composicao,
                                as: 'sub_composicao',
                                attributes: ['comp_nome', 'comp_valor_total']
                            }
                        ]
                    },
                    { model: Unidade, as: 'unidade', attributes: ['und_codigo'] }
                ]
             });

                if (!composicao) {
                    return res.status(404).json({ error: 'Composição não encontrada' });
                }

                return res.json(composicao);
            }catch (error) {
                    console.error(error);
                    return res.status(500).json({ error: 'Erro ao buscar detalhes da composição' });
                } 
    }

    async update(req, res) {
        const t = await sequelize.transaction(); // Inicia transação

        try {
            const { id } = req.params;
            const { 
                comp_nome,
                comp_tipo,
                und_id,
                obra_id,
                itens // Array de itens
            } = req.body;

            const composicao = await Composicao.findByPk(id);

            if (!composicao) {
                await t.rollback();
                return res.status(404).json({ error: 'Composição não encontrada' });
            }

            // 1. Atualiza os dados básicos da Composição
            await composicao.update({
                comp_nome,
                comp_tipo,
                und_id,
                obra_id
            }, { transaction: t });

            // 2. Lógica para os ITENS (Se o array de itens foi enviado)
            if (itens) {
                // Remove todos os itens antigos desta composição
                await ItemComposicao.destroy({
                    where: { comp_id: id },
                    transaction: t
                });

                // Formata os novos itens para inserção
                const itensFormatados = itens.map(item => ({
                    comp_id: id,
                    ism_id: item.ism_id,
                    quantidade: item.quantidade
                }));

                // Insere os novos itens
                await ItemComposicao.bulkCreate(itensFormatados, { transaction: t });
            }

            // 3. Finaliza a transação
            await t.commit();

            // 4. (Opcional) Recalcular o valor total após mudar os itens
            if (typeof ComposicaoService !== 'undefined') {
                await ComposicaoService.recalcularTotal(id);
            }

            // Busca a composição atualizada com os novos itens para retornar ao front
            const atualizada = await Composicao.findByPk(id, {
                include: [{ model: ItemComposicao, as: 'itens' }]
            });

            return res.json(atualizada);

            } catch (error) {
                if (t) await t.rollback();
                console.error("Erro no update de composição:", error);
                return res.status(500).json({ error: 'Erro ao atualizar composição' });
            }
    }

    async delete(req, res) {
        const t = await sequelize.transaction();

        try {
            const { id } = req.params;

            // 1. Verificar se a composição existe
            const composicao = await Composicao.findByPk(id);

            if (!composicao) {
                await t.rollback();
                return res.status(404).json({ error: 'Composição não encontrada' });
            }

            // 2. Deletar os itens primeiro (Integridade Referencial)
            // Se você tiver o CASCADE no banco, essa parte é opcional
            await ItemComposicao.destroy({
                where: { comp_id: id },
                transaction: t
            });

            // 3. Deletar a composição
            await composicao.destroy({ transaction: t });

            // 4. Confirmar transação
            await t.commit();

            return res.json({ message: 'Composição excluída com sucesso' });

        } catch (error) {
            if (t) await t.rollback();
            console.error("Erro ao deletar composição:", error);
            return res.status(500).json({ error: 'Erro ao excluir composição' });
        }
    }
    
}

export default new ComposicaoController();