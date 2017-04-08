var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/passport';

mongoose.connect(dbURI);
// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});


var Schema = mongoose.Schema;

var providerSchema = new Schema({
	_id: {type: String, required: true}, //getNextSequence("sid"), //ObjectID('AA1111')	
	first_name: {type: String, required: true, uppercase: true},
	last_name: {type: String, required: true, uppercase: true},
	username: {type: String, min: 6, max: 35, required: true, lowercase: true, index: { unique: true }},
	password: {type: String, min: 8, max: 16, select: true},//makes password accessible by default so that we can fetch it from db.Normally, it should be false
	organization: {type: String, required:false},
	contractorID:{type: String, required:true},
	contact:{//one service provider will have only one group of 'contact' information 
		phone:{type: Number, required: true},
		email: {type: String, match: /\S+@\S+\.\S+/, required: true},
		zip: {type: Number, required: true},
		state: {type: String, required: true}
    },
	radius: {type: Number, required: true},
	comments: [{//under one service provider, multiple comments can be inserted which are to be stored in an array
        subuser: {type: String, required: true},
		comment: {type: String, required: true},
		rating: {type: Number, required: false}
    }],
	services : [{//one service provider can register to multiple services in a site
        name: {type: String, required: true},
        rate: {type: Number, required: true}
    }],//{type: Array , "default" : []},
	created: {type: Date,  required: true, default: Date.now},
	modified: {type: Date,  required: true, default: Date.now},
}, {strict: true});// 'true' indicates that values not defined in schema arent saved into the db
//we would use population to refer between collections.

var Provider = mongoose.model('Provider', providerSchema);


Provider.find().

 exec(function (err, data) {
   if(err)
       console.log(err);
   else
       console.log('Found documents for services1: \n', JSON.stringify(data,null, 2));
});


//close the connection
mongoose.connection.close();