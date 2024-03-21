const { Model, DataTypes } = require('sequelize');

const TABLE = 'IdentificationType';

class IdentificationType extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE,
            modelName: TABLE,
            timestamps: true
        }
    }
} 

const IdentificationTypeSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    code: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'code'
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'description'
    }
}
  
module.exports = { IdentificationType, IdentificationTypeSchema };