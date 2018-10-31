var mongoose = require('mongoose');

module.exports = function () {

    var schema = mongoose.Schema({
        nome: String,
        data_out: Date,
        data_in: {type: Date, default: Date.now},
        descricao: String,
        categoria: String,
        status: String,
        validade: String,
        tipo:String,
        quantidade: Number,
        nota: String
    });

    mongoose.set("debug", true);
    return mongoose.model('Alimento', schema);
};
















