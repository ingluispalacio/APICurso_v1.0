
const { State, StateSchema } = require('./models/State.model');
const { ProgressLesson, ProgressLessonSchema } = require('./models/ProgressLesson.model');
const { ProgressCourse, ProgressCourseSchema } = require('./models/ProgressCourse.model');
const { Lesson, LessonSchema } = require('./models/Lesson.model');
const { Course, CourseSchema } = require('./models/Course.model');
const { IdentificationType, IdentificationTypeSchema } = require('./models/IdentificationType.model');
const { User, UserSchema } = require('./models/User.model');
const { UserRole, UserRoleSchema } = require('./models/UserRole.model');
const { relationshipHasMany, bidirectionalHMandBT } = require('../helpers/relationships.helpers');
const { v4: uuidv4 } = require('uuid');
const  { passwordDesafultUser } = require('../config/config');
const { encrypt } = require('../helpers/encrypt.helper');


const setupModels= async  (sequelize) =>{
    //Init
    IdentificationType.init(IdentificationTypeSchema, IdentificationType.config(sequelize));
    UserRole.init(UserRoleSchema, UserRole.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    Course.init(CourseSchema, Course.config(sequelize));
    Lesson.init(LessonSchema, Lesson.config(sequelize));
    State.init(StateSchema, State.config(sequelize));
    ProgressCourse.init(ProgressCourseSchema, ProgressCourse.config(sequelize));
    ProgressLesson.init(ProgressLessonSchema, ProgressLesson.config(sequelize));
   
    // Sync models (create tables)
    await sequelize.sync();

    //Asociation
    bidirectionalHMandBT(UserRole, User, 'userRoleId');
    bidirectionalHMandBT(IdentificationType, User, 'identificationTypeId');
    bidirectionalHMandBT(User, ProgressCourse, 'userId');
    bidirectionalHMandBT(Course, ProgressCourse, 'courseId'); 
    bidirectionalHMandBT(State, ProgressCourse, 'stateId'); 
    bidirectionalHMandBT(User, ProgressLesson, 'userId');
    bidirectionalHMandBT(Lesson, ProgressLesson, 'lessonId');
    bidirectionalHMandBT(State, ProgressLesson, 'stateId');
    bidirectionalHMandBT(Course, Lesson, 'courseId');

    //default data
    try {
        const user = await User.findAll();
        if (user.length === 0) {
            await addDefaultData();
        }
    } catch (error) {
        console.error('Error al inicializar datos predeterminados:', error);
    }
   
}

const  addDefaultData= async()=>{
    try {
        const adminUserRoleUUID = uuidv4();
        const passwordEncryptUser = await encrypt(passwordDesafultUser.password);

        // DefaultData IdentificationType
        await IdentificationType.bulkCreate([
            { code: 'CC', description: 'Cédula de ciudadania' },
            { code: 'CE', description: 'Cédula de extranjeria' },
            { code: 'TI', description: 'Tarjeta de identidad' },
            { code: 'RC', description: 'Registro civil' }
        ]);

        // DefaultData State
        await State.bulkCreate([
            { title: 'PENDIENTE' },
            { title: 'PROGRESO' },
            { title: 'FINALIZADO' },
            { title: 'APROBADO' }
        ]);

        // DefaultData UserRole
        await UserRole.bulkCreate([
            {  id: adminUserRoleUUID, description: 'ADMINISTRADOR' },
            { description: 'ESTUDIANTE' }
        ]);

        const identificationTypeCC = await IdentificationType.findOne({ where: { code: 'CC' } });

        // DefaultData User
        await User.bulkCreate([
            {
                fullname: "Felipe Perez",
                birthDate: new Date(),
                email: "felipep@mail.com",
                password: passwordEncryptUser,
                identificationTypeId:identificationTypeCC.id,
                identificationNumber: "1116123467",
                userRoleId: adminUserRoleUUID
            }
        ]);
        console.log('Datos predeterminados añadidos correctamente.');
    } catch (error) {
        console.error('Error al añadir datos predeterminados:', error);
    }
}



module.exports = setupModels;