import Insumo from '../models/Insumo.js';

class InsumoController {
    // Criar novo Insumo
    async store(req, res) {
    try {
        // 1. Extraímos apenas os campos permitidos do req.body
        const { 
            ism_descricao, 
            ism_preco, 
            gcp_id, 
            und_id,
            obra_id 
        } = req.body;

        // 2. Criamos o registro usando apenas as variáveis extraídas
        // Se o usuário enviar "admin: true" no JSON, ele será ignorado aqui
        const novoInsumo = await Insumo.create({ 
            ism_descricao, 
            ism_preco, 
            gcp_id, 
            und_id,
            obra_id
        });

        // 3. Retornamos o sucesso
        return res.status(201).json(novoInsumo);

    } catch (error) {
        // Tratamento de erro básico
        console.error("Erro ao criar insumo:", error);
        return res.status(400).json({ 
            error: 'Dados inválidos ou erro no servidor',
            details: error.message 
        });
    }
}

    // Listar todos com os relacionamentos (Grupo e Unidade)
    async index(req, res) {
        try {

            // Pega o obra_id da query string: /atividades?obra_id=14
            const { obra_id } = req.query;

            // Cria um objeto de filtro dinâmico
            const whereClause = {};
            if (obra_id) {
                whereClause.obra_id = obra_id;
            }

            const insumos = await Insumo.findAll({
                where: whereClause,
                include: ['grupo', 'unidade'] // Usando os "as" que definimos nos modelos
            });
            return res.json(insumos);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar insumos' });
        }
    }

    // GET /insumo/:id (ESSA É A QUE DEVE ESTAR FALTANDO)
    async show(req, res) {
        try {
            const { id } = req.params;
            const insumo = await Insumo.findByPk(id);
            if (!insumo) return res.status(404).json({ error: 'Insumo não encontrado' });
            return res.json(insumo);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar' });
        }
    }

    async delete(req, res) {
    try {
        const { id } = req.params;

        // 1. Buscar a atividade para ver se ela existe
        const insumo = await Insumo.findByPk(id);

        if (!insumo) {
            return res.status(404).json({ error: 'Atividade não encontrada.' });
        }

        // 2. Deletar o registro do banco de dados
        await insumo.destroy();

        // 3. Retornar uma mensagem de sucesso (status 204 ou 200 com JSON)
        return res.status(200).json({ message: 'Atividade removida com sucesso.' });

    } catch (error) {
        console.error("Erro ao deletar atividade:", error);
        return res.status(500).json({ error: 'Não foi possível excluir a atividade.' });
        }
    }
}

export default new InsumoController();