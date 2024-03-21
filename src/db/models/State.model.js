const { Model, DataTypes } = require('sequelize');

const TABLE = 'State';

class State extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE,
            modelName: TABLE,
            timestamps: true
        }
    }
} 

const StateSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'title'
    }
}
  
module.exports = { State, StateSchema };