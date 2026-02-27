import Obra from '../models/Obra.js'

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
            const obra = await Obra.findAll(); // Sem o objeto de configuração
            
            return res.json(obra);
        } catch (error) {
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
}

export default new ObraController();