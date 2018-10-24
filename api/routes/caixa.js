function verificaAutenticacao(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}


module.exports = function (app) {

    var controller = app.controllers.users;

    app.route('/caixa')
        //.get(verificaAutenticacao, controller.listUser)
    // .post(verificaAutenticacao, controller.salvaParceiro)

    // app.route('/userspartners/:id')
    //     .get(verificaAutenticacao,controller.obtemUser)
    // // .post(verificaAutenticacao, controller.salvaParceiro)
    app.route('/caixa')
        // .post(verificaAutenticacao,controller.salvaUser)
    app.route('/caixa')
        // .delete(verificaAutenticacao, controller.deletaUser)
        // .get(verificaAutenticacao, controller.obtemUser)
        // .put(verificaAutenticacao, controller.atualizaUser)

};