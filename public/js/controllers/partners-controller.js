angular.module('americanExperian').controller('PartnersController',
    function ($scope, $stateParams, $location, recursoPartner, Profile) {  //$routeParams

        $scope.partners = [];
        $scope.filtro = '';
        $scope.mensagem = '';
        $scope.profile = Profile;

        // List Partners
        recursoPartner.query(function (partners) {
            $scope.partners = partners;
        }, function (erro) {
            
        });

        // Remove Partner
        $scope.remover = function (partner) {
             

            recursoPartner.delete({ partnerId: partner._id }, function () {
                
                var indiceDoPartner = $scope.partners.indexOf(partner);
                $scope.partners.splice(indiceDoPartner, 1);
                $scope.mensagem = 'Partners ' + partner.name + ' removido com sucesso!';
            }, function (erro) {
                
                $scope.mensagem = 'Não foi possível apagar o parceiro ' + partner.name;
            });
        };


    });