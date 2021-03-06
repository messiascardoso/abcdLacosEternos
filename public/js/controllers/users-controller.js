angular.module('abcdlacosEternos').controller('UsersController',
    function ($scope, $http, $stateParams, $location, UserService, ModalAlertService, sharedProperties) {  //$routeParams

        $scope.users = [];
        $scope.filtro = '';
        $scope.mensagem = '';
        sharedProperties.setProperty(false);

        UserService.List()
					.success(function (data) {
							$scope.users = data;
					})
					.error(function (erro) {
							console.log("Erro List");
					});

        // Profile User Partner list
        if ($stateParams.userId) {
					UserService.GetUserPartner()
						.success(function (data) {
							// $scope.offers = data[0].offer;
							$scope.users = data;
						})
						.error(function (erro) {
							console.log("Erro List");
						});
        }

        //Disable User
        $scope.DelUser = function (user) {
					var confirma = confirm("DELETE USER:  \n"+ "\n EMAIL:  "+ user.email+"?");
					if (user._id && confirma) {
						UserService.DelUser(user._id)
							.success(function () {
								var UserList = [];
								UserList = $scope.users.filter(function (element) {
										return user._id != element._id;
								});
								$scope.users = UserList;
							})
							.error(function (erro) {
									ModalAlertService.messageError('lg');
							});
            }
        };












    });