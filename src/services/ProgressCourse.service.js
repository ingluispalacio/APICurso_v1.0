const { models } = require('../libs/sequelize');

class ProgressCourseService { 
  
    constructor() {}

    async find(where={}) {
      const res = await models.ProgressCourse.findAll(where);
      return res;
    }

    async findByPk(id) {
      const res = await models.ProgressCourse.findByPk(id);
      return res;
    }

    async findOne(where) {
      const res = await models.ProgressCourse.findOne(where);
      return res;
    }

    async create(data) {
      const res = await models.ProgressCourse.create(data);
      return res;
    }

    async update(id, data) {
      const model = await this.findByPk(id);
      const res = await model.update(data);
      return res;
    }

    async delete(id) {
      const model = await this.findByPk(id);
      await model.destroy();
      return { deleted: true };
    }
  
  }
  
  module.exports = ProgressCourseService;