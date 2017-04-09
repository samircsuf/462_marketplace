var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    id: String,
    email: String,
    password: String,
    username: String
});

module.exports = mongoose.model('User', userSchema);