import {DataTypes} from 'sequelize'
import sequelize  from '../database/conn.js'

const Obra = sequelize.define('Obra', {
    obra_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    obra_nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    obra_localizacao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    obra_data_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
     obra_data_fim: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    obra_resp_obra: {
        type: DataTypes.STRING
    },
    obra_resp_cliente: {
        type: DataTypes.STRING
    },
    obra_status: {
        type: DataTypes.ENUM('Orçamento', 'Execução', 'Pausado', 'Concluído'),
        defaultValue: 'Orçamento'
    }


});

export default Obra;
