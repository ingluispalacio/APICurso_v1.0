
const express = require('express'); 

const progressCourseRoute = require('./routes/progressCourse.routes');
const progresssLessonRoute = require('./routes/progresssLesson.routes');
const userRoleRoute = require('./routes/userRole.routes');
const courseRoute = require('./routes/course.routes');
const stateRoute = require('./routes/state.routes');
const lessonRoute = require('./routes/lesson.routes');
const identificationTypeRoute = require('./routes/identificationType.routes');
const userRoute = require('./routes/user.routes');
const authRoute = require('./routes/auth.routes');
const { verifyPermission, verifyToken } = require('../middlewares/auth.middleware');
const { routeNotFound } = require('../middlewares/route.middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

const routerApi= (app)=>{
  const router = express.Router();
  app.use('/api/v1', router);


  router.use('/progressCourse',  verifyToken, progressCourseRoute);
  router.use('/progresssLesson', verifyToken, progresssLessonRoute);
  router.use('/userRole',  verifyToken, verifyPermission(['ADMINISTRADOR']), userRoleRoute);
  router.use('/state',  verifyToken, verifyPermission(['ADMINISTRADOR']),stateRoute);
  router.use('/course', verifyToken, courseRoute);
  router.use('/lesson', verifyToken, lessonRoute);
  router.use('/identificationType', verifyToken, verifyPermission(['ADMINISTRADOR']), identificationTypeRoute);
  router.use('/user', verifyToken, verifyPermission(['ADMINISTRADOR']), userRoute);
  router.use('/auth', authRoute);
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(routeNotFound);
}

module.exports = routerApi;