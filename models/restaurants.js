var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var restaurantSchema = new mongoose.Schema({
    name: String,
    address: {type: String, unique: true, uniqueCaseInsensitive: true},
    googleRating: Number,
    userRating: {type: Number,
        min: [0, 'Lowest rating is 0.'],
        max: [5, 'Rate out of 5']
    }
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);
restaurantSchema.plugin(uniqueValidator);

module.exports = Restaurant;
