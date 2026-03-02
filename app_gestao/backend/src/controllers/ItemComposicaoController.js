import { ItemComposicao } from "../models/index.js";

class ItemComposicaoController{
    async store(req, res){
        try{

            const{
                comp_id,
                insumo_id,
                sub_comp_id,
                quantidade
            } = req.body

            const novoItemComp = await ItemComposicao.create({
                comp_id,
                insumo_id,
                sub_comp_id,
                quantidade
            });

            return res.status(201).json(novoItemComp);

        }catch(error){
            console.error("Erro ao criar obra:", error);
            return res.status(400).json({ 
            error: 'Dados inválidos ou erro no servidor',
            details: error.message 
            });
        }
    }

    async index(req, res){
        try{
            const itemComposicao = await ItemComposicao.findAll();
            return res.json(itemComposicao);
        }catch(error){
            return res.status(500).json({error: "Erro ao buscar item composições."});
        }
    }

    async show(req, res){
        try{
            const { id } = req.params;
            const itemComposicao = await ItemComposicao.findByPk(id);
            if(!itemComposicao) return res.status(404).json({error: "Item composicão não encontrado"})
            return res.json(itemComposicao);

        }catch(error){
            return res.status(500).json({error: "Erro ao buscar itemComposicão"})
        }
    }

     async update(req, res) {
    try {
        const { id } = req.params;

        // 1. Busca o registro no banco
        const item = await ItemComposicao.findByPk(id);

        // 2. Verifica se ele existe
        if (!item) {
            return res.status(404).json({ error: "Item de composição não encontrado" });
        }

        // 3. Atualiza os campos com o que veio no body
        await item.update(req.body);

        // 4. Retorna o item já atualizado
        return res.json(item);

    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar item de composição" });
    }
}
}

export default new ItemComposicaoController();