var express = require('express');
var router = express.Router();


var restaurants = require('../models/restaurants');

router.get('/', function(req, res, next) {
    res.render('/');
});

router.post('/add', function(req, res, next){
    var r = new restaurants({name: req.body.name, address: req.body.address, googleRating: req.body.googleRating});

    r.save().then((newRestaurant) =>{console.log('created new restaurant.', newRestaurant)});

    res.render('index');
});

module.exports = router;