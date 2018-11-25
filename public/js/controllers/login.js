angular.module("abcdlacosEternos")
.controller('LoginController',function ($scope, $http, $location,$state, $window, Profile, LoginServices) {
    
  $scope.usuario = {};
  $scope.mensagem = '';
//   $rootScope.usuarioLogado ='';
//   $scope.logado = 'Messias Gonçalves Cardoso';
  
  var urlOrigin = $location.url();
    $scope.autenticar = function() {
			var usuario = $scope.usuario;
			$scope.mensagem ={};
			$http.post('/autentica', usuario)
			.then(function() {
				$http.get("/profile")
					.success(function (profile) {
						var user = profile;
						Profile.setRoles(user.profile);
						sessionStorage.setItem("lacosEternos", JSON.stringify(user));
						$location.path('/dashboard');
					})
					.error(function () {

					});
					// $rootScope.usuarioLogado = usuario.login;          
				}, function() {
					// $scope.usuario = {};
					$scope.mensagem = "User/password Invalid!";
			});
    };//Fim Autenticar
    
    $scope.logout = function() {
			LoginServices.logout()
			.success(function () {
				delete $window.sessionStorage.lacosEternos;
        $location.path('#/login'); 
			})
			.error(function (error) {
					$scope.mensagem = 'Error writing';
					$scope.status = "alert alert-danger";
			});
    };
        
      
    
});
