const { models } = require('../libs/sequelize');

class StateService { 
  
    constructor() {}

    async find(where={}) {
      const res = await models.State.findAll(where);
      return res;
    }

    async findByPk(id) {
      const res = await models.State.findByPk(id);
      return res;
    }

    async findOne(where) {
      const res = await models.State.findOne(where);
      return res;
    }

    async create(data) {
      const res = await models.State.create(data);
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
  
  module.exports = StateService;