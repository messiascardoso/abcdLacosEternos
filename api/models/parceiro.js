var mongoose = require('mongoose');

module.exports = function () {

    var Offer = mongoose.Schema({
        namefantasy: String,
        date_out: Date,
        date_in: Date,
        description_main: String,
        title1_detail: String,
        description_detail_1: String,
        title2_detail: String,
        description_detail_2: String,
        rule_title1: String,
        rule_description1: String,
        rule_title2: String,
        rule_description2: String,
        thumbnail: Buffer,
        slide1: Buffer,
        slide2: Buffer,
        slide3: Buffer,
        name_thumbnail: String,
        name_slide1: String,
        name_slide2: String,
        name_slide3: String,

        category: String,
        status: String,
        validation_code: String,
        price: Number,


        totalprice: Number,
        percentagem: Number,

        percentagemadult: Number,
        amountadult: Number,

        priceperchild: Number,
        percentagemperchild: Number,

        percentagemchild: Number,
        amountchild: Number,

        description_mainEs: String,
        title1_detailEs: String,
        description_detail_1Es: String,
        title2_detailEs: String,
        description_detail_2Es: String,
        rule_title1Es: String,
        rule_description1Es: String,
        rule_title2Es: String,
        rule_description2Es: String,
        description_mainPt: String,
        title1_detailPt: String,
        description_detail_1Pt: String,
        title2_detailPt: String,
        description_detail_2Pt: String,
        rule_title1Pt: String,
        rule_description1Pt: String,
        rule_title2Pt: String,
        rule_description2Pt: String,

    });

    var comments = mongoose.Schema({
        datein: {type: Date, default: Date.now},
        user:String,
        namefantasy: String,
        rating: Number,
        outline:Number,
        comment: String,

    });

    var schema = mongoose.Schema({

        dba: { type: String },
        taxid: { type: String },
        address: { type: String },
        city: { type: String },
        zipcode: { type: String },
        site: { type: String },
        email2: { type: String },
        contact: { type: String },
        type: { type: String },
        phone1: { type: String },
        phone2: { type: String },
        contact2: { type: String },
        type2: { type: String },
        phone1c2: { type: String },
        phone2c2: { type: String },
        contact3: { type: String },
        type3: { type: String },
        phone1c3: { type: String },
        phone2c3: { type: String },
        note: { type: String },
        commission: { type: String },
        value: { type: Number },


        datein: {
            type: Date,
            default: Date.now
        },
        
        offer: [Offer],
        comments: [comments],

        localizacao: {
            'type': {
                type: String,
            },
            coordinates: [Number]
        }








        //referencia a outra Schema    
        /* status_id:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Status'
         },*/



    });

    mongoose.set("debug", true);
    return mongoose.model('Parceiro', schema);
};



 /*    produto:[{
            name:String,
            descricao:String,
            value:Number,
            img:[{
                nome_arquivo:String,
                imagem:Buffer
            }],
            date :Date
         }],*/
















