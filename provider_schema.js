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

//auto increment _id
/*
db.Provider.insert(
   {
      _id: "sid",
      seq: AAB10000
   }
);

function getNextSequence (name) {
   var ret = db.Provider.findAndModify(
          {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true
          }
   );`

   return ret.seq;
}
*/
var providerRecords = [
{
	first_name: 'Daniel',
	last_name: 'Castro',
    username: 'dcastro',
	organization: 'ABC Contractors',
	contractorID: '1234567',
	contact:{
		phone:7162319045,
		email: 'meyerec@gmail.com',
		zip: 92820,
		state: 'CA'
    },
	radius: 8,
    comments:[{
        subuser: 'xxxxx',
		comment: 'Best ever Service',
		rating: 4.5
    },
    {
        subuser: 'yyyy',
		comment: 'Great Service',
		rating: 4.0
    }],
	services:[{
        name:'Math Tutor',
        rate: 200
        },
        {
        name:'Coding Assignment',
        rate: 200
        }

        //{name:'Coding Assignment', rate: 25},
        //{name:'Code Troubleshooting', rate: 30}
    ],
	created: Date.now(function(){return new Date().toISOString();}),
	modified: Date.now(function(){return new Date().toISOString();})
}
];

//Save multiple record
Provider.collection.insert(providerRecords, function (err, docs) {
    if (err)
        console.log('error:', err);
    else
        console.log('Documents insert result:', docs);
});

function dc (msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
}

Provider.find({ 'username' : 'dcastro'}).
 where('radius').lt(20).
 where('services.rate').gt(10).lt(210).
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


//close the connection
mongoose.connection.close();
