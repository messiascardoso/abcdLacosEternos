angular.module('abcdlacosEternos').controller('CodigoController',
    function ($scope, $stateParams, Profile, CodigoServices, SweetAlert) {  //$routeParams

    $scope.cadastro = {};
		$scope.mensagem = '';
		//Recebe funcao de validaçao de profile 
		$scope.profile = Profile;

		//Get codigo ID
		if ($stateParams.codigoId) {
			CodigoServices.get($stateParams.codigoId)
				.success(function (codigo) {
					$scope.cadastro = codigo;
				})
				.error(function (error) {
					$scope.mensagem = 'Error writing';
					$scope.status = "alert alert-danger";
				});
		}

		//Salva usuario ou Update
		$scope.submeter = function (formulario) {
			if (formulario.$valid) {
				if ($scope.cadastro._id) {
					CodigoServices.update($stateParams.codigoId, $scope.codigo )
						.success(function () {
							$scope.cadastro = {};
							formulario.$setPristine();
							formulario.$setUntouched();
							SweetAlert.swal("codigo", "Atualizado com sucesso!", "success");
						})
						.error(function (error) {
								$scope.mensagem = 'Error writing';
								$scope.status = "alert alert-danger";
						});
					} else {
					
						CodigoServices.save($scope.cadastro)
							.success(function (retorno) {
								$scope.mensagem = 'Salve successfully';
								$scope.status = "alert alert-success";
								formulario.$setPristine();
								formulario.$setUntouched();
								$scope.codigo = {};
								SweetAlert.swal("codigo", "Salvo com sucesso!", "success");
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