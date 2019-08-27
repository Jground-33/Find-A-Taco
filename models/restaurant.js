// Restaurant Model
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    }
}, {
    timestamps: true
})

const restaurantSchema = new mongoose.Schema({
    api_id: {
        type: String,
        required: true,
    },
    name: String,
    address: String,
    img: String,
    reviews: [reviewSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Restaurant', restaurantSchema);




/*  what do i want to save in restaurant 



*/