const { Model, DataTypes } = require('sequelize');

const TABLE = 'User';

class User extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE,
            modelName: TABLE,
            timestamps: true
        }
    }
} 

const UserSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    fullname: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'fullname'
    },
    birthDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field:'birthDate'
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'email'
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'password'
    },
    identificationTypeId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'identificationTypeId',
        references:{
            model:'IdentificationType',
            key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    identificationNumber: {
        allowNull: true,
        type: DataTypes.STRING,
        field:'identificationNumber'
    },
    userRoleId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: 'userRoleId',
        references:{
            model:'UserRole',
            key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    }
}
  
module.exports = { User, UserSchema };