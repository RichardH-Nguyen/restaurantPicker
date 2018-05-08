var express = require('express');
var router = express.Router();

var googlePlaces = require('../services/googlePlaces');

function toggleActive(id){
    var element = document.getElementById(id);
    element.classList.toggle("active");
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Search'});

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
                if(googledata.results[i].types.includes('restaurant')) {
                    restaurants.push(googledata.results[i]);
                }
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
