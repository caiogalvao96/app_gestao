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
}

export default new AtividadeController();  