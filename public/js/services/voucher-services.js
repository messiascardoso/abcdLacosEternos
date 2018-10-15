angular.module('abcdlacosEternos').factory('VoucherService', function ($http, Upload, config, $stateParams) {
 

    //Valida Voucher
   var _validVoucher = function(codvoucher){
        return $http.get("/voucher?codvoucher="+codvoucher);

   };

    var _listVoucher = function(partner_id){
        return $http.get("/partnersvouchers?partner_id="+partner_id);

   };

    var _listVouchersgeneratedAdm = function(){
        return $http.get("/adm/partnersvouchers");

   };

     var _listVouchersValidatedAdm = function(query){
        return $http.get("/adm/vouchersvalidated?partner_id="+query._id+"&date_initial="+query.date_initial+"&date_end="+query.date_end);

   };

    // Servicos externos aos controllers
    return{
      validVoucher: _validVoucher,
      listVoucher: _listVoucher,
      listVouchersgeneratedAdm: _listVouchersgeneratedAdm,
      listVouchersValidatedAdm: _listVouchersValidatedAdm
    
    };
     

   

    
 

});




      //Fizemos um chamada AJAXSON lá pro serviço feito
        //Em NODE (CADASTRAR = POST)
        //URL => Aonde estamos indo
        //METHOD => Como estamos indo
        //DATA => É o que estamos levando
        //OBS: Não fazer tratamento de sucesso ou erro
        //No service, esses tratamentos ficam no controller


 //Futuramente as nossas telas vão precisar de 2 comandos
    //Listar e Cadastrar os clientes
    //Dentro desses comandos faremos as chamadas remotas (AJAX)
    //Como não é momento de falar de ajax demos um MIGUE simulamos dados
    //O THIS é como se fosse o PUBLIC vai ficar visivel pra que chamar o
    //ClienteService
    //Aqui no SERVICE não tem SCOPE, SCOPE é só pra CONTROLLER






























/*angular.module('togo.services', [])

.factory('Chats', function() {
  
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
*/