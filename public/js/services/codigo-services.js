angular.module('abcdlacosEternos').service('CodigoServices', function ($http) {
    console.log("this", this);
    this.list = function () {
      return $http.get("/codigos");
    };

    this.save = function (codigo) {
      return $http.post("/codigos",codigo);
    };

    this.update = function (codigoId, codigo) {
      return $http.put("/codigos/"+ codigoId, codigo);
    };

    this.get = function (codigoId) {
      return $http.get("/codigos/"+ codigoId);
    };

    this.del = function (codigoId) {
      return $http.delete("/codigos/"+ codigoId);
    };

    


   





});