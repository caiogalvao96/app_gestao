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

    // Exemplo de lógica no seu controller de Back-end
    async calcularCusto(req, res) {
        const { id } = req.params;

        try {
            // 1. Soma a coluna 'ativ_valor_total' de todas as atividades vinculadas
            // O Sequelize retorna null se não houver registros, por isso o || 0
            const totalCusto = await Atividade.sum('ativ_valor_total', {
                where: { obra_id: id }
            });

            const totalVenda = await Atividade.sum('ativ_valor_venda', {
                where: { obra_id: id }
            });

          

            // 2. Atualiza o campo 'custo_obra' na tabela Obra
            // Verifique se na sua tabela Obra a PK é 'id' ou 'obra_id'
            const [updatedRows] = await Obra.update(
                { custo_obra: totalCusto || 0,
                  obra_valor_venda: totalVenda || 0  
                }, 
                { where: { obra_id: id } }   
            );

            if (updatedRows === 0) {
                console.warn("Nenhuma obra foi atualizada. O ID existe no banco?");
            }

            return res.status(200).json({ 
                success: true, 
                novoTotal: totalCusto || 0 
            });

        } catch (error) {
            // ESSA LINHA É A MAIS IMPORTANTE AGORA:
            // Ela vai cuspir o erro real no seu terminal (node)
            console.error("--- ERRO NO SEQUELIZE ---");
            console.error(error); 
            
            return res.status(500).json({ 
                error: "Erro interno ao calcular custo",
                details: error.message 
            });
        }
    }
}

export default new ObraController();