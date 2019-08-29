const Restaurant = require('../models/restaurant');

module.exports = {
    addReview,
    deleteReview,
    updateReview,
    edit,
}

async function addReview(req, res) {
    let restaurant = await Restaurant.findOne({api_id: req.params.id})
    req.body.googleId = req.user.googleId;
    restaurant.reviews.push(req.body)
    restaurant.save(err => {
        if(err) console.log(err)
        res.redirect(`/restaurants/${req.params.id}/show`)
    })
}

async function deleteReview(req, res) {
    let restaurant = await Restaurant.findOne({api_id: req.params.restId})
    if (req.user.googleId === restaurant.reviews[req.params.reviewIdx].googleId) {
        restaurant.reviews.splice(req.params.reviewIdx, 1);
        restaurant.save( err => {
            if (err) console.log(err);
            res.redirect(`/restaurants/${req.params.restId}/show`)
        });
    } else { 
        res.redirect(`/restaurants/${req.params.restId}/show`)
    }
}

async function updateReview(req, res) {
    let restaurant = await Restaurant.findOne({api_id: req.params.restId});
    if (req.user.googleId === restaurant.reviews[req.params.idx].googleId) {
        restaurant.reviews[req.params.idx].content = req.body.content;
        restaurant.reviews[req.params.idx].rating = req.body.rating;
        restaurant.save(err => {
            if(err) console.log(err);
            res.redirect(`/restaurants/${req.params.restId}/show`);
        });
    } else { 
        res.redirect(`/restaurants/${req.params.restId}/show`)
    }
}

async function edit(req, res) {
    let restaurant = await Restaurant.findOne({api_id: req.params.restId})
    res.render('restaurants/edit', {
            user: req.user,
            title: 'Edit Review',
            restaurant,
            reviewIdx: req.params.idx,
    });
}