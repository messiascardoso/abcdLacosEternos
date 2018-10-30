angular.module('abcdlacosEternos').controller('ClientesController',
    function ($scope, $stateParams, $location, Profile, ClienteServices) {  //$routeParams

        $scope.clientes = [];
        $scope.filtro = '';
        $scope.mensagem = '';
        $scope.profile = Profile;

        ClienteServices.list()
					.success(function (data) {
							$scope.clientes = data;
							console.log('clientes',$scope.clientes )
					})
					.error(function (erro) {
							console.log("Erro List");
					});

      
        if ($stateParams.userId) {
					ClienteServices.get()
						.success(function (data) {
							$scope.clientes = data;
						})
						.error(function (erro) {
							console.log("Erro List");
						});
        }

        //Disable produto
        $scope.deletar = function (produto) {
					var confirma = confirm("Deletar produto ?:  \n"+ "\n  "+ produto.name);
					if (produto._id && confirma) {
						ClienteServices.del(produto._id)
							.success(function () {
								var clientes = [];
								clientes = $scope.clientes.filter(function (element) {
										return produto._id != element._id;
								});
								$scope.clientes = clientes;
							})		
							.error(function (erro) {
									ModalAlertService.messageError('lg');
							});
            }
        };


});