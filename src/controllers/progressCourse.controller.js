const ProgressCourseService = require('../services/ProgressCourse.service');
const service = new ProgressCourseService();

const create = async ( req, res ) => {
    try { 
        const { userId, courseId } = req.body;
        if (!userId || !courseId ) {
            return res.status(400).send({ success: false, message: "Los campos 'userId' y 'courseId' son obligatorios" });
        }
        const response = await service.create(req.body);
        res.json({ success: true, message: 'Creacion exitosa', data: response});
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

const getAvailable = async ( req, res ) => {
    try {
        const response = await service.find({where:{ ProgressCourse: 'A' }});
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
    create, get, getAvailable, getById, update, _delete
};
