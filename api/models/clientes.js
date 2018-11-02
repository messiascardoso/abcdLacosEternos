var mongoose = require('mongoose');

module.exports = function () {

    var schema = mongoose.Schema({
        name: String,
        endereco: String,
        numero: Number,
        bairro: String,
        municipio: String,
        estado: String,
        email: String,
        telefone: String,
    });

    mongoose.set("debug", true);
    return mongoose.model('Clientes', schema);
};
















