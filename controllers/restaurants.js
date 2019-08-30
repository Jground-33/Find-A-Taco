// Restaurant Controller
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const zom = require('../config/zom');
const client = zom.createClient({
    userKey: process.env.ZOMATO_API_TOKEN
});

module.exports = {
    index,
    show,
}

function show(req, res) {
    client.getRestaurant({res_id: req.params.id},
        async (err, APIresults) => {
            try {
                let user
                APIresults = JSON.parse(APIresults);
                // grabbing a user from database with favorites populated
                if (req.user) user = await User.findOne({googleId: req.user.googleId}).populate('favorites');
                let restaurant = await Restaurant.findOne({api_id: APIresults.id});
                if (err) console.error(err);
                else if (restaurant) {
                    res.render('restaurants/show', {
                        user,
                        title: APIresults.name,
                        data: APIresults,
                        restaurant,
                    });
                } else {
                    restaurant = await createRestaurant(APIresults);
                    res.render('restaurants/show', {
                        user,
                        title: APIresults.name,
                        data: APIresults,
                        restaurant,
                    });
                }
            } catch (e) {console.error(e);}
        });
}

async function createRestaurant(data) {
    let formatedObj = {
        api_id: data.id,
        name: data.name,
        address: data.location.address,
        img: data.thumb,
    }
    let restaurant = await Restaurant.create(formatedObj);
    return restaurant.save();
}

function index(req, res) {
    let lat = 30.2638274;
    let lon = -97.7525458;
    client.search({
        q: "taco",
        lat: req.params.lat || lat,
        lon: req.params.lon || lon,
        count: "20", // number of maximum result to display
        radius: "10000", //radius around (lat,lon); defined in meters(M)
    }, function (err, results) {
        if (err) console.error(err);
        else res.render('restaurants/index', {
            user: req.user,
            title: 'restaurants',
            data: JSON.parse(results)
        }); 
    });
}