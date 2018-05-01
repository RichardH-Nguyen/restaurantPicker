var express = require('express');
var router = express.Router();

var googlePlaces = require('../services/googlePlaces');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/search', function(req, res, next) {
    var query = req.body.search;

    googlePlaces(function(err, googledata){
        if(err){
            res.render('Error', {message: err.message, title: 'error'})
        }
        else{
            var restaurants = [];
            for(var i = 0 ; i < googledata.results.length ; i++){
                restaurants.push(googledata.results[i]);
            }

            res.render('index', {restaurants: restaurants
            });
        }
}, query);
});

module.exports = router;
