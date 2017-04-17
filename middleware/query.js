var Provider = require('../models/provider.js');

var export_data = null;

module.exports = function(search_param, res) {
    var re = new RegExp(search_param, 'i');
    Provider.find().or([{ 'services.name': { $regex: re } }, { 'organization': { $regex: re } }, { 'username': { $regex: re } }, { 'first_name': { $regex: re } }, { 'last_name': { $regex: re } }]).
    where('radius').lt(20).
    where('services.rate').gt(10).lt(210).
    where('comments.rating').in([4.0, 4.5]).
    limit(10).
    sort('-radius').
    select('first_name last_name services.name services.rate _id').
    exec(function(err, data) {
        if (err)
            console.log(err);
        else {
            // console.log('Found documents for services1: \n', data.split(','));
            // console.log(JSON.stringify(data,null,2));
            var temp = [];
            var conSize = 3;
            for (var i = 0; i < data.length; i += conSize) {
                temp.push(data.slice(i, i + conSize));
            }
            res.render('results', { layout: 'layout', json: temp });
        }
    });
};