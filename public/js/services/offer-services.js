angular.module('abcdlacosEternos').factory('offerService', function ($http, Upload, config, $stateParams) {

  
   //Lista com Geolocation  
    var _getListPartnersGeo = function(){
      return $http.get("/partnerslocation");
    };

    // Lista de ofertas
      var _listOffer = function(partnerId){
      return $http.get("/offers/"+partnerId);
    };

    
    //Uploa Imagens
    var _uploadOffer = function(file, offerId, tipo){
       return file.upload = Upload.upload({
                method: "POST",
                url: '/offer/upload',
                data: {file: file, _id:offerId, tipo:tipo}
            });
    };

    //Save Offer

    var _saveOffer = function(offer, partnerId){
        return $http.post("/offer/"+partnerId,
           offer);
    };

    // Update Offer
     var _updateOffer = function(offer, offerId){
         return $http.put("/offer/"+ offerId, offer);
    };

  //GetID Offer
     var _getIdOffer = function(offerId,partnerId){

        return $http.get("/offer?offerId="+offerId+"&partnerId="+partnerId);
    };

    //GetID Offer
     var _getIdOfferPhotos = function(offerId,partnerId){

        return $http.get("/offerphotos?offerId="+offerId+"&partnerId="+partnerId);
    };

       
    // Delete Offervar
     _offerDel = function(offerId, partnerId){
        return $http.delete("/offer?offerId="+offerId+"&partnerId="+partnerId);
    };



    // Servicos externos aos controllers
    return{
      getListPartnerGeo: _getListPartnersGeo,
      uploadOffer: _uploadOffer,
      saveOffer: _saveOffer,
      updateOffer: _updateOffer,
      listOffer: _listOffer,
      getIdOffer: _getIdOffer,
      getIdOfferPhotos:_getIdOfferPhotos,
      offerDel:_offerDel
    };
     

   

    
 

});

// services:
/* this.Listar = function () {
        return $http({
            url: url + "/parceiros/location ",
            method: "get"

        });

    };*/

/* this.NewOffer = function (file) {

        return $http({
            url: url+"/partner/offer",
            method: "POST",
            data: newoffer
        });

    };
*/



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