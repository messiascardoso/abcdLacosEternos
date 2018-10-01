module.exports = function (app) {
    var mongoose = require('mongoose');
    var fs = require('fs');
    var util = require('util');
    var bcrypt = require('bcrypt-nodejs');

    var controller = {}
    var User = app.models.users;
    var Partner = app.models.parceiro;




    //Lista de usuarios ADM  Status: true 
    controller.listUser = function (req, res) {

        //  var query = { "email": req.query.email};

        User.find({}, { "password": 0 }).exec()
            .then(function (data) {
                res.status(200).json(data);
            },
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            });

    };

    //SALVA Usuario
    controller.salvaUser = function (req, res) {

        var user = req.body
        var form = isEmpty(user);
        var coordenadas = [];
        var partner_new = { "localizacao": { "type": "Point", "coordinates": [0, 0] },
                           "contact":req.body.name,
                            "dba":req.body.email };

        if (!form) {

            if (req.body.email && req.body.profile) {


                switch (req.body.profile) {

                    case 'PARTNER':
                        console.log('PARTNER');

                        Partner.create(partner_new)
                            .then(
                            function (partner) {
                                partner_new = partner;
                                //Create user com Id_Partner

                                var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5), null);
                                var userNew = {
                                    "email": req.body.email,
                                    "password": password,
                                    "name": req.body.name,
                                    "note": req.body.note,
                                    "provider": req.body.provider,
                                    "email2": req.body.email2,
                                    "profile": [req.body.profile],
                                    "partner_id": partner_new._id,
                                    "status": true

                                };
                                if (userNew.email) {
                                    User.create(userNew)
                                        .then(
                                        function (users) {
                                            res.status(201).end();
                                        },
                                        function (erro) {
                                            console.log("MongoDB=" + erro.message);
                                            res.status(500).json(erro.message);
                                        }
                                        );
                                    //Fim Create User
                                };

                            },
                            function (erro) {
                                console.log("MongoDB=" + erro.message);
                                res.status(500).json(erro.message);
                            }
                            );//Fim Partner.create


                        break;

                    case 'ADMIN':

                        var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5), null);
                        var userNew = {
                            "email": req.body.email,
                            "password": password,
                            "name": req.body.name,
                            "note": req.body.note,
                            "provider": req.body.provider,
                            "profile": [req.body.profile],
                            "status": true

                        };

                        if (userNew.email) {
                            User.create(userNew)
                                .then(
                                function (users) {
                                    res.status(201).end();
                                },
                                function (erro) {
                                    console.log("MongoDB=" + erro.message);
                                    res.status(500).json(erro.message);
                                }
                                );

                        };
                        //Fim Create User    

                        break;

                    default:
                        break;
                };//Fim switch
            }; //IF req.body.email && req.body.profile


        } else {
            res.send("Objeto vazio");
        }

    };

    //DELETA Usuario
    controller.deletaUser = function (req, res) {
        var _id = req.params.id;
        User.remove({ "_id": _id }).exec()
            .then(function () {
                res.status(204).end();
            },
            function (erro) {
                res.status(500).json(erro);
            });
    };

    //ATUALIZA Usuario
    controller.atualizaUser = function (req, res) {
        var _id = req.body._id;

        var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5), null);

        if (req.body.password) {
            var userUpdate = {
                "email": req.body.email,
                "name": req.body.name,
                "password": password,
                "note": req.body.note,
                "provider": req.body.provider,
                "email2": req.body.email2,
                "profile": [req.body.profile]
            };

        } else {

            var userUpdate = {
                "email": req.body.email,
                "name": req.body.name,
                "note": req.body.note,
                "provider": req.body.provider,
                "email2": req.body.email2,
                "profile": [req.body.profile]
            };

        };


        User.findByIdAndUpdate(_id, userUpdate).exec()
            .then(function (user) {
                res.json(user);
            },
            function (erro) {
                res.status(500).json(erro);
            });
    };

    //Obter Usuarios
    controller.obtemUser = function (req, res) {
        var _id = req.params.id;
        User.findById(_id, { "password": 0 }).exec()
            .then(function (user) {
                if (!user) throw new Error("user nao encontrado");
                res.json(user);
            },
            function (erro) {
                console.log(erro);
                res.status(404).json(erro);
            }
            );

    };


        // Atualiza Offer
    controller.disableUser = function (req, res) {

        //  Enviar o ID do produto direto pelo params

        var offer = req.body;

        User.findByIdAndUpdate({ "_id": req.params },
            {
                "$set": {
                    "status": false,
                }
            },
            function (err, model) {
                if (err) {
                    console.log(err);
                    return res.send(err);
                }
                return res.json(model);
            });



    };





    //Verifica se objeto tem propriedades 
    //com propriedade retorna false
    //sem propriedade retorna true
    function isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    }
    //fim da funcao 





    return controller;

};



  // req.assert("name", "Digite um name valido ou campo vazio").notEmpty();
        // req.assert("login", "Digite um login valido ou campo vazio").notEmpty();
        // var errors = req.validationErrors();

        // if (errors) {
        //     console.log('Erros de validação encontrados');
        //     res.status(400).send(errors);
        //     return;
        // }



         // usuario.localizacao.type = "Point";


            //CONVERT STRING PARA NUMBER     
            // for (i = 0; i < usuario.localizacao.coordinates.length; i++) {
            //     var latiString = usuario.localizacao.coordinates[i];
            //     coordenadas[i] = "-" + Number(latiString.substr(1));
            // }

            // usuario.localizacao.coordinates[0] = coordenadas[0];
            // usuario.localizacao.coordinates[1] = coordenadas[1];
            //FIM CONVERT STRING PARA NUMBER

           /* console.log("Localizacao.coordinates[0]=" + usuario.localizacao.coordinates[0]);
            console.log("Localizacao.coordinates[1]=" + usuario.localizacao.coordinates[1]);*/