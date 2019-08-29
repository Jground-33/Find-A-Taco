// Restaurant Controller
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const zom = require('../config/zom');
const client = zom.createClient({
    userKey: process.env.ZOMATO_API_TOKEN
})

module.exports = {
    index,
    show,
}

// function index(req, res) {
//     res.render('restaurants/index', {
//         user: req.user,
//         title: 'restaurants',
//         testData
//     });
// }

// function show(req, res) {
//     res.render('restaurants/show', {
//         user: req.user,
//         title: testShowData.name,
//         data: testShowData,
//     })
// }

function show(req, res) {
    client.getRestaurant({
        res_id: req.params.id,
    }, async (err, APIresults) => {
        let user
        APIresults = JSON.parse(APIresults)
        if (req.user) {
        user = await User.findOne({googleId: req.user.googleId}).populate('favorites');
        }
        let restExists = await Restaurant.exists({api_id: APIresults.id})
        let restaurant = await Restaurant.findOne({api_id: APIresults.id})
        if (err) console.log(err)
        else if (restExists) {
            res.render('restaurants/show', {
                user,
                title: APIresults.name,
                data: APIresults,
                restaurant,
            });
        } else {
            let formatedObj = {
                api_id: APIresults.id,
                name: APIresults.name,
                address: APIresults.location.address,
                img: APIresults.thumb,
            }
            Restaurant.create(formatedObj, (err, restaurant) => {
                if (err) console.log(err)
                else {
                    restaurant.save(err => {
                        if (err) console.log(err)
                        else {
                            res.render('restaurants/show', {
                                user,
                                title: APIresults.name,
                                data: APIresults,
                                restaurant,
                            });
                        }
                    });
                }
            });
        }
    });
}



function index (req, res) {
    let lat = 30.2638274;
    let lon = -97.7525458;
    client.search({
        q: "taco", 
        lat: req.params.lat || lat,
        lon: req.params.lon || lon,
        count: "20", // number of maximum result to display
        radius: "10000", //radius around (lat,lon); defined in meters(M)
    }, function (err, results) {
        if (err) console.log(err);
        else res.render('restaurants/index', {
            user: req.user,
            title: 'restaurants',
            testData: JSON.parse(results)})
    });
}

