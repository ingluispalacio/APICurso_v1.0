const { Model, DataTypes } = require('sequelize');

const TABLE = 'ProgressCourse';

class ProgressCourse extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE,
            modelName: TABLE,
            timestamps: true
        }
    }
} 

const ProgressCourseSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    userId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: 'userId',
        references:{
            model:'User',
            key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    courseId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: 'courseId',
        references:{
            model:'Course',
            key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    stateId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'stateId',
        references:{
            model:'State',
            key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    ApprovedDate: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'ApprovedDate',
    }
}
  
module.exports = { ProgressCourse, ProgressCourseSchema };