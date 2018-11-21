function verificaAutenticacao(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}

module.exports = function (app) {
	var controller = app.controllers.cadastroCodigo;
	app.route('/codigos')
		.get(controller.listCodigos)
		.post(controller.save)
	app.route('/codigos/:id')
		.delete(verificaAutenticacao, controller.delCodigo)
		.get(verificaAutenticacao, controller.getCodigo)
		.put(verificaAutenticacao, controller.updateCodigo)
};