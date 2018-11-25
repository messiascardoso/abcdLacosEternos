angular.module('abcdlacosEternos').service('LoginServices', function ($http) {
    
  this.logout = function () {
    return $http.get("/logout");
  };

  this.login = function ( usuario ) {
    return $http.post("/autentica",usuario);
  };

});