

module.exports = function (app) {

    var fs = require('fs');
    var util = require('util');
    var controller = {};
    var Codigo = app.models.cadastroCodigo;

    controller.listCodigos = function (req, res) {
			Codigo.find({}).exec()
				.then(
				function (codigos) {
						res.json(codigos)
				},
				function (erro) {
						console.error(erro);
						res.status(500).json(erro);
				}
				);
    };

    controller.save = function (req, res) {
			var _codigo = req.body 
			var form = isEmpty(_codigo);
			if (!form) {
				Codigo.create(_codigo)
					.then(
					function (result) {
						res.status(201).json(result);
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

    controller.delCodigo = function (req, res) {
			var _id = req.params.id;
			Codigo.remove({ "_id": _id }).exec()
				.then(function () {
					res.status(204).end();
				},
				function (erro) {
					res.status(500).json(erro);
				});
    };

    controller.updateCodigo = function (req, res) {
			var _id = req.body._id;
			Codigo.findByIdAndUpdate(_id, req.body).exec()
				.then(function (Codigo) {
					res.json(Codigo);
				},
				function (erro) {
						res.status(500).json(erro);
				});
    };

    controller.getCodigo = function (req, res) {
			var _id = req.params.id;
			Codigo.findById( _id ).exec()
				.then(
				function (Codigo) {
					if (!Codigo) throw new Error("Codigo nao encontrado");
					res.json(Codigo);
				},
				function (erro) {
					console.log(erro);
					res.status(404).json(erro);
				}
				);
		};
    
    function isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    }

    return controller;

};


