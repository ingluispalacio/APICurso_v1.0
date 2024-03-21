const express = require('express');
const router = express.Router(); 
const progressCourseController = require('../../controllers/progressCourse.controller');

router
    .get('/', progressCourseController.get )
    .get('/:id', progressCourseController.getById )
    .post('/', progressCourseController.create )
    .put('/:id', progressCourseController.update )
    .delete('/:id', progressCourseController._delete );

module.exports = router;