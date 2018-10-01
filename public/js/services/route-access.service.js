angular.module('americanExperian')
    .service('RouteAccessService',function () {

         this.checkRoles = function(access) {
        if (!access) {
            $location.path('/');
        }
    };


});