var Provider = require('../models/provider.js');

var export_data = null;

module.exports = function(search_param,res){
    Provider.find({ 'services.name' : search_param}).
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
