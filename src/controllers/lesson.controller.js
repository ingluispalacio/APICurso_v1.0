const LessonService = require('../services/Lesson.service');
const service = new LessonService();
const ProgressLessonService = require('../services/ProgressLesson.service');
const serviceProgressLesson = new ProgressLessonService();

const create = async ( req, res ) => {
    try { 
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
    
    const { id } = req.params; 
        
    const progress = await serviceProgressLesson.findOne({ where: { lessonId: id } });
    if (progress) {
        res.status(405).send({ success: false, message: 'No se puede eliminar la lección porque tiene progreso asociado.' });
    }
    if (!progress) {
        try {
            const response = await service.delete(id);
            res.json({ success: true, message: 'Eliminacion exitosa'});
        } catch (error) {
            res.status(500).send({ success: false, message: error.message });
        }
    }
}

module.exports = {
    create, get, getById, update, _delete
};
