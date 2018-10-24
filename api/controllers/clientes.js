

module.exports = function (app) {

    var fs = require('fs');
    var util = require('util');
    var controller = {};
    var Clientes = app.models.clientes;

    controller.listClientes = function (req, res) {
			Clientes.find({}).exec()
				.then(
				function (clientes) {
						res.json(clientes)
				},
				function (erro) {
						console.error(erro);
						res.status(500).json(erro);
				}
				);
    };

    controller.save = function (req, res) {
			

			var _clientes = req.body 
			var form = isEmpty(_clientes);
			if (!form) {
				Clientes.create(_clientes)
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

    controller.delClientes = function (req, res) {
			var _id = req.params.id;
			Clientes.remove({ "_id": _id }).exec()
				.then(function () {
					res.status(204).end();
				},
				function (erro) {
					res.status(500).json(erro);
				});
    };

    controller.updateClientes = function (req, res) {
			var _id = req.body._id;
			Clientes.findByIdAndUpdate(_id, req.body).exec()
				.then(function (Clientes) {
					res.json(Clientes);
				},
				function (erro) {
						res.status(500).json(erro);
				});
    };

    controller.getClientes = function (req, res) {
			var _id = req.params.id;
			Clientes.findById( _id ).exec()
				.then(
				function (Clientes) {
					if (!Clientes) throw new Error("Clientes nao encontrado");
					res.json(Clientes);
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


