
var Provider = require('../models/provider.js');


module.exports = function(search_param){
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
    else
        console.log('Found documents for services1: \n', JSON.stringify(data));
    });

};



