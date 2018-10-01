function verificaAutenticacao(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}


module.exports = function (app) {

    //var multer = require('multer');
    var fs = require('fs');
    var controller = app.controllers.parceiro;

    app.route('/partners')

        .get(verificaAutenticacao, controller.listPartner)
        .post(verificaAutenticacao, controller.salvaParceiro)

    app.route('/partners/:id')

        .delete(verificaAutenticacao, controller.deletaParceiro)
        .get(verificaAutenticacao, controller.obtemParceiro)
        .put(verificaAutenticacao, controller.atualizaParceiro)
   

};