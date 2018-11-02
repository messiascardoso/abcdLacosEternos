angular.module('abcdlacosEternos').controller('AlimentosController',
    function ($scope, $stateParams, $location, Profile, AlimentoServices) {  //$routeParams

        $scope.alimentos = [];
        $scope.filtro = '';
        $scope.mensagem = '';
        $scope.profile = Profile;

        AlimentoServices.list()
					.success(function (data) {
							$scope.alimentos = data;
							console.log('alimentos',$scope.alimentos )
					})
					.error(function (erro) {
							console.log("Erro List");
					});

      
        if ($stateParams.userId) {
					AlimentoServices.get()
						.success(function (data) {
							$scope.alimentos = data;
						})
						.error(function (erro) {
							console.log("Erro List");
						});
        }

        //Disable alimento
        $scope.deletar = function (alimento) {
					var confirma = confirm("Deletar alimento ?:  \n"+ "\n  "+ alimento.name);
					if (alimento._id && confirma) {
						AlimentoServices.del(alimento._id)
							.success(function () {
								var alimentos = [];
								alimentos = $scope.alimentos.filter(function (element) {
										return alimento._id != element._id;
								});
								$scope.alimentos = alimentos;
							})		
							.error(function (erro) {
									ModalAlertService.messageError('lg');
							});
            }
        };


});