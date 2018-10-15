angular.module('abcdlacosEternos').controller('ProdutoController',
    function ($scope, $http, $stateParams, $location, ModalAlertService, Profile, ProdutoServices) {  //$routeParams

    $scope.produto = {};
		$scope.mensagem = '';
		//Recebe funcao de validaçao de profile 
		$scope.profile = Profile;

		//Get produto ID
		if ($stateParams.produtoId) {
			ProdutoServices.get($stateParams.produtoId)
				.success(function (produto) {
					$scope.produto = produto;
				})
				.error(function (error) {
					$scope.mensagem = 'Error writing';
					$scope.status = "alert alert-danger";
				});
		}

		//Salva usuario ou Update
		$scope.submeter = function (formulario) {
			if (formulario.$valid) {
				if ($scope.produto._id) {
					ProdutoServices.update($stateParams.produtoId, $scope.produto )
						.success(function () {
							$scope.produto = {};
							formulario.$setPristine();
							formulario.$setUntouched();
							ModalAlertService.open('lg');
						})
						.error(function (error) {
								$scope.mensagem = 'Error writing';
								$scope.status = "alert alert-danger";
						});
					} else {
					
						ProdutoServices.save($scope.produto)
							.success(function (retorno) {
								$scope.mensagem = 'Salve successfully';
								$scope.status = "alert alert-success";
								formulario.$setPristine();
								formulario.$setUntouched();
								$scope.produto = {};
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