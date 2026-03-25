import { Obra, Atividade } from '../models/index.js';



class ObraController {
    //Criar nova obra
    async store(req, res){
        try{

             const{
                obra_nome,
                obra_localizacao,
                obra_data_inicio,
                obra_data_fim,
                obra_resp_obra,
                obra_resp_cliente,
                obra_status
            } = req.body;

            const novaObra = await Obra.create({
                obra_nome,
                obra_localizacao,
                obra_data_inicio,
                obra_data_fim,
                obra_resp_obra,
                obra_resp_cliente,
                obra_status
            });

            return res.status(201).json(novaObra);
        }catch (error){

            console.error("Erro ao criar obra:", error);
            return res.status(400).json({ 
            error: 'Dados inválidos ou erro no servidor',
            details: error.message 
            });
        }  
    }

    async index(req, res) {
        try {
            const obra = await Obra.findAll({
                include:[{model: Atividade, as: 'atividades'}],
                order: [['obra_id', 'DESC']]
            }); // Sem o objeto de configuração
            
            return res.json(obra);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao buscar obras' });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const obra = await Obra.findByPk(id);
            if (!obra) return res.status(404).json({ error: 'Insumo não encontrado' });
            return res.json(obra);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            // 1. Buscar a atividade para ver se ela existe
            const obra = await Obra.findByPk(id);

            if (!obra) {
                return res.status(404).json({ error: 'Obra não encontrada.' });
            }

            // 2. Deletar o registro do banco de dados
            await obra.destroy();

            // 3. Retornar uma mensagem de sucesso (status 204 ou 200 com JSON)
            return res.status(200).json({ message: 'Obra deletada com sucesso.' });

        } catch (error) {
            console.error("Erro ao deletar atividade:", error);
            return res.status(500).json({ error: 'Não foi possível excluir a atividade.' });
        }
    }

    async update(req, res){
        try{

            const{ id } = req.params;

             const{
                obra_nome,
                obra_localizacao,
                obra_data_inicio,
                obra_data_fim,
                obra_resp_obra,
                obra_resp_cliente,
                obra_status
            } = req.body;

            const obra = await Obra.findByPk(id);

            if(!obra){
                return res.status(404).json({ error: 'Obra não encontrada' });
            }

            await obra.update({
                obra_nome,
                obra_localizacao,
                obra_data_inicio,
                obra_data_fim,
                obra_resp_obra,
                obra_resp_cliente,
                obra_status
            });

            return res.status(201).json(obra);
        }catch (error){

            console.error("Erro ao atualizar obra:", error);
            return res.status(400).json({ 
            error: 'Dados inválidos ou erro no servidor',
            details: error.message 
            });
        }  
    }
}

export default new ObraController();