const express = require('express');
const router = express.Router(); 
const progressLessonController = require('../../controllers/progressLesson.controller');

router
    .get('/', progressLessonController.get )
    .get('/:id', progressLessonController.getById )
    .post('/', progressLessonController.create )
    .put('/:id', progressLessonController.update )
    .delete('/:id', progressLessonController._delete );

module.exports = router;