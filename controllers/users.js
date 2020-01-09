//User Controller
const User = require('../models/user');
const Restaurant = require('../models/restaurant');

module.exports = {
    index,
    addFavorite,
    removeFavorite,
}

async function index(req, res) {
    try {
        let user = await User.findOne({googleId: req.user.googleId}).populate('favorites');
        res.render('users/index', {
            title: 'welcome user',
            user,
            restaurants: user.favorites,
        });
    } catch (e) {
        console.error(e);
    }
}

async function addFavorite(req, res) {
    try {
        let restaurant = await Restaurant.findOne({api_id: req.params.id});
        let user = await User.findOne({googleId: req.user.googleId});
        user.favorites.push(restaurant.id);
        user = await user.save();
        res.redirect(`/restaurants/${req.params.id}/show`);
    } catch (e) {
        console.error(e)
    }
}

async function removeFavorite(req, res) {
    try {
        let user = await User.findOne({googleId: req.user.googleId}).populate('favorites');
        let filteredFavs = user.favorites.filter(obj => {
            return obj.api_id !== req.params.id;
        });
        user.favorites = filteredFavs;
        user = await user.save();
        // res.redirect(`/restaurants/${req.params.id}/show`);
        res.redirect('/users')
    } catch (e) {
        console.error(e)
    }
}