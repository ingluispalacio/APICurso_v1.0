const { Model, DataTypes } = require('sequelize');

const TABLE = 'ProgressLesson';

class ProgressLesson extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE,
            modelName: TABLE,
            timestamps: true
        }
    }
} 

const ProgressLessonSchema = {
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
    lessonId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: 'lessonId',
        references:{
            model:'Lesson',
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
}
  
module.exports = { ProgressLesson, ProgressLessonSchema };