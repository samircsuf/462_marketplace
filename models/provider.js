var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var providerSchema = new Schema({
    first_name: { type: String, required: false, uppercase: true },
    last_name: { type: String, required: false, uppercase: true },
    username: { type: String },
    password: { type: String }, //makes password accessible by default so that we can fetch it from db.Normally, it should be false
    email: { type: String, required: false },
    organization: { type: String, required: false },
    contractorID: { type: String, required: false },
    contact: { //one service provider will have only one group of 'contact' information 
        phone: { type: Number, required: false },
        email: { type: String, match: /\S+@\S+\.\S+/, required: false },
        address: { type: String },
        zip: { type: Number, required: false },
        state: { type: String, required: false }
    },
    radius: { type: Number, required: false },
    comments: [{ //under one service provider, multiple comments can be inserted which are to be stored in an array
        subuser: { type: String, required: false },
        comment: { type: String, required: false },
        rating: { type: Number, required: false }
    }],
    services: { //one service provider can register to multiple services in a site
        name: { type: String, required: false },
        rate: { type: Number, required: false }
    }, //{type: Array , "default" : []}, changed to single field to make it simplicity
    created: { type: Date, required: false, default: Date.now },
    modified: { type: Date, required: false, default: Date.now },
}, { strict: true }); // 'true' indicates that values not defined in schema arent saved into the db
//we would use population to refer between collections.

module.exports = mongoose.model('Provider', providerSchema);