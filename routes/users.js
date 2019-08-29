const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users')

/* GET users listing. */
router.get('/', isLoggedIn, userCtrl.index);
router.post('/:id', isLoggedIn, userCtrl.addFavorite);
router.delete('/:id', isLoggedIn, userCtrl.removeFavorite)


function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }


module.exports = router;
