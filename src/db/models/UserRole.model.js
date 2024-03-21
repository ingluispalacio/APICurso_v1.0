const { Model, DataTypes } = require('sequelize');

const TABLE = 'UserRole';

class UserRole extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE,
            modelName: TABLE,
            timestamps: true
        }
    }
} 

const UserRoleSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'description'
    }
}
  
module.exports = { UserRole, UserRoleSchema };