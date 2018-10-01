var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var bcrypt = require('bcrypt-nodejs');


 
// console.log(bcrypt.hashSync("adm#teste", bcrypt.genSaltSync(5), null));


module.exports = function () {

    var schema = mongoose.Schema({
        email: {type: String,required: true, index: {unique: true}},
        password: {type: String,},
        name: {type: String},
        note: {type: String},
        provider: {type: String},
        email2: {type: String},
        inclusao: {type: Date,default: Date.now},
        profile:[{type:String}],  //ADM, PARTNER
        partner_id:{type: mongoose.Schema.Types.ObjectId, 
           ref: 'Parceiro'
        },
        status: {type: Boolean},
    });

    schema.methods.encryptPassword = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
    };

    schema.methods.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    }

 





    // schema.plugin(findOrCreate);

    return mongoose.model('User', schema);
};


/* login: {
            email: { type: String, index: { unique: true } },
            password: { type: String },
            firstname: { type: String },
            lastname: { type: String }
        },*/