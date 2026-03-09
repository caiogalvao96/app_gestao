import { Unidade }  from '../models/index.js';

class UnidadeController {

     async index(req, res) {
        try {  

            const unidades = await Unidade.findAll({
                order: [['und_id', 'ASC']]
            });
            
            return res.json(unidades);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao buscar atividades' });
        }
    }
}

export default  new UnidadeController();