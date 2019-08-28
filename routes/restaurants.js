// restaurants router
const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../controllers/restaurants');


router.get('/:id/show', restaurantsCtrl.show);
router.get('/:lat/:lon', restaurantsCtrl.index);



module.exports = router;