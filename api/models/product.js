var mongoose = require('mongoose');

module.exports = function () {

    var schema = mongoose.Schema({
        name: String,
        date_out: Date,
        date_in: {type: Date, default: Date.now},
        description: String,
        category: String,
        status: String,
        validation_code: String,
        price: Number,
        totalprice: Number,
        percentagem: Number,
        size: String,
        genero:String,
        amount: Number,
        note: String
    });

    mongoose.set("debug", true);
    return mongoose.model('Product', schema);
};
















