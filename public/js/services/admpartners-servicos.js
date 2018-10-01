angular.module('AdmPartners', ['ngResource'])

	.factory('recursoPartner', function($resource) {

		return $resource('/adm/partners/:partnerId', null, {
			'update' : { 
				method: 'PUT'
			}
		});
	})


	.factory("cadastroPartner", function(recursoPartner, $q, $rootScope) {
		
		var evento = 'partnerCadastrada';

		var service = {};

		service.cadastrar = function(partner) {
			return $q(function(resolve, reject) {

				if(partner._id) {
					recursoPartner.update({partnerId: partner._id}, partner, function() {

						$rootScope.$broadcast(evento);
						resolve({
							mensagem: 'Partner ' + partner.name + ' successfully included',
							inclusao: false
						});
					}, function(erro) {
						console.log(erro);
						reject({
							mensagem: 'Partner Error Not Updated ' + partner.name
						});
					});

				} else {
					recursoPartner.save(partner, function() {
						$rootScope.$broadcast(evento);
						resolve({
							mensagem: 'Partner ' + partner.name + ' successfully included',
							inclusao: true
						});
					}, function(erro) {
						console.log(erro);
						reject({
							mensagem: 'Partner error not included ' + partner.name
						});
					});
				}
			});
		};


		
		return service;
    })


    .factory('recursoPartners', function($resource) {

		return $resource('/partners');
	});