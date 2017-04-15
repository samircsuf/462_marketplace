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
      console.log(data[1]['services']);
      var nTemp = JSON.stringify(data[1]['services']);
//      for (var i in data)
//        for(var k in i){
//          console.log(data[i][k]);
//        }
      var temp = JSON.parse(nTemp);
      console.log(temp[1]['rate']);
//        var temp = data[0]['services'];
//        console.log(temp);
//        var result = JSON.parse(temp);

//      Object.keys(data[0]['services']).forEach(function(key) {
//                  console.log(key,data[0]['_doc'][key]);
//      });
        //const temp = data[0]['services'];
//        for(nTemp in data){
            //console.log(typeof(data[nTemp]['services']));
//            console.log(Object.keys(data[nTemp]));
            //console.log(data[nTemp]['services']['toJSON']);
//            Object.keys(data[nTemp]).forEach(function(key) {
//              console.log(key,data[nTemp][key]);
//            });
//          }
       }
    });
