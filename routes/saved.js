var express = require('express');
var router = express.Router();


var restaurants = require('../models/restaurants');

router.get('/', function(req, res, next) {
    restaurants.find()
        .then((docs) => {res.render('saved', {
            title: 'saved restaurants',
            restaurants:docs})
    })
});

router.post('/add', function(req, res, next){
    var r = new restaurants({name: req.body.name, address: req.body.address, googleRating: req.body.googleRating});

    r.save().then((newRestaurant) =>{console.log('created new restaurant.', newRestaurant)});

    res.render('index');
});

router.get('/:_id', function(req, res, next){
    restaurants.findById(req.params._id)
        .then((doc) => {
        if(!doc){
            res.status(404).send('Task not found')
        }
        else {
            res.render('restaurant', {restaurant: doc})
        }
        })
});

module.exports = router;