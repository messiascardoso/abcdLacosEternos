angular.module('abcdlacosEternos').controller('CodigosController',
    function ($scope, $stateParams, Profile, CodigoServices, SweetAlert) {  //$routeParams

        $scope.codigos = [];
        $scope.filtro = '';
        $scope.mensagem = '';
        $scope.profile = Profile;

        CodigoServices.list()
					.success(function (data) {
							$scope.codigos = data;
							console.log('codigos',$scope.codigos )
					})
					.error(function (erro) {
							console.log("Erro List");
					});

      
        if ($stateParams.userId) {
					CodigoServices.get()
						.success(function (data) {
							$scope.codigos = data;
						})
						.error(function (erro) {
							console.log("Erro List");
						});
        }

        
        $scope.deletar = function (codigo) {
					if (codigo._id) {
						swal({
							title: "Certeza que deseja deletar?" ,
							text: codigo.codigo,
							icon: "warning",
							buttons: true,
							dangerMode: true,
						})
						.then( function (btnResult){
							if (btnResult) {
								CodigoServices.del(codigo._id)
									.success(function () {
										var codigos = [];
										codigos = $scope.codigos.filter(function (element) {
												return codigo._id != element._id;
										});
										swal("Codigo", "Deletado com sucesso!", "success");
										$scope.codigos = codigos;
									})		
									.error(function (erro) {
										swal("Codigo", "Error ao deletar!", "info");
									});
							} 
						});	
					}		
				}		

});