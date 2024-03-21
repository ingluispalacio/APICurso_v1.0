const express = require('express');
const router = express.Router(); 
const userRoleController = require('../../controllers/userRole.controller');
router
    .get('/', userRoleController.get )
    .get('/:id', userRoleController.getById )
    .post('/', userRoleController.create )
    .put('/:id', userRoleController.update )
    .delete('/:id', userRoleController._delete );

module.exports = router;