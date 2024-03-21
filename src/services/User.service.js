const { models,sequelize, Op } = require('../libs/sequelize');

class UserService { 
  
    constructor() {}

    async find() {
      const res = await models.User.findAll({
        attributes: [
          'id', 
          'fullname', 
          'birthDate', 
          'email',
          [sequelize.literal('(SELECT description FROM `IdentificationType` WHERE `IdentificationType`.`id` = `User`.`identificationTypeId`)'), 'IdentificationType'],
          'identificationNumber', 
          [sequelize.literal('(SELECT description FROM `UserRole` WHERE `UserRole`.`id` = `User`.`userRoleId`)'), 'UserRole'],
          'createdAt', 
          'updatedAt'
        ], 
      });
      return res;
    }

    async findByPk(id, options = {}) {
      const t = options.transaction || null;
      const user = await models.User.findByPk(id, { transaction: t });
      return user;
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

    
    async update(id,data, options = {}) {
      const t = options.transaction || null;
      try {
        const model = await this.findByPk(id, { transaction: t });
        
        if (!model) {
          const error = new Error("Usuario no encontrado");
          error.statusCode = 400;
          throw error;
        }
        
        const res = await model.update(data, { transaction: t } );
        
        return { update: true, data: res};
      } catch (error) {
        return { update: false, error: error.message, statusCode: error.statusCode || 500 };
      }
    }

    async delete(id, options = {}) {
      const t = options.transaction || null;
      try {
        const model = await this.findByPk(id, { transaction: t });
        
        if (!model) {
          const error = new Error("Usuario no encontrado");
          error.statusCode = 400;
          throw error;
        }
        
        await model.destroy({ transaction: t });
        
        return { deleted: true };
      } catch (error) {
        return { deleted: false, error: error.message, statusCode: error.statusCode || 500 };
      }
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
        where:  {
          email: email 
        },
       
      });
      return res;
    }
  
  }
  
  module.exports = UserService;