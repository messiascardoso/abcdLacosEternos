angular.module('abcdlacosEternos').service('ClienteServices', function ($http) {

    this.list = function () {
      return $http.get("/clientes");
    };

    this.save = function (cliente) {
      return $http.post("/clientes",cliente);
    };

    this.update = function (clienteId, cliente) {
      return $http.put("/clientes/"+ clienteId, cliente);
    };

    this.get = function (clienteId) {
      return $http.get("/clientes/"+ clienteId);
    };

    this.del = function (clienteId) {
      return $http.delete("/clientes/"+ clienteId);
    };

    


   





});