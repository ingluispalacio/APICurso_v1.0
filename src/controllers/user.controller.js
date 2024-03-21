const UserService = require('../services/User.service');
const service = new UserService();
const { encrypt } = require('../helpers/encrypt.helper');

const create = async ( req, res ) => {
    try { 
        const { email, password } = req.body;
        const user = await service.findByEmail( email );
        console.log(user)
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
        res.json({ success: true, message: 'Actualizacion exitosa', data: response});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const _delete = async (req, res) => {
    try {
        const { id } = req.params; 
        const response = await service.delete(id);
        res.json({ success: true, message: 'Eliminacion exitosa'});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = {
    create, get, getById, update, _delete
};
