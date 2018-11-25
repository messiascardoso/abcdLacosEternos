function verificaAutenticacao(req, res, next) {
	if (req.isAuthenticated()) {
			return next();
	} else {
			res.status('401').json('Não autorizado');
	}
}

module.exports = function (app) {

	var controller = app.controllers.users;

	app.route('/users')
			.get(verificaAutenticacao, controller.listUser)
	app.route('/user')
			.post(verificaAutenticacao,controller.salvaUser)
	app.route('/user/:id')
			.delete(verificaAutenticacao, controller.delUser)
			.get(verificaAutenticacao, controller.getUser)
			.put(verificaAutenticacao, controller.updateUser)

};