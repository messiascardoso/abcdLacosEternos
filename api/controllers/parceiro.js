


module.exports = function (app) {

    var fs = require('fs');
    var util = require('util');
    var controller = {}
    var Parceiro = app.models.parceiro;
    


    //Lista partners ADM
    controller.listPartner = function (req, res) {

        Parceiro.find({}, { "offer": 0 }).exec()
            .then(
            function (partners) {
                res.json(partners)

            },
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
            );
    };

    //SALVA Parceiro
    controller.salvaParceiro = function (req, res) {

        // req.assert("name", "Digite um name valido ou campo vazio").notEmpty();
        // req.assert("login", "Digite um login valido ou campo vazio").notEmpty();
        // var errors = req.validationErrors();

        // if (errors) {
        //     console.log('Erros de validação encontrados');
        //     res.status(400).send(errors);
        //     return;
        // }

        var parceiro = req.body
        var form = isEmpty(parceiro);
        var coordenadas = [];


        if (!form) {
            // parceiro.localizacao.type = "Point";


            Parceiro.create(parceiro)
                .then(
                function (parceiros) {
                    res.status(201).json(parceiros);
                },
                function (erro) {
                    console.log("MongoDB=" + erro.message);
                    res.status(500).json(erro.message);
                }
                );
        } else {
            res.send("Objeto vazio");
        }

    };

    //DELETA Parceiro
    controller.deletaParceiro = function (req, res) {
        var _id = req.params.id;
        Parceiro.remove({ "_id": _id }).exec()
            .then(function () {
                res.status(204).end();
            },
            function (erro) {
                res.status(500).json(erro);
            });
    };

    //ATUALIZA Parceiro
    controller.atualizaParceiro = function (req, res) {
        var _id = req.body._id;
        Parceiro.findByIdAndUpdate(_id, req.body).exec()
            .then(function (parceiro) {
                res.json(parceiro);
            },
            function (erro) {
                res.status(500).json(erro);
            });
    };

    //Obter Parceiros
    controller.obtemParceiro = function (req, res) {
        var _id = req.params.id;
        Parceiro.findById(_id, { "offer": 0 }).exec()
            .then(
            function (parceiro) {
                if (!parceiro) throw new Error("parceiro nao encontrado");
                res.json(parceiro);
            },
            function (erro) {
                console.log(erro);
                res.status(404).json(erro);
            }
            );

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

/*

   */


//CONVERT STRING PARA NUMBER     
            // for (i = 0; i < parceiro.localizacao.coordinates.length; i++) {
            //     var latiString = parceiro.localizacao.coordinates[i];
            //     coordenadas[i] = "-" + Number(latiString.substr(1));
            // }

            // parceiro.localizacao.coordinates[0] = coordenadas[0];
            // parceiro.localizacao.coordinates[1] = coordenadas[1];
            //FIM CONVERT STRING PARA NUMBER

            /* console.log("Localizacao.coordinates[0]=" + parceiro.localizacao.coordinates[0]);
             console.log("Localizacao.coordinates[1]=" + parceiro.localizacao.coordinates[1]);*/


/*
           var point = { type: "Point", coordinates: [-23.599531, -46.439716] };
           Parceiro.geoNear(point, {minDistance:1, spherical: true, distanceMultiplier : 0.001, query}, 
           function (err, results, stats) {
               if(err){
                    console.log(err);
               };
               console.log(results);
               res.json(results[0]);
               
           });*/