const { models,sequelize, Op } = require('../libs/sequelize');

class UserService { 
  
    constructor() {}

    async find() {
      const res = await models.User.findAll();
      return res;
    }

    async findByPk(id) {
      const res = await models.User.findByPk(id);
      return res;
    }

    async findOne(where) {
      const res = await models.User.findOne(where);
      return res;
    }

    async create(data, options = {}) {
      const t = options.transaction || null;
      const res = await models.User.create(data, { transaction: t } );
      return res;
    }

    async update(id, data, options = {}) {
      const t = options.transaction || null;
      const model = await this.findByPk(id, { transaction: t } );
      const res = await model.update(data, { transaction: t } );
      return res;
    }

    async delete(id, options = {}) {
      const t = options.transaction || null;
      const model = await this.findByPk(id, { transaction: t });
      await model.destroy({ transaction: t });
      return { deleted: true };
    }

    async findByEmail(email) {
      const res = await models.User.findAll({
        include: [
        {
          model: models.IdentificationType,
          attributes:["code","description"],
          required: false
        },
        {
          model: models.UserRole,
          attributes:["id","description"],
          required: false
        }
        ],
        where: {
          [Op.or]: [
            { email }
          ]
        },
       
      });
      return res;
    }
  
  }
  
  module.exports = UserService;