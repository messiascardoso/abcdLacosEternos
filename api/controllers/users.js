module.exports = function (app) {
    var mongoose = require('mongoose');
    var fs = require('fs');
    var util = require('util');
    var bcrypt = require('bcrypt-nodejs');

    var controller = {}
    var User = app.models.users;
    // var Partner = app.models.parceiro;

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

    controller.salvaUser = function (req, res) {
        var user = req.body
        var form = isEmpty(user);
        var coordenadas = [];
        if (!form) {
					if (req.body.email && req.body.profile) {
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
					}
        } else {
            res.send("Objeto vazio");
        }
    };
    controller.delUser = function (req, res) {
			var _id = req.params.id;
			User.remove({ "_id": _id }).exec()
				.then(function () {
						res.status(204).end();
				},
				function (erro) {
						res.status(500).json(erro);
				});
    };
    
    controller.updateUser = function (req, res) {
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

    controller.getUser = function (req, res) {
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
    controller.disabledUser = function (req, res) {
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

    function isEmpty(obj) {
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop))
					return false;
			}
			return true;
    }

    return controller;
};
