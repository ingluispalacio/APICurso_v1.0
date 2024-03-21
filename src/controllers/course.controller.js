const {sequelize}  = require('../libs/sequelize'); 
const CourseService = require('../services/Course.service');
const service = new CourseService();
const LessonService = require('../services/Lesson.service');
const serviceLesson = new LessonService();
const ProgressCourseService = require('../services/ProgressCourse.service');
const serviceProgressCourse = new ProgressCourseService();


const create = async (req, res) => {
    let t;

    const { logo, title, description, publicationDate, introductoryVideo, lessons } = req.body;
    const courseData = {
        logo: logo,
        title: title,
        description: description,
        publicationDate: publicationDate,
        introductoryVideo: introductoryVideo
    };

    const courseExist = await service.findOne({ where: { title: title } });
    
    if (courseExist) {
        res.status(403).send({ success: false, message: "Ye existe un Curso con el mismo titulo" });
    }

    if (!courseExist) {
        try {

            t = await sequelize.transaction();

            const course = await service.create(courseData, { transaction: t });

            await Promise.all(lessons.map(async (lesson) => {
                await serviceLesson.create({ ...lesson, courseId: course.id }, { transaction: t });
            }));

            await t.commit();

            res.json({ success: true, message: 'Creacion exitosa', data: { course, lessonData: lessons } });
        } catch (error) {
            if (t) await t.rollback();
            
            res.status(500).send({ success: false, message: error.message });
        }
    }
}



const get = async (req, res) => {
    try {
        const { page, limit, title, startDate, endDate, stateCourse } = req.query;
        const userRole = req.user ? req.user.UserRole.description : null;
        const response = await service.findParam({ page, limit, title, startDate, endDate, stateCourse, userRole });
        res.json({ success: true, data: response });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getById = async ( req, res ) => {
    try {
        const { id } = req.params;
        let response;
        const userRole = req.user.UserRole.description;
        if (userRole==="ADMINISTRADOR") {
            response = await service.findByPk(id);
        } else {
            response = await service.findByPkStudent(id);
        }

        res.json({ success: true, data: response});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}



const update = async (req, res) => {
    let t;
    try {
        t = await sequelize.transaction();

        const { id } = req.params;
        const { logo, title, description, publicationDate, introductoryVideo, lessons } = req.body;

        const courseData = {
            logo: logo,
            title: title,
            description: description,
            publicationDate: publicationDate,
            introductoryVideo: introductoryVideo
        };

        const updatedCourse = await service.update(id, courseData, { transaction: t });

        await Promise.all(lessons.map(async (lesson) => {
            if (lesson.id) {
                await serviceLesson.update(lesson.id, { ...lesson, courseId: id }, { transaction: t });
            } else {
                await serviceLesson.create({ ...lesson, courseId: id }, { transaction: t });
            }
        }));

        await t.commit();

        res.json({ success: true, message: 'Actualización exitosa', data: { ...courseData, lessonData: lessons } });
    } catch (error) {
        if (t) await t.rollback();
        res.status(500).send({ success: false, message: error.message });
    }
}

const _delete = async (req, res) => {
    const { id } = req.params; 
        
    const progress = await serviceProgressCourse.findOne({ where: { courseId: id } });
    if (progress) {
        res.status(405).send({ success: false, message: 'No se puede eliminar el curso porque tiene progreso asociado.' });
    }

    if (!progress) {
        try { 
            const response = await service.softDelete(id);
            res.json({ success: true, message: 'Eliminacion exitosa'});
        } catch (error) {
            res.status(500).send({ success: false, message: error.message });
        }
    }
}

module.exports = {
    create, get,  getById, update, _delete
};
