function verificaAutenticacao(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}

module.exports = function (app) {
	var controller = app.controllers.product;
	app.route('/product')
		.get(verificaAutenticacao, controller.listProduct)
		.post(verificaAutenticacao, controller.save)
	app.route('/product/:id')
		.delete(verificaAutenticacao, controller.delProduct)
		.get(verificaAutenticacao, controller.getProduct)
		.put(verificaAutenticacao, controller.updateProduct)
};