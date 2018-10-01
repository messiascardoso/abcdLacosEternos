angular.module('americanExperian').controller('PartnerController',
    function ($scope,$http, $stateParams, $location, cadastroPartner,recursoPartner, ModalAlertService, Profile) {  //$routeParams

        $scope.partner = {};
		$scope.mensagem = '';
		$scope.profile = Profile;
		
	  //Get Partner ID	
		if($stateParams.partnerId) {
			recursoPartner.get({partnerId: $stateParams.partnerId}, function(partner) {
				$scope.partner = partner; 
				$scope.partner.localizacao.latitude = partner.localizacao.coordinates[0];
				$scope.partner.localizacao.longitude = partner.localizacao.coordinates[1];
			}, function(erro) {
				$scope.mensagem = 'Não foi possível obter a partner';
			});
		}

		// Salva new Partner
		$scope.submeter = function() {

			if ($scope.formulario.$valid) {

                $scope.partner.localizacao = {"type" : "Point","coordinates" : [  $scope.partner.localizacao.latitude,$scope.partner.localizacao.longitude]},
				cadastroPartner.cadastrar($scope.partner)
				.then(function(dados) {
					$scope.mensagem = dados.mensagem;
					// Mensagem de sucesso modal			
						ModalAlertService.messageSuccess('lg');
					// fim
					if (dados.inclusao) $scope.partner = {};
					delete $scope.partner;
					$scope.formulario.$setPristine();
					
				})
				.catch(function(erro) {
					$scope.mensagem = erro.mensagem;
					// Mensagem de sucesso modal			
						ModalAlertService.messageError('lg');
					// fim
					
				});
			}
		};

		// Remove Partner
        $scope.remover = function (partner) {
            
            recursoPartner.delete({ partnerId: partner._id }, function () {
                
                var indiceDoPartner = $scope.partners.indexOf(partner);
                $scope.partners.splice(indiceDoPartner, 1);
                $scope.mensagem = 'Partners removido com sucesso!';
				delete $scope.partner;

            }, function (erro) {
                console.log(erro);
                $scope.mensagem = 'Não foi possível apagar o parceiro ' + partner.name;
            });
        };
        
        

    });