import { Atividade, Obra, Composicao } from '../models/index.js';

class AtividadeController {
    // Criar nova atividade
    async store(req, res) {
        try {
            const {
                ativ_descricao,
                ativ_observacao,
                ativ_data_inicio,
                ativ_data_fim,
                ativ_status,
                ativ_concluida, // Booleano: passar true ou false no JSON (sem aspas)
                obra_id,
                clas_id,
                comp_id
            } = req.body;

            const novaAtividade = await Atividade.create({
                ativ_descricao,
                ativ_observacao,
                ativ_data_inicio,
                ativ_data_fim,
                ativ_status,
                ativ_concluida,
                obra_id,
                clas_id,
                comp_id
            });

            return res.status(201).json(novaAtividade);
        } catch (error) {
            console.error("Erro ao criar atividade:", error);
            return res.status(400).json({ error: 'Erro ao salvar os dados' });
        }
    }

    // Listar atividades com dados da Obra (Eager Loading)
    async index(req, res) {
        try {
            const atividades = await Atividade.findAll({
                include: [{
                    model: Obra,
                    as: 'obra' // Deve ser igual ao "as" do arquivo central
                },
                {
                    model: Composicao,
                    as: 'composicao'
                }]
            });
            
            return res.json(atividades);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao buscar atividades' });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const atividade = await Atividade.findByPk(id);
            if (!atividade) return res.status(404).json({ error: 'Atividade não encontrada' });
            return res.json(atividade);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar' });
        }
    }

    // atividadeController.js

    async update(req, res) {
        try {
            const { id } = req.params; // O ID vem da rota (ex: /atividades/:id)
            const { 

                ativ_descricao,
                ativ_observacao,
                ativ_data_inicio,
                ativ_data_fim,
                ativ_status,
                ativ_concluida,
                obra_id,
                clas_id,
                comp_id

            } = req.body; // Campos que você quer atualizar

            // 1. Verificar se a atividade existe
            const atividade = await Atividade.findByPk(id);

            if (!atividade) {
                return res.status(404).json({ error: 'Atividade não encontrada' });
            }

            // 2. Executar a atualização
            await atividade.update({
                ativ_descricao,
                ativ_observacao,
                ativ_data_inicio,
                ativ_data_fim,
                ativ_status,
                ativ_concluida,
                obra_id,
                clas_id,
                comp_id
            });

            // 3. Retornar a atividade atualizada
            return res.json(atividade);

        } catch (error) {
            console.error("Erro no update de atividade:", error);
            return res.status(500).json({ error: 'Erro ao atualizar atividade' });
        }
    }

    // atividadeController.js

async delete(req, res) {
    try {
        const { id } = req.params;

        // 1. Buscar a atividade para ver se ela existe
        const atividade = await Atividade.findByPk(id);

        if (!atividade) {
            return res.status(404).json({ error: 'Atividade não encontrada.' });
        }

        // 2. Deletar o registro do banco de dados
        await atividade.destroy();

        // 3. Retornar uma mensagem de sucesso (status 204 ou 200 com JSON)
        return res.status(200).json({ message: 'Atividade removida com sucesso.' });

    } catch (error) {
        console.error("Erro ao deletar atividade:", error);
        return res.status(500).json({ error: 'Não foi possível excluir a atividade.' });
    }
}
}

export default new AtividadeController();  