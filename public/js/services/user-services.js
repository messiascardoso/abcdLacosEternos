angular.module('abcdlacosEternos').service('UserService', function ($http) {
    


    /*Offer Id get*/
    this.List = function () {
        return $http.get("/users");

    };

    this.SaveUser = function (user) {
        return $http.post("/user",user);

    };

    this.UpdateUser = function (userId, user) {
        return $http.put("/user/"+ userId, user);

    };

    this.GetUser = function (userId) {
        return $http.get("/user/"+ userId);

    };

    this.GetUserPartner = function (userId) {
        return $http.get("/userspartners/"+ userId);

    };

     this.DelUser = function (userId) {
        return $http.delete("/user/"+ userId);

    };

    


   





});