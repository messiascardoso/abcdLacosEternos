angular.module('abcdlacosEternos').controller('VendasController',
    function ($scope, $stateParams, $location, Profile, ProdutoServices) {  //$routeParams

				$scope.produtos = [];
				$scope.produtoSelected = {};
				$scope.produto = { quantProd: 1 };
				$scope.totalGeral = 0;
				$scope.cestaProdutos = [];
        $scope.filtro = '';
        $scope.mensagem = '';
        $scope.profile = Profile;

        ProdutoServices.list()
					.success(function (data) {
							$scope.produtos = data;
							console.log('produtos',$scope.produtos )
					})
					.error(function (erro) {
							console.log("Erro List");
					});

      
        if ($stateParams.userId) {
					ProdutoServices.get()
						.success(function (data) {
							$scope.produtos = data;
						})
						.error(function (erro) {
							console.log("Erro List");
						});
				}
				
				$scope.addProduto = function (produto) {
					console.log("produto", produto);
					produto["quantProd"] = $scope.produto.quantProd;
					produto["totalItemQtde"] = produto.price * produto.quantProd;
					$scope.cestaProdutos.push( produto );
					totalGeral();
				}

				function totalGeral() {
					$scope.cestaProdutos.forEach( function(item) {
						$scope.totalGeral += item.totalItemQtde;
					});
					console.log('$scope.totalGeral', $scope.totalGeral);
				}





        //Disable produto
        $scope.deletar = function (produto) {
					var confirma = confirm("Deletar produto ?:  \n"+ "\n  "+ produto.name);
					if (produto._id && confirma) {
						ProdutoServices.del(produto._id)
							.success(function () {
								var produtos = [];
								produtos = $scope.produtos.filter(function (element) {
										return produto._id != element._id;
								});
								$scope.produtos = produtos;
							})
							.error(function (erro) {
									ModalAlertService.messageError('lg');
							});
            }
        };


    });