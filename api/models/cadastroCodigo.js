var mongoose = require('mongoose');

module.exports = function () {

    var schema = mongoose.Schema({
        codigo: String,
        descricao: String,
        categoria: String
    });

    mongoose.set("debug", true);
    return mongoose.model('CadastroCodigo', schema);
};
















