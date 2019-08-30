const Restaurant = require('../models/restaurant');

module.exports = {
    addReview,
    deleteReview,
    updateReview,
    edit,
}

async function addReview(req, res) {
    try {
    let restaurant = await Restaurant.findOne({api_id: req.params.id});
    req.body.googleId = req.user.googleId;
    restaurant.reviews.push(req.body);
    await restaurant.save();
    res.redirect(`/restaurants/${req.params.id}/show`);
    } catch(e) {console.error(e);}
}

async function deleteReview(req, res) {
    try {
    let restaurant = await Restaurant.findOne({api_id: req.params.restId});
    // verifying users authority to delete review
    if (req.user.googleId === restaurant.reviews[req.params.reviewIdx].googleId) {
        restaurant.reviews.splice(req.params.reviewIdx, 1);
        await restaurant.save();
        res.redirect(`/restaurants/${req.params.restId}/show`)
    } else { 
        res.redirect(`/restaurants/${req.params.restId}/show`)
    }
} catch(e) {console.error(e)}
}

async function updateReview(req, res) {
    try {
    let restaurant = await Restaurant.findOne({api_id: req.params.restId});
    // verifying users authority to delete review
    if (req.user.googleId === restaurant.reviews[req.params.idx].googleId) {
        restaurant.reviews[req.params.idx].content = req.body.content;
        restaurant.reviews[req.params.idx].rating = req.body.rating;
        await restaurant.save();
        res.redirect(`/restaurants/${req.params.restId}/show`);
    } else { 
        res.redirect(`/restaurants/${req.params.restId}/show`)
    }
} catch(e) {console.error(e);}
}

async function edit(req, res) {
    try {
    let restaurant = await Restaurant.findOne({api_id: req.params.restId});
    res.render('restaurants/edit', {
            user: req.user,
            title: 'Edit Review',
            restaurant,
            reviewIdx: req.params.idx,
    });
    } catch(e) {console.error(e);}
}