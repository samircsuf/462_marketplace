var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var providerSchema = new Schema({
    id: { type: String, required: true }, //getNextSequence("sid"), //ObjectID('AA1111')	
    first_name: { type: String, required: true, uppercase: true },
    last_name: { type: String, required: true, uppercase: true },
    username: { type: String, min: 6, max: 35, required: true, lowercase: true, index: { unique: true } },
    password: { type: String, min: 8, max: 16, select: true }, //makes password accessible by default so that we can fetch it from db.Normally, it should be false
    phone: { type: Number, required: true },
    email: { type: String, match: /\S+@\S+\.\S+/, required: true },
    service_name: { type: String, required: true },
    rate: { type: Number, required: true }
}, { strict: true }); // 'true' indicates that values not defined in schema arent saved into the db
//we would use population to refer between collections.
module.exports = mongoose.model('Provider', providerSchema);