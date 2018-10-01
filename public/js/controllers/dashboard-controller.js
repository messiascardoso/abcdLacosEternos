angular.module('americanExperian').controller('DashboardController',
    function ($scope, $http, $stateParams, $location, UserService, ModalAlertService, Profile, DashboardService) {  //$routeParams

        $scope.user = {};
        $scope.mensagem = '';
        //Recebe funcao de validaçao de profile 
        $scope.profile = Profile;

        $scope.partnerExpiredVouchers = 0;
        $scope.partnerTotalVouchersValided = 0;
        $scope.voucherPartnerGenerated = 0;
        $scope.PartnerTotalVouchers = 0;

        $scope.admVouchersValided = 0;
        $scope.admTotalOffers = 0;
        $scope.admGenerated = 0;
        $scope.admExpiredVouchers = 0;




        //Get profile gravado no SessionStorage
        var userTogo = JSON.parse(sessionStorage.getItem("Togo"));

        if (userTogo.profile == "ADMIN") {

            DashboardService.VoucherAdmGenerated()

                .success(function (vouchers) {
                    if (vouchers.length > 0) {
                        $scope.admGenerated = vouchers[0].count;
                    }
                })
                .error(function (error) {
                    $scope.mensagem = 'Error writing';
                    $scope.status = "alert alert-danger";

                });


            DashboardService.AdmTotalOffers()

                .success(function (offers) {
                    console.log(offers);
                    if (offers.length > 0) {
                        $scope.admTotalOffers = offers[0].count;
                    }

                })
                .error(function (error) {
                    $scope.mensagem = 'Error writing';
                    $scope.status = "alert alert-danger";

                });


            DashboardService.AdmVouchersValided()

                .success(function (vouchers) {
                    if (vouchers.length > 0) {
                        $scope.admVouchersValided = vouchers[0].count;
                    }
                })
                .error(function (error) {
                    $scope.mensagem = 'Error writing';
                    $scope.status = "alert alert-danger";

                });

            DashboardService.AdmExpiredVouchers()

                .success(function (vouchers) {
                    if (vouchers.length > 0) {
                        $scope.admExpiredVouchers = vouchers[0].count;
                    }
                })
                .error(function (error) {
                    $scope.mensagem = 'Error writing';
                    $scope.status = "alert alert-danger";

                });

        } else {

            //Partner vouchers Generated
            DashboardService.VoucherPartnerGenerated(userTogo.partner_id)

                .success(function (vouchers) {
                    if (vouchers.length > 0) {
                        $scope.voucherPartnerGenerated = vouchers[0].count;
                        console.log( $scope.voucherPartnerGenerated);
                    }
                })
                .error(function (error) {
                    $scope.mensagem = 'Error writing';
                    $scope.status = "alert alert-danger";

                });


            //Partner vouchers Valided
            DashboardService.PartnerTotalVouchersValided(userTogo.partner_id)
                .success(function (vouchers) {
                    if (vouchers.length > 0) {
                        $scope.partnerTotalVouchersValided = vouchers[0].count;
                    }
                })
                .error(function (error) {
                    $scope.mensagem = 'Error writing';
                    $scope.status = "alert alert-danger";

                });

            //Partner Voucher expired  
            DashboardService.PartnerExpiredVouchers(userTogo.partner_id)
                .success(function (vouchers) {
                    if (vouchers.length > 0) {
                        $scope.partnerExpiredVouchers = vouchers[0].count;
                    }
                })
                .error(function (error) {
                    $scope.mensagem = 'Error writing';
                    $scope.status = "alert alert-danger";

                });

            // Partner total offers 
            DashboardService.PartnerTotalOffers(userTogo.partner_id)
                .success(function (vouchers) {
                    if (vouchers.length > 0) {
                        $scope.PartnerTotalVouchers = vouchers[0].count;
                    }
                })
                .error(function (error) {
                    $scope.mensagem = 'Error writing';
                    $scope.status = "alert alert-danger";

                });








        }//Fim IF















    });