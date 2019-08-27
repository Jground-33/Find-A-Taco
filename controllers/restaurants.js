// Restaurant Controller
let testData = require('../testData');
const testShowData = require('../testShowData');

const Restaurant = require('../models/restaurant');
const zom = require('../config/zom');
const client = zom.createClient({
    userKey: process.env.ZOMATO_API_TOKEN
})

module.exports = {
    index,
    show,
}

function index(req, res) {
    res.render('restaurants/index', {
        user: req.user,
        title: 'restaurants',
        testData
    });
}

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
    }, async (err, results) => {
        results = JSON.parse(results)
        let restExists = await Restaurant.exists({
            api_id: results.id
        })
        if (err) console.log(err)
        else if (restExists) {
            res.render('restaurants/show', {
                user: req.user,
                title: results.name,
                data: results,
            });
        } else {
            let formatedObj = {
                api_id: results.id,
                name: results.name,
                address: results.location.address,
                img: results.thumb,
            }
            Restaurant.create(formatedObj, (err, restaurant) => {
                if (err) console.log(err)
                else {
                    restaurant.save(err => {
                        if (err) console.log(err)
                        else {
                            res.render('restaurants/show', {
                                user: req.user,
                                title: results.name,
                                data: results,
                            });
                        }
                    });
                }
            });
        }
    });
}





/// commented out API call to not stack up calls during CSS design
// function index (req, res) {
// //    let lat = req.params.id.slice(0,10)
// //    let lon = req.params.id.slice(19)
//    let lat = "30.2686023"
//    let lon = "-97.7451943"
//     client.search({
//         q: "taco", //Search Keyword
//         lat, //latitude
//         lon, //longitude
//         count: "2", // number of maximum result to display
//         radius: "500", //radius around (lat,lon); to define search area, defined in meters(M)
//     }, function (err, results) {
//         if (err) console.log(err);
//         else res.render('restaurants/index', {
//             title: 'restaurants',
//             testData: JSON.parse(results)})
//     });
// }