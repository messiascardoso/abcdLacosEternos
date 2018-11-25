


angular.module('abcdlacosEternos', ['ngResource', 'ui.router', 'ui.mask', 'ngFileUpload', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'angular-loading-bar', '720kb.datepicker', 'oitozero.ngSweetAlert', 'ui.utils.masks', 'angucomplete-alt'])

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
                .state('dash.produto', {
                    url: '/produto',
                    templateUrl: 'partials/produto.html',
                    controller: 'ProdutoController'
                })
                .state('dash.produto/:produtoId', {
                    url: '/produto/:produtoId',
                    templateUrl: 'partials/produto.html',
                    controller: 'ProdutoController'
                })
                .state('dash.produtos', {
                    url: '/produtos',
                    templateUrl: 'partials/produtos.html',
                    controller: 'ProdutosController',
                    // resolve: {
                    //     checkRoles: function (RouteAccessService, Profile) {
                    //         return RouteAccessService.checkRoles(Profile.isAdmin());
                    //     }
                    // }
                })
                .state('dash.vendas', {
                    url: '/vendas',
                    templateUrl: 'partials/vendas.html',
                    controller: 'VendasController',
                    
                })
                .state('dash.clientes', {
                    url: '/clientes',
                    templateUrl: 'partials/clientes.html',
                    controller: 'ClientesController',
                    
                })
                .state('dash.cliente', {
                    url: '/cliente',
                    templateUrl: 'partials/cliente.html',
                    controller: 'ClienteController',
                    
                })
                .state('dash.cliente/:clienteId', {
                    url: '/cliente/:clienteId',
                    templateUrl: 'partials/cliente.html',
                    controller: 'ClienteController',
                })
                
                .state('dash.codigos', {
                    url: '/codigos',
                    templateUrl: 'partials/codigos.html',
                    controller: 'CodigosController'
                })
                .state('dash.codigo', {
                        url: '/codigo',
                        templateUrl: 'partials/codigo.html',
                        controller: 'CodigoController',
                })
                .state('dash.codigo/:codigoId', {
                        url: '/codigo/:codigoId',
                        templateUrl: 'partials/codigo.html',
                        controller: 'CodigoController',
                })
                .state('dash.alimentos', {
                    url: '/alimentos',
                    templateUrl: 'partials/alimentos.html',
                    controller: 'AlimentosController',
                    
                })
                .state('dash.alimento', {
                    url: '/alimento',
                    templateUrl: 'partials/alimento.html',
                    controller: 'AlimentoController',
                    
                })
                .state('dash.alimento/:alimentoId', {
                    url: '/alimento/:alimentoId',
                    templateUrl: 'partials/alimento.html',
                    controller: 'AlimentoController',
                    
                })
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
              
            $urlRouterProvider.otherwise('/login');


        }]);

