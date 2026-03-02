import { Composicao } from '../models/index.js'

class ComposicaoController{

    async store(req, res){
        try{

            const{
                comp_nome,
                comp_unidade,
                comp_tipo
            } = req.body;

            const novaComp = await Composicao.create({
                comp_nome,
                comp_unidade,
                comp_tipo
            });

            return res.status(201).json(novaComp);

        }catch(error){
            console.error("Erro ao criar obra:", error);
            return res.status(400).json({ 
            error: 'Dados inválidos ou erro no servidor',
            details: error.message 
            });
        }
    }

    async index(req, res) {
        try {
            const composicao = await Composicao.findAll();
            
            return res.json(composicao);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao buscar composições' });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const composicao = await Composicao.findByPk(id);
            if (!composicao) return res.status(404).json({ error: 'Composicão não encontrada' });
            return res.json(composicao);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar' });
        }
    }
}

export default new ComposicaoController();