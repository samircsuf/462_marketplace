var Provider = require('../models/provider.js');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var export_data = null;

module.exports = function(search_param, res, req){
  var re = new RegExp(search_param, 'i');
    Provider.find().or([{'_id' : search_param }, { 'services.name' : {$regex: re}}, { 'organization' : {$regex: re}}, { 'username' : {$regex: re}}, { 'first_name' : {$regex: re}}, { 'last_name': {$regex: re}}]).
    exec(function (err, data) {
    if(err)
        console.log(err);
    else{
        console.log("First Name");
        console.log(data[0].first_name);
        var tempData = {
          first_name : (req.body.firstName ? req.body.firstName : data[0].first_name),
          last_name : (req.body.lastName ? req.body.lastName : data[0].last_name) ,
          organization: (req.body.org ? req.body.org : data[0].organization),
          "contact.phone" : (req.body.tel ? req.body.tel : data[0].contact.phone),
          "contact.email" : (req.body.email ? req.body.email : data[0].contact.email),
          "contact.state" : (req.body.state ? req.body.state : data[0].contact.state),
          "contact.zip" : (req.body.zip ? req.body.zip : data[0].contact.zip),
          radius : (req.body.radius ? req.body.radius : data[0].radius)
        };
        var userID = search_param;
        Provider.updateOne({"_id": objectId(userID)}, {$set: tempData}, function(err, results){
        console.log("Updated Item.");
        });
        Provider.find().or([{'_id' : search_param }, { 'services.name' : {$regex: re}}, { 'organization' : {$regex: re}}, { 'username' : {$regex: re}}, { 'first_name' : {$regex: re}}, { 'last_name': {$regex: re}}]).
        exec(function (err, data) {
        if(err)
            console.log(err);
        else{
            // console.log('Found documents for services1: \n', data.split(','));
            // console.log(JSON.stringify(data,null,2));
            console.log(data);
            res.render('profile',{ layout : 'layout', json: data });
            }
          });
      };
    });
  }
