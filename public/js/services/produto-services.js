angular.module('abcdlacosEternos').service('ProdutoServices', function ($http) {

    this.list = function () {
      return $http.get("/product");
    };

    this.save = function (produto) {
      return $http.post("/product",produto);
    };

    this.update = function (produtoId, produto) {
      return $http.put("/product/"+ produtoId, produto);
    };

    this.get = function (produtoId) {
      return $http.get("/product/"+ produtoId);
    };

    this.del = function (produtoId) {
      return $http.delete("/product/"+ produtoId);
    };

    


   





});