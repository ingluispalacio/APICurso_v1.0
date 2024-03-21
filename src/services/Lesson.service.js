const { models } = require('../libs/sequelize');

class LessonService { 
  
    constructor() {}

    async find(where={}) {
      const res = await models.Lesson.findAll(where);
      return res;
    }

    async findByPk(id) {
      const res = await models.Lesson.findByPk(id);
      return res;
    }

    async findOne(where) {
      const res = await models.Lesson.findOne(where);
      return res;
    }

    async create(data, options = {}) {
      const t = options.transaction || null;
      const res = await models.Lesson.create(data, { transaction: t } );
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
  
  module.exports = LessonService;