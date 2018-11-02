angular.module('abcdlacosEternos').service('AlimentoServices', function ($http) {

    this.list = function () {
      return $http.get("/alimentos");
    };

    this.save = function (alimento) {
      return $http.post("/alimentos",alimento);
    };

    this.update = function (alimentoId, alimento) {
      return $http.put("/alimentos/"+ alimentoId, alimento);
    };

    this.get = function (alimentoId) {
      return $http.get("/alimentos/"+ alimentoId);
    };

    this.del = function (alimentoId) {
      return $http.delete("/alimentos/"+ alimentoId);
    };

    


   





});