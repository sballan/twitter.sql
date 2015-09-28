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
  res.status(201).json(tweetbank.add(req.body.name, req.body.tweet))
  res.redirect('/');
});

// getting all tweets from user
router.get('/users/:name', function(req, res, next) {

 Tweet.findOne({ where: {name: req.params.name} }).then(function(tweets){
   res.render('index', { tweets: tweets });
 });
  // res.json(tweets)
});

// get a single tweet
router.get('/users/:name/tweets/:id', function(req, res, next) {
  req.params.id = Number(req.params.id);
  var tweets = tweetbank.find(req.params);
  res.render('index',{ tweets: tweets});
});
