angular.module('abcdlacosEternos').controller('AlimentoController',
    function ($scope, $http, $stateParams, $location, ModalAlertService, Profile, AlimentoServices) {  //$routeParams

    $scope.alimento = {};
		$scope.mensagem = '';
		//Recebe funcao de validaçao de profile 
		$scope.profile = Profile;

		//Get alimento ID
		if ($stateParams.alimentoId) {
			AlimentoServices.get($stateParams.alimentoId)
				.success(function (alimento) {
					$scope.alimento = alimento;
				})
				.error(function (error) {
					$scope.mensagem = 'Error writing';
					$scope.status = "alert alert-danger";
				});
		}

		//Salva usuario ou Update
		$scope.submeter = function (formulario) {
			if (formulario.$valid) {
				if ($scope.alimento._id) {
					AlimentoServices.update($stateParams.alimentoId, $scope.alimento )
						.success(function () {
							$scope.alimento = {};
							formulario.$setPristine();
							formulario.$setUntouched();
							ModalAlertService.open('lg');
						})
						.error(function (error) {
								$scope.mensagem = 'Error writing';
								$scope.status = "alert alert-danger";
						});
					} else {
					
						AlimentoServices.save($scope.alimento)
							.success(function (retorno) {
								$scope.mensagem = 'Salve successfully';
								$scope.status = "alert alert-success";
								formulario.$setPristine();
								formulario.$setUntouched();
								$scope.alimento = {};
							})
							.error(function (erro) {
								$scope.mensagem = 'Error writing';
								$scope.status = "alert alert-danger";
							});
						}
			} else {
				console.log('formulario invalido!')
			}

		};
                
		// Remove Partner
        // $scope.remover = function (partner) {
				// 	recursoPartner.delete({ partnerId: partner._id }, function () {
				// 		var indiceDoPartner = $scope.partners.indexOf(partner);
				// 		$scope.partners.splice(indiceDoPartner, 1);
				// 		$scope.mensagem = 'Partners removido com sucesso!';
				// 		delete $scope.partner;
				// 	}, function (erro) {
				// 			console.log(erro);
				// 			$scope.mensagem = 'Não foi possível apagar o parceiro ' + partner.name;
				// 	});
        // };

    });