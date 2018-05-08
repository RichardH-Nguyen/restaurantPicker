var express = require('express');
var router = express.Router();

var googlePlaces = require('../services/googlePlaces');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Search'});

});

/* POST to search page. */
router.post('/search', function(req, res, next) {
    //Uses Google places API to search restaurants based on what the user inputs in the textbox.

    var query = req.body.search;

    googlePlaces(function(err, googledata){
        //retrieves the JSON data and pushes is to an array.
        if(err){
            res.render('Error', {message: err.message, title: 'error'})
        }
        else{
            var restaurants = [];
            for(var i = 0 ; i < googledata.results.length ; i++){

                    restaurants.push(googledata.results[i]);

            }

            res.render('index', {title: 'Search', restaurants: restaurants
            });
        }
}, query);
});

router.get('/about', function (req, res, next) {
   res.render('about', {title: 'About'})
});

module.exports = router;
