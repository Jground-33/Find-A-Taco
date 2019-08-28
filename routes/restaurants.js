// restaurants router
const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../controllers/restaurants');


router.get('/:id/show', restaurantsCtrl.show);
router.get('/:lat/:lon', restaurantsCtrl.index);
router.post('/:id/reviews', isLoggedIn, restaurantsCtrl.addReview);
router.delete('/:restId/:reviewIdx', isLoggedIn, restaurantsCtrl.deleteReview);


function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }


module.exports = router;