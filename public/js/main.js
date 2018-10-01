


angular.module('americanExperian', ['ngResource', 'ui.router', 'ui.mask', 'ngFileUpload', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'AdmPartners', 'angular-loading-bar', '720kb.datepicker'])

    .config(['$urlRouterProvider', '$stateProvider', '$httpProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider, Profile, RouteAccessService) {



            /*Desativar autenticacao*/

            $httpProvider.interceptors.push('meuInterceptor');


            $stateProvider


                .state('login', {
                    url: '/login',
                    templateUrl: 'partials/login.html',
                    controller: 'LoginController'
                })

                .state('admin', {
                    url: '/admin',
                    templateUrl: 'partials/login.html',
                    controller: 'LoginController'
                })

                // Layout main
                .state('dash', {
                    url: '',
                    abstract: true,
                    templateUrl: 'partials/layout.html',
                    controller: "PerfilController"
                })

                .state('dashboard', {
                    url: '/dashboard',
                    parent: 'dash',
                    templateUrl: 'partials/dashboard.html',
                    controller : 'DashboardController'
                })


                .state('produto', {
                    url: '/produto',
                    templateUrl: 'partials/upload.html',
                    controller: 'uploadController'
                })

                .state('dash.partner', {
                    url: '/partner',
                    templateUrl: 'partials/partner.html',
                    controller: 'PartnerController'
                })

                .state('dash.partner/:partnerId', {
                    url: '/partner/:partnerId',
                    templateUrl: 'partials/partner.html',
                    controller: 'PartnerController'
                })


                .state('dash.partners', {
                    url: '/partners',
                    templateUrl: 'partials/partners.html',
                    controller: 'PartnersController',
                    resolve: {
                        checkRoles: function (RouteAccessService, Profile) {
                            return RouteAccessService.checkRoles(Profile.isAdmin());
                        }
                    }
                })

                /*  .state('offer', {
                    url: '/offer',
                    templateUrl: 'partials/partner-offer-tab.html',
                    controller : 'OfferController'
                })*/

                //Depende do ID Partner    
                .state('dash.offer/:offerId', {
                    url: '/offer/:offerId',
                    templateUrl: 'partials/partner-offer-tab.html',
                    controller: 'OfferController'
                })


                //depende do ID do partner 
                .state('dash.offers', {
                    url: '/offers/:partnerId',
                    templateUrl: 'partials/partner-offer-list.html',
                    controller: 'OffersController'
                })

                // Vouchers
                .state('dash.vouchersgenerated', {
                    url: '/vouchersgenerated',
                    templateUrl: 'partials/vouchers-generated.html',
                    controller: 'vouchersController'
                })


                .state('dash.vouchersvalidate', {
                    url: '/vouchersvalidate',
                    templateUrl: 'partials/voucher-validate.html',
                    controller: 'VoucherController'
                })

                .state('dash.vouchersvalidated', {
                    url: '/vouchersvalidated',
                    templateUrl: 'partials/vouchers-validated.html',
                    controller: 'vouchersValidatedController'
                })

                // Administrative Routes
                .state('user', {
                    url: '/user',
                    parent: 'dash',
                    templateUrl: 'partials/usernew.html',
                    controller: 'UserController'

                })

                .state('user/:userId', {
                    url: '/user/:userId',
                    parent: 'dash',
                    templateUrl: 'partials/user.html',
                    controller: 'UserController'

                })

                .state('users', {
                    url: '/users',
                    parent: 'dash',
                    templateUrl: 'partials/users.html',
                    controller: 'UsersController',
                    resolve: {
                        checkRoles: function (RouteAccessService, Profile) {
                            return RouteAccessService.checkRoles(Profile.isAdmin());
                        }
                    }
                })
                // Lista Profile Partner
                .state('/userspartners/:userId', {
                    url: '/userspartners/:userId',
                    parent: 'dash',
                    templateUrl: 'partials/user.html',
                    controller: 'UserController'

                });


            // dashboard Verificar





            // Layout main
            /*  .state('parceiro', {
                  url: '/parceiro',
                  parent: 'dash',
                  templateUrl: 'partials/parceiro.html',
                  // controller : 'mapsController'
              })*/

            /* .state('parceiros', {
                url: '/parceiros',
                parent: 'dash',
                templateUrl: 'partials/parceiros.html',
                // controller : 'mapsController'
            })*/
            /* .state('category', {
                 url: '/category',
                 parent: 'dash',
                 templateUrl: 'partials/category.html',
                 // controller : 'mapsController'
             })*/

            /*  .state('categories', {
                 url: '/categories',
                 parent: 'dash',
                 templateUrl: 'partials/categories.html',
                 // controller : 'mapsController'
             })*/
            // Layout main
            /* .state('cupon', {
                 url: '/cupon',
                 parent: 'dash',
                 templateUrl: 'partials/cupon.html',
                 // controller : 'mapsController'
             })*/

            /* .state('cupons', {
                url: '/cupons',
                parent: 'dash',
                templateUrl: 'partials/cupons.html',
                // controller : 'mapsController'
            })*/
            // Layout main
            /* .state('user', {
                 url: '/user',
                 parent: 'dash',
                 templateUrl: 'partials/user.html',
                 // controller : 'mapsController'
             })*/
            // Layout main
            /*  .state('users', {
                  url: '/users',
                  parent: 'dash',
                  templateUrl: 'partials/users.html',
                  // controller : 'mapsController'
              })*/

            /*    .state('company', {
                   url: '/company',
                   parent: 'dash',
                   templateUrl: 'partials/company.html',
                   // controller : 'mapsController'
               })*/
            /*  .state('companies', {
                  url: '/companies',
                  parent: 'dash',
                  templateUrl: 'partials/companies.html',
                  // controller : 'mapsController'
              })*/

            /* .state('maps', {
                 url: '/maps',
                templateUrl: 'partials/maps.html',
                controller : 'mapsController'
             }) */



            $urlRouterProvider.otherwise('/login');


        }]);

