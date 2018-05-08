var express = require('express');
var router = express.Router();


var restaurants = require('../models/restaurants');

router.get('/', function(req, res, next) {
    restaurants.find()
        .then((docs) => {res.render('saved', {
            title: 'Saved Restaurants',
            restaurants:docs})
    })
});

router.post('/add', function(req, res, next) {
    var r = new restaurants({name: req.body.name, address: req.body.address, googleRating: req.body.googleRating, userRating: 0});

        r.save().then((newRestaurant) => {
            console.log('created new restaurant.', newRestaurant);
            req.flash('info', 'Added restaurant');
            res.render('index')})
        .catch((err) => {if(err.name === 'ValidationError'){
            console.log(err.message);
            req.flash('error', r.name + ' has already been added to saved restaurants.');
            res.redirect('/')
        }
        else {
            console.log(err.name);
            next(err);
        }
        });

});

router.get('/:_id', function(req, res, next){
    restaurants.findById(req.params._id)
        .then((doc) => {
        if(!doc){
            res.status(404).send('Restaurant not found')
        }
        else {
                res.render('restaurant', {title: 'Restaurant Info', restaurant: doc})
            }
        })
});

router.post('/update', function (req, res, next) {
   restaurants.update({_id: req.body._id}, {userRating: req.body.userRating}, {runValidators: true})
       .then((updatedDoc) => {
           if(updatedDoc){
               req.flash('info', `${req.body.name} has been updated`);
               res.redirect(`/saved/${req.body._id}`);
           }
        })
       .catch((err) => {if(err.name === 'ValidationError') {
           console.log(err.message);
           req.flash('error', err.message);
           res.redirect(`/saved/${req.body._id}`)
       }
       else {
           console.log(err.name);
           next(err);
       }
       });

});

router.post('/random', function (req, res, next) {
   restaurants.find()
       .then((docs) => {
           var i = Math.floor(Math.random() * docs.length);
           var id = docs[i]._id;
           res.redirect(`/saved/${id}`)

       });

});

module.exports = router;