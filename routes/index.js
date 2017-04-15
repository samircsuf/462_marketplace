var express = require('express');
var router = express.Router();
var query = require('../middleware/query');
var mongo = require('mongodb');
var assert = require('assert');
var dbConfig = require('../db');
var update_provider = require('../middleware/update_info');

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

    //Handle provider update information
    router.post('/update', function(req, res) {
        update_provider(req, res);
    });

    router.post('/search', function(req, res) {
        query(req.body.search, res);

    });
    router.get('/profile_page', function(req, res) {
        res.render('profile_page', { message: req.flash('message') });
    });

    router.get('/provider', function(req, res) {
        res.render('provider', { message: req.flash('message') });
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
        res.render('profile_page', { user: req.user });
    });

    /* Handle Logout */
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
};