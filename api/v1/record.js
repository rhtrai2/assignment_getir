const express = require('express');
const router = express.Router();
const recordCtrl = require('../../controllers/recordController');
const { body } = require('express-validator');

router.post('/getAll', 
    body('startDate').isDate(),
    body('endDate').isDate(),
    body('maxCount').isInt(),
    body('minCount').isInt(),
    recordCtrl.get);


module.exports = router;