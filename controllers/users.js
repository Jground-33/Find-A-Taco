const User = require('../models/user');
const Restaurant = require('../models/restaurant');


module.exports = {
    index,
    addFavorite,
}

function index(req, res) {
    console.log(req.user)
    res.render('users/index', {
        title: 'welcome user',
        user: req.user
    });
}

async function addFavorite(req, res) {
    let restaurant = await Restaurant.findOne({
        api_id: req.params.id
    })
    let user = await User.findOne({
        googleId: req.user.googleId
    })
    user.favorites.push(restaurant.id)
    user.save(err => {
        if(err) console.log(err);
        else console.log(`added ${req.params.id} to favorites`)
        
        res.redirect(`/restaurants/${req.params.id}/show`)
    })
};

