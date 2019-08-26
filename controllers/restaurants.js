// Restaurant Controller
let testData = require('../testData');

const Restaurant = require('../models/restaurant');
const zomato = require('zomato');
const client = zomato.createClient({
    userKey: process.env.ZOMATO_API_TOKEN
})

module.exports = {
    index,
}


function index (req, res) {
    res.render('restaurants/index', {
        title: 'restaurants', 
        testData});
}


/// commented out API call to not stack up calls during CSS design
// function index (req, res) {
//    let lat = req.params.id.slice(0,10)
//    let lon = req.params.id.slice(19)
//     client.search({
//         q: "taco", //Search Keyword
//         lat, //latitude
//         lon, //longitude
//         count: "2", // number of maximum result to display
//         radius: "500", //radius around (lat,lon); to define search area, defined in meters(M)
//     }, function (err, results) {
//         if (err) console.log(err);
//         else res.render('restaurants/index', {testData: JSON.parse(results)})
//     });
// }