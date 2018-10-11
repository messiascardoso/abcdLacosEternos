var mongoose = require('mongoose');

module.exports = function () {

    var schema = mongoose.Schema({
        address: { type: String },
        city: { type: String },
        zipcode: { type: String },
        site: { type: String },
        email2: { type: String },
        contact: { type: String },
        type: { type: String },
        phone1: { type: String },
        phone2: { type: String },
        contact2: { type: String }
    });

    mongoose.set("debug", true);
    return mongoose.model('Donors', schema);
};



















