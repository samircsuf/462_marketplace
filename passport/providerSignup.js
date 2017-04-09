var LocalStrategy = require('passport-local').Strategy;
var Provider = require('../models/provider');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

    passport.use('providerSignup', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true
        },
        function(req, username, password, done) {

            findOrCreateUser = function() {
                // find a user in Mongo with provided username
                Provider.findOne({ 'email': username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err) {
                        console.log('Error in SignUp: ' + err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with email: ' + username);
                        return done(null, false, req.flash('message', 'User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new Provider();

                        // set the user's local credentials
                        newUser.username = req.body.userName;
                        newUser.password = createHash(password);
                        newUser.email = req.body.email;
                        newUser.first_name = req.body.firstName;
                        newUser.last_name = req.body.lastName;
                        newuser.phone = req.body.phone;
                        newUser.service_name = req.body.serviceName;
                        newUser.rate = req.body.rate;

                        // save the user
                        newUser.save(function(err) {
                            if (err) {
                                console.log('Error in Saving user: ' + err);
                                throw err;
                            }
                            console.log('User Registration succesful');
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        }));

    // Generates hash using bCrypt
    var createHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}