const express = require('express');
const router = express.Router(); 
const lessonController = require('../../controllers/lesson.controller');

router
    .get('/', lessonController.get )
    .get('/:id', lessonController.getById )
    .post('/', lessonController.create )
    .put('/:id', lessonController.update )
    .delete('/:id', lessonController._delete );

module.exports = router;