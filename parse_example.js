var dbConfig = require('./db');
var mongoose = require('mongoose');

// Connect to DB
db = mongoose.connect(dbConfig.url);
var Provider = require('./models/provider.js');

 Provider.find({ 'services.name' : 'Math Tutor'}).
    where('radius').lt(20).
    where('services.rate').gt(10).lt(20).
    where('comments.rating').in([4.0, 4.5]).
    limit(10).
    sort('-radius').
    select('first_name last_name services.name services.rate').
    exec(function (err, data) {
    if(err)
        console.log(err);
    else{
        console.log("RAW: " + data);

        data.forEach(function(obj){
            console.log(obj.services);
            
        })
    ;
       }
    });
