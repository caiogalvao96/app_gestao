import { ItemComposicao, Insumo, Composicao } from '../models/index.js';

class ComposicaoService {
    /**
     * Calcula a soma de todos os itens de uma composição e atualiza o campo comp_valor_total.
     * @param {number} comp_id - ID da composição a ser recalculada.
     */
    async recalcularTotal(comp_id) {
        try {
            // 1. Busca os itens da composição, trazendo os preços dos insumos e das sub-composições
            const itens = await ItemComposicao.findAll({
                where: { comp_id },
                include: [
                    { 
                        model: Insumo, 
                        as: 'insumo', 
                        attributes: ['ism_preco'] 
                    },
                    { 
                        model: Composicao, 
                        as: 'sub_composicao', 
                        attributes: ['comp_valor_total'] 
                    }
                ]
            });

            let somaTotal = 0;

            // 2. Percorre os itens calculando: quantidade * preço
            itens.forEach(item => {
                let precoUnitario = 0;

                if (item.ism_id && item.insumo) {
                    // É um insumo direto
                    precoUnitario = parseFloat(item.insumo.ism_preco) || 0;
                } else if (item.sub_comp_id && item.sub_composicao) {
                    // É uma sub-composição (pega o valor total já calculado dela)
                    precoUnitario = parseFloat(item.sub_composicao.comp_valor_total) || 0;
                }

                const quantidade = parseFloat(item.quantidade) || 0;
                somaTotal += (precoUnitario * quantidade);
            });

            // 3. Atualiza o valor na tabela pai (Composicao)
            await Composicao.update(
                { comp_valor_total: somaTotal },
                { where: { comp_id } }
            );

            return somaTotal;

        } catch (error) {
            console.error(`Erro ao recalcular total da composição ${comp_id}:`, error);
            throw new Error("Falha no cálculo de custos da composição.");
        }
    }
}

export default new ComposicaoService();