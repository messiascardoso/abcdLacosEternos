angular.module('americanExperian').controller('UserController',
    function ($scope, $http, $stateParams, $location, UserService, ModalAlertService, Profile) {  //$routeParams

        $scope.user = {};
        $scope.mensagem = '';
         //Recebe funcao de validaçao de profile 
        $scope.profile = Profile;


        //Get Partner ID

        if ($stateParams.userId) {
            UserService.GetUser($stateParams.userId)

                .success(function (user) {
                    $scope.user = user;

                })
                .error(function (error) {
                    $scope.mensagem = 'Error writing';
                    $scope.status = "alert alert-danger";

                });
        }


        //Salva usuario ou Update
        $scope.submeter = function () {

        if ($scope.user._id) {

                UserService.UpdateUser($stateParams.userId, $scope.user )

                    .success(function () {
                        $scope.user = {};
        				ModalAlertService.open('lg');

                    })
                    .error(function (error) {
                        $scope.mensagem = 'Error writing';
                        $scope.status = "alert alert-danger";

                    });

            } else {

                UserService.SaveUser($scope.user)
                    .success(function (retorno) {
                        $scope.mensagem = 'Salve successfully';
                        $scope.status = "alert alert-success";
                        $scope.user = {};

                        // $scope.users.push(user);
                        // Lista de users
                        

                    })
                    .error(function (erro) {
                        $scope.mensagem = 'Error writing';
                        $scope.status = "alert alert-danger";
                    });

            }

        };











    });