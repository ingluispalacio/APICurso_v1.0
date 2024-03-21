const express = require('express');
const router = express.Router(); 
const courseController = require('../../controllers/course.controller');
const { verifyPermission } = require('../../middlewares/auth.middleware');

router
    .get('/', courseController.get )
    .get('/:id', courseController.getById )
    .post('/', verifyPermission(['ADMINISTRADOR']), courseController.create )
    .put('/:id', verifyPermission(['ADMINISTRADOR']), courseController.update )
    .delete('/:id', verifyPermission(['ADMINISTRADOR']), courseController._delete );

module.exports = router;