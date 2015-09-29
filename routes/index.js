var express = require('express');
var router = express.Router();

var Tweet = require('../models/index.js').Tweet;
var User = require('../models/index.js').User;


var Sequelize = require('sequelize');

module.exports = router;


// home
router.get('/', function(req, res, next) {
  Tweet.findAll({ include: [ User ] })
  .then(function(tweets) {
    res.render('index', { tweets: tweets  , showForm:true });
  });
});

// make a tweet


router.post('/', function(req, res, next) {

var userRef;
  User.find({ where: { name: req.body.name } })
  .then(function(user) {
    if(user){return user; }
    else{return User.create({name: req.body.name});}
  }).then(function(user){
    userRef = user;

    return Tweet.create({tweet: req.body.tweet});
  })
  .then(function(tweet) {
    userRef.addTweet(tweet);
    res.redirect('/');
  });

});



// getting all tweets from user
router.get('/users/:name', function(req, res, next) {
  Tweet.findAll(
     {
       include: [
         { model: User,
           where: {name: req.params.name}
         }]

  }).then(function(tweets) {
   res.render('index', { tweets: tweets });
 });
  // res.json(tweets)
});

// get a single tweet
router.get('/users/:name/tweets/:id', function(req, res, next) {
  var id = Number(req.params.id);
  var userRef;
  User.find({ where: { name: req.params.name } })
  .then(function(user){
    userRef = user.name;
    return Tweet.findById(id);
  })
  .then(function(tweets) {
    console.log("THIS IS THE USER: ");
    console.dir(userRef);
    console.log("THIS IS THE TWEET: ");
    //console.dir(tweet.tweet);
    res.render('index',{ tweets: tweets, user: userRef});

  });

});
