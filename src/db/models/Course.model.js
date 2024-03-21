const { Model, DataTypes } = require('sequelize');

const TABLE = 'Course';

class Course extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE,
            modelName: TABLE,
            timestamps: true
        }
    }
} 

const CourseSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    logo: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'logo'
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
    publicationDate: {
      allowNull: false,
      type: DataTypes.DATE,
      field:'publicationDate'
    },
    introductoryVideo: {
      allowNull: false,
      type: DataTypes.STRING,
      field:'introductoryVideo'
    },
    deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field:'deletedAt'
    }
}
  
module.exports = { Course, CourseSchema };