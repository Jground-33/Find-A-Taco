// restaurants router
const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../controllers/restaurants');


router.get('/:id', restaurantsCtrl.index);
router.get('/:id/show', restaurantsCtrl.show);


module.exports = router;