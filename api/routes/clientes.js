function verificaAutenticacao(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}

module.exports = function (app) {
	var controller = app.controllers.clientes;
	app.route('/clientes')
		.get(controller.listClientes)
		.post(controller.save)
	app.route('/clientes/:id')
		.delete(verificaAutenticacao, controller.delClientes)
		.get(verificaAutenticacao, controller.getClientes)
		.put(verificaAutenticacao, controller.updateClientes)
};