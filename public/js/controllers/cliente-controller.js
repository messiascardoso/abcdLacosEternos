angular.module('abcdlacosEternos').controller('ClienteController',
    function ($scope, $http, $stateParams, $location, ModalAlertService, Profile, ClienteServices) {  //$routeParams

    $scope.cliente = {};
		$scope.mensagem = '';
		//Recebe funcao de validaçao de profile 
		$scope.profile = Profile;

		//Get cliente ID
		if ($stateParams.clienteId) {
			ClienteServices.get($stateParams.clienteId)
				.success(function (cliente) {
					$scope.cliente = cliente;
				})
				.error(function (error) {
					$scope.mensagem = 'Error writing';
					$scope.status = "alert alert-danger";
				});
		}

		//Salva usuario ou Update
		$scope.submeter = function (formulario) {
			if (formulario.$valid) {
				if ($scope.cliente._id) {
					ClienteServices.update($stateParams.clienteId, $scope.cliente )
						.success(function () {
							$scope.cliente = {};
							formulario.$setPristine();
							formulario.$setUntouched();
							ModalAlertService.open('lg');
						})
						.error(function (error) {
								$scope.mensagem = 'Error writing';
								$scope.status = "alert alert-danger";
						});
					} else {
					
						ClienteServices.save($scope.cliente)
							.success(function (retorno) {
								$scope.mensagem = 'Salve successfully';
								$scope.status = "alert alert-success";
								formulario.$setPristine();
								formulario.$setUntouched();
								$scope.cliente = {};
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