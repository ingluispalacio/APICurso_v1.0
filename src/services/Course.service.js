const { models,sequelize, Op } = require('../libs/sequelize');

class CourseService { 
  
    constructor() {}

    async find(where={}) {
      const res = await models.Course.findAll(where);
      return res;
    }

    async findByPk(id) {
      const res = await models.Course.findByPk(id,{
        include: {
            model: models.Lesson
        }
      });
      return res;
    }

    async findByPkStudent(id) {
      const res = await models.Course.findByPk(id,{
        include: [
          {
            model: models.ProgressCourse,
            attributes:[[sequelize.literal('`ProgressCourses->State`.`title`'), 'state']] ,
            include:{
              model: models.State,
              attributes:[],
            }
          },
          {
            model: models.Lesson
          }
          
        ],
        where: {
          deleteAt: {
            [Op.is]: null 
          }
        }
      });
      return res;
    }

    async findOne(where) {
      const res = await models.Course.findOne(where);
      return res;
    }

    async create(data, options = {}) {
      const t = options.transaction || null;
      const res = await models.Course.create(data, { transaction: t } );
      return res;
    }

    async update(id, data, options = {}) {
      const t = options.transaction || null;
      const model = await models.Course.findByPk(id, { transaction: t });
      const res = await model.update(data, { transaction: t });
      return res;
    }

    async delete(id) {
      const model = await this.findByPk(id);
      await model.destroy();
      return { deleted: true };
    }

    async softDelete(id) {
      const model = await this.findByPk(id);
      model.deletedAt = new Date();
      await model.save();
      return { deleted: true };
    }

    async findParam({ page = 1, limit = 10, title, startDate, endDate, stateCourse, userRole }) {
      const offset = (page - 1) * limit; 
    
      let whereClause = '';
      let columnsStudent = '';
      if (title) {
        whereClause += ` AND Course.title LIKE '%${title}%'`;
      }
      if (startDate && endDate) {
        whereClause += ` AND Course.publicationDate BETWEEN '${startDate}' AND '${endDate}'`;
      }

      
      if (userRole==="ESTUDIANTE") {
        columnsStudent=`,
        SUM(CASE WHEN StateLesson.title = 'FINALIZADO' THEN 1 ELSE 0 END) AS completedLessons,
          StateCourse.title as stateCourse
        `;
        if (stateCourse) {
          whereClause += ` AND StateCourse.title LIKE '%${stateCourse}%'`;
        }
      }
    
      const query = `
        SELECT
          Course.id,
          Course.logo,
          Course.title,
          Course.publicationDate,
          Course.introductoryVideo,
          COUNT(Lesson.id) AS totalLessons
          ${columnsStudent}
        FROM
          Course
          LEFT OUTER JOIN ProgressCourse  ON Course.id = ProgressCourse.courseId
          LEFT OUTER JOIN Lesson ON Course.id = Lesson.courseId
          LEFT OUTER JOIN ProgressLesson  ON Lesson.id = ProgressLesson.lessonId
          LEFT OUTER JOIN State As StateLesson ON ProgressLesson.stateId = StateLesson.id
          LEFT OUTER JOIN State As StateCourse ON ProgressCourse.stateId = StateCourse.id
        WHERE
          1=1 ${whereClause}
        GROUP BY
        Course.id, Course.logo, Course.title, Course.publicationDate, Course.introductoryVideo, StateCourse.title
        LIMIT ${offset}, ${limit};
      `;
    
      const res = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    
      return res;
    }
    
  
  }

  
  
  module.exports = CourseService;