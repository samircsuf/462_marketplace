var express = require('express');
var router = express.Router();
var query = require('../middleware/query');
var profile_query = require('../middleware/profile_query');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var dbConfig = require('../db');
var Provider = require('../models/provider')

var isAuthenticated = function(req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}
module.exports = function(passport) {

    /* GET login page. */
    router.get('/', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('index', { message: req.flash('message') });
    });

    router.get('/search', function(req, res) {
        res.render('search', { message: req.flash('message') });
    });

    router.post('/search', function(req, res) {
        query(req.body.search, res);

    });

    router.get('/profile_page/:id', function(req, res) {
        profile_query(req.params.id, res);
    });

    router.post('/provider/:id', function(req, res) {
        var data = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            organization: req.body.org,
            "contact.phone": req.body.tel,
            "contact.email": req.body.email,
            "contact.state": req.body.state,
            "contact.zip": req.body.zip,
            radius: req.body.radius
        };
        var userID = req.params.id;
        Provider.updateOne({ "_id": objectId(userID) }, { $set: data }, function(err, results) {
            console.log("Updated Item.");
        });
        profile_query(req.params.id, res);
    });

    router.get('/provider/:id', function(req, res) {
        res.render('provider', { data: req.params.id });
    });

    router.get('/login', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('login', { message: req.flash('message') });
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));

    /* GET Registration Page */
    router.get('/signup', function(req, res) {
        res.render('register', { message: req.flash('message') });
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    /* GET Home Page */
    router.get('/home', isAuthenticated, function(req, res) {
        res.render('profile', { user: req.user });
    });

    /* Handle Logout */
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
}