const express = require('express');
const router = express.Router(); 
const identificationTypeController = require('../../controllers/identificationType.controller');

router
    .get('/', identificationTypeController.get )
    .get('/:id', identificationTypeController.getById )
    .post('/', identificationTypeController.create )
    .put('/:id', identificationTypeController.update )
    .delete('/:id', identificationTypeController._delete );

module.exports = router;