angular.module('abcdlacosEternos').controller('ClientesController',
    function ($scope, $stateParams, $location, Profile, ClienteServices, SweetAlert) {  //$routeParams

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

        //Disable cliente
        $scope.deletar = function (cliente) {
					swal({
						title: "Certeza que deseja deletar?" ,
						text: cliente.name,
						icon: "warning",
						buttons: true,
						dangerMode: true,
					})
					.then( function (btnResult){
						if (btnResult) {
							if (cliente._id) {
								ClienteServices.del(cliente._id)
								.success(function () {
									var clientes = [];
									clientes = $scope.clientes.filter(function (element) {
										return cliente._id != element._id;
									 });
									 $scope.clientes = clientes;
									 swal("Cliente", "Deletado com sucesso!", "success");
									 })		
									 .error(function (erro) {
											 ModalAlertService.messageError('lg');
									 });
							 }
							// swal("Cliente deletado com sucesso!", {
							// 	icon: "success",
							// });
						} 
					});
				
				



					// var confirma = confirm("Deletar produto ?:  \n"+ "\n  "+ produto.name);
        };


});