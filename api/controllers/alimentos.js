

module.exports = function (app) {

    var fs = require('fs');
    var util = require('util');
    var controller = {};
    var Alimentos = app.models.alimento;

    controller.listAlimentos = function (req, res) {
			Alimentos.find({}).exec()
				.then(
				function (alimentos) {
						res.json(alimentos)
				},
				function (erro) {
						console.error(erro);
						res.status(500).json(erro);
				}
				);
    };

    controller.save = function (req, res) {
			var _alimento = req.body 
			var form = isEmpty(_alimento);
			if (!form) {
				Alimentos.create(_alimento)
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

    controller.delAlimento = function (req, res) {
			var _id = req.params.id;
			Alimentos.remove({ "_id": _id }).exec()
				.then(function () {
					res.status(204).end();
				},
				function (erro) {
					res.status(500).json(erro);
				});
    };

    controller.updateAlimento = function (req, res) {
			var _id = req.body._id;
			Alimentos.findByIdAndUpdate(_id, req.body).exec()
				.then(function (Alimentos) {
					res.json(Alimentos);
				},
				function (erro) {
						res.status(500).json(erro);
				});
    };

    controller.getAlimento = function (req, res) {
			var _id = req.params.id;
			Alimentos.findById( _id ).exec()
				.then(
				function (Alimentos) {
					if (!Alimentos) throw new Error("Alimentos nao encontrado");
					res.json(Alimentos);
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


