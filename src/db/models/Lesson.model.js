const { Model, DataTypes } = require('sequelize');

const TABLE = 'Lesson';

class Lesson extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE,
            modelName: TABLE,
            timestamps: true
        }
    }
} 

const LessonSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'title'
    },
    description: {
        allowNull: false,
        type: DataTypes.TEXT,
        field:'description'
    },
    videoLink: {
        allowNull: false,
        type: DataTypes.STRING, 
        field:'videoLink'
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
    }
}
  
module.exports = { Lesson, LessonSchema };