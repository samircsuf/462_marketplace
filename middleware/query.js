var Provider = require('../models/provider.js');

var export_data = null;

module.exports = function(search_param,res){
  var re = new RegExp(search_param, 'i');
    Provider.find().or([{ 'services.name' : {$regex: re}}, { 'organization' : {$regex: re}}, { 'username' : {$regex: re}}, { 'first_name' : {$regex: re}}, { 'last_name': {$regex: re}}]).
    select('first_name last_name services.name services.rate _id').
    exec(function (err, data) {
    if(err)
        console.log(err);
    else{
        console.log(data);
        // console.log('Found documents for services1: \n', data.split(','));
        // console.log(JSON.stringify(data,null,2));
        var temp = [];
        var conSize = 3;
        for(var i = 0; i < data.length; i += conSize){
          temp.push(data.slice(i, i + conSize));
        }
         res.render('results',{ layout : 'layout', json: temp });
       }
    });
};
