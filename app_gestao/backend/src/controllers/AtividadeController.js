import Atividade from '../models/Atividade.js'

class AtividadeController {

    async store(req, res){
        try{
            const {
                ativ_descricao,
                ativ_observacao,
                ativ_data_inicio,
                ativ_data_fim,
                ativ_status,
                ativ_concluida,
                obra_id,
                clas_id
            } = req.body;

            const novaAtividade = await Atividade.create({
                ativ_descricao,
                ativ_observacao,
                ativ_data_inicio,
                ativ_data_fim,
                ativ_status,
                ativ_concluida,
                obra_id,
                clas_id
            });

            return res.status(201).json(novaAtividade);

        }catch (error){

            console.error("Erro ao criar atividade:", error);
            return res.status(400).json({ 
            error: 'Dados inválidos ou erro no servidor',
            details: error.message 
            });
        }  
    }

    async index(req, res) {
        try {
            const atividade = await Atividade.findAll({
                include: Obra, where: {obra_id: obra_id}
            }); // Sem o objeto de configuração
            
            return res.json(atividade);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar obras' });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const atividade = await Atividade.findByPk(id);
            if (!atividade) return res.status(404).json({ error: 'Insumo não encontrado' });
            return res.json(atividade);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar' });
        }
    }

}

export default new AtividadeController();