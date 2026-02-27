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
            und_id 
        } = req.body;

        // 2. Criamos o registro usando apenas as variáveis extraídas
        // Se o usuário enviar "admin: true" no JSON, ele será ignorado aqui
        const novoInsumo = await Insumo.create({ 
            ism_descricao, 
            ism_preco, 
            gcp_id, 
            und_id 
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
            const insumos = await Insumo.findAll({
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
}

export default new InsumoController();