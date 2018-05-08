var express = require('express');
var router = express.Router();


var restaurants = require('../models/restaurants');

/* GET saved page. */
router.get('/', function(req, res, next) {
    //Displayed all the documents in the database for saved restaurants.

    restaurants.find()
        .then((docs) => {res.render('saved', {
            title: 'Saved Restaurants',
            restaurants:docs})
    })
});

/* POST saved/add page */
router.post('/add', function(req, res, next) {
    //creates and adds a new restaurant document to the database

    var r = new restaurants({name: req.body.name, address: req.body.address, priceLevel: req.body.priceLevel ,googleRating: req.body.googleRating, userRating: 0});

        r.save().then((newRestaurant) => {
            console.log('created new restaurant.', newRestaurant);
            req.flash('info', 'Added restaurant');
            res.redirect('/')})
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

/* GET saved/:_id page */
router.get('/:_id', function(req, res, next){
    //finds restaurant by id
    //displays info for a single restaurant on a page.

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

/* POST saved/update page */
router.post('/update', function (req, res, next) {
    //Updates restaurant doc at this moment with the user rating.

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

/* POST saved/random page */
router.post('/random', function (req, res, next) {
    //displays a random restaurant page.
   restaurants.find()
       .then((docs) => {
           var i = Math.floor(Math.random() * docs.length);
           var id = docs[i]._id;
           res.redirect(`/saved/${id}`)

       });

});

/* POST saved/delete page */
router.post('/delete', function (req, res, next) {
    //deletes restaurant.

   restaurants.findByIdAndRemove(req.body._id)
       .then((deletedDoc) => {
           req.flash('info', `${req.body.name} has been deleted.`);
           res.redirect('/saved')
       })
});

module.exports = router;