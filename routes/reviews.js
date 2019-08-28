const express = require('express');
const router = express.Router();
const reviewsCtrl =require('../controllers/reviews');

// /16912807/update/spider%20woman/?_method=POST
router.get('/:restId/edit/:idx', isLoggedIn, reviewsCtrl.edit)
router.post('/:id', isLoggedIn, reviewsCtrl.addReview);
router.post('/:restId/update/:idx', isLoggedIn, reviewsCtrl.updateReview);
router.delete('/:restId/:reviewIdx', isLoggedIn, reviewsCtrl.deleteReview);


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }


module.exports = router;