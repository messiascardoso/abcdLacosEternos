angular.module("americanExperian")
.controller('LoginController',function ($rootScope,$scope, $http, $location,$state, $window, Profile) {
    
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
                    sessionStorage.setItem("Togo", JSON.stringify(user));
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
        
	    delete $window.sessionStorage.token;
        $location.path('#/login');  
    };
        
      
    
});
