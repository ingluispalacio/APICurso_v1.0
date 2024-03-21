const UserService = require('../services/User.service');
const service = new UserService();
const UserRoleService = require('../services/UserRole.service');
const serviceUserRole = new UserRoleService();
const IdentificationTypeSevice = require('../services/IdentificationType.service');
const serviceIdentificationType = new IdentificationTypeSevice();
const { encrypt } = require('../helpers/encrypt.helper');

const create = async ( req, res ) => {
    try { 
        const { email, password, fullname, identificationNumber, userRoleId, identificationTypeId } = req.body;

        
        if (!email || !password || !fullname || !identificationNumber || !userRoleId || !identificationTypeId) {
            return res.status(400).send({ success: false, message: "Los campos 'email', 'password', 'fullname', 'identificationNumber', 'userRoleId' e 'identificationTypeId' son obligatorios" });
        }

        
        const [userRole, identificationType] = await Promise.all([
            serviceUserRole.findByPk(userRoleId),
            serviceIdentificationType.findByPk(identificationTypeId)
        ]);

        if (!userRole || !identificationType) {
            return res.status(400).send({ success: false, message: "El 'userRoleId' o 'identificationTypeId' proporcionado no es válido" });
        }

        const user = await service.findByEmail( email );
        if ( Array.isArray(user)&&user.length>0) {
            res.status(404).send({ success: false, message: "Ya existe un usuario con el email : "+ email })
        } 
        if (user.length==0) {
            const passwordEncrypt= await encrypt(password);
            req.body.password= passwordEncrypt;
            const response = await service.create(req.body);
            res.json({ success: true, message: 'Creacion exitosa', data: response});
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const get = async ( req, res ) => {
    try {
        const response = await service.find();
        res.json({ success: true, data: response});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await service.findByPk(id);
        res.json({ success: true, data: response});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id,body);
        if (response.update) {
            res.json({ success: true, message: 'Actualizacion exitosa', data: response.data});
        } else {
            res.status(response.statusCode).json({ success: false, message: response.error });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const _delete = async (req, res) => {
    try {
      const { id } = req.params; 
      const response = await service.delete(id);
      
      if (response.deleted) {
        res.json({ success: true, message: 'Eliminación exitosa' });
      } else {
        res.status(response.statusCode).json({ success: false, message: response.error });
      }
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = {
    create, get, getById, update, _delete
};
