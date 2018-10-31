function verificaAutenticacao(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}

module.exports = function (app) {
	var controller = app.controllers.alimentos;
	app.route('/alimentos')
		.get(controller.listAlimentos)
		.post(controller.save)
	app.route('/alimentos/:id')
		.delete(verificaAutenticacao, controller.delAlimento)
		.get(verificaAutenticacao, controller.getAlimento)
		.put(verificaAutenticacao, controller.updateAlimento)
};