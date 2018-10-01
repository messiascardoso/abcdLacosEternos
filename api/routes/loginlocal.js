var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var mongoose = require('mongoose');


module.exports = function (app) {



  // var User = mongoose.model('User');


  app.post('/autentica',
    passport.authenticate('local', { failureRedirect: '#/login', failureFlash: true }),
    function (req, res) {

      res.status(200).end();

    });


  app.route('/profile')
    .get(verificaAutenticacao, function (req, res) {
      res.json({
        email: req.user.email,
        _id: req.user._id,
        profile: req.user.profile[0],
        name: req.name,
        partner_id:req.user.partner_id
      });
    });

  /*   app.get('/profile',function(req, res){
      
      res.json({email:req.user.email,
                profile: req.user.profile[0],
                name:req.name
              });
    });*/



  app.get('/logout',
    function (req, res) {
      req.logout();
      res.redirect('#/login');
    });



  function verificaAutenticacao(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status('401').json('Não autorizado');
    }
  };


}