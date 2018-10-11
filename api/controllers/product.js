

module.exports = function (app) {

    var fs = require('fs');
    var util = require('util');
    var controller = {}
    var Product = app.models.product;

    controller.listProduct = function (req, res) {
			Product.find({}).exec()
				.then(
				function (products) {
						res.json(products)
				},
				function (erro) {
						console.error(erro);
						res.status(500).json(erro);
				}
				);
    };

    controller.save = function (req, res) {
			var product = req.body
			var form = isEmpty(product);
			if (!form) {
				Product.create(product)
					.then(
					function (products) {
						res.status(201).json(products);
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

    controller.delProduct = function (req, res) {
			var _id = req.params.id;
			Product.remove({ "_id": _id }).exec()
				.then(function () {
					res.status(204).end();
				},
				function (erro) {
					res.status(500).json(erro);
				});
    };

    controller.updateProduct = function (req, res) {
			var _id = req.body._id;
			Product.findByIdAndUpdate(_id, req.body).exec()
				.then(function (product) {
					res.json(product);
				},
				function (erro) {
						res.status(500).json(erro);
				});
    };

    controller.getProduct = function (req, res) {
			var _id = req.params.id;
			Product.findById( _id ).exec()
				.then(
				function (product) {
					if (!product) throw new Error("product nao encontrado");
					res.json(product);
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


