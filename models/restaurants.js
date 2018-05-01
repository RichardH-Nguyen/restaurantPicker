var mongoose = require('mongoose');

var restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    googleRating: Number,
    userRating: Number
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;