//User Controller
const User = require('../models/user');
const Restaurant = require('../models/restaurant');

module.exports = {
    index,
    addFavorite,
    removeFavorite,
}

async function index(req, res) {
    let user = await User.findOne({googleId: req.user.googleId}).populate('favorites');
    res.render('users/index', {
        title: 'welcome user',
        user,
        restaurants: user.favorites,
    });
}

async function addFavorite(req, res) {
    let restaurant = await Restaurant.findOne({api_id: req.params.id});
    let user = await User.findOne({googleId: req.user.googleId});
    user.favorites.push(restaurant.id);
    user.save(err => {
        if(err) console.log(err);
        res.redirect(`/restaurants/${req.params.id}/show`);
    });
}

async function removeFavorite(req, res) {
    let user = await User.findOne({googleId: req.user.googleId}).populate('favorites');
    let filteredFavs = user.favorites.filter(obj => {
        return obj.api_id !== req.params.id;
     });
     user.favorites = filteredFavs;
     user.save( err => {
         if(err) console.log(err);
         res.redirect(`/restaurants/${req.params.id}/show`);
     });
}

