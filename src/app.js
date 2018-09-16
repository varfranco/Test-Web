var app = angular.module("myApp", ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
	.when('/timelines', {
			templateUrl: '../src/timelines.html'
		})
		.when('/', {
			templateUrl: '../src/login.html'
		})
		.otherwise({
			redirectTo: '/'
		})
});

app.controller("timeline", function($scope, $rootScope, $http, $location) {
	var url = "https://prueba-admision-web.herokuapp.com/data?cid=" + $rootScope.cid;
	$http.get(url)
	.then(function (response){
		$scope.data = response.data;
	}, function (response) {
		swal("Error en el servidor", "Presione el botón!", "error");
		$location.path('/');
	});

app.controller("login", function($scope, $http, $rootScope, $location) {

	$scope.submit = function() {

		if($scope.type=="undefined" || $scope.type=="" || $scope.type==null){
			swal("Seleccione el tipo!", "Presione  el botón!", "warning");
		}else if($scope.user=="undefined" || $scope.user=="" || $scope.user==null){ 
		swal("Ingrese el usuario!", "Presione el botón!", "warning");

		}else if($scope.password=="undefined" || $scope.password=="" || $scope.password==null){
			swal("Ingrese la contraseña!", "Haga clic en el botón!", "warning");
		}else{
		var json = { "username": $scope.user, "password": $scope.password, "type": $scope.type };
		$http.post("https://prueba-admision-web.herokuapp.com/session", JSON.stringify(json))
		.then(function (response) {
			$rootScope.cid = response.data.cid;
			$location.path('/timelines');
		}, function (response) {
			swal("Los datos son invalidos!", "Presione en el botón!", "error");
		});
	}
	}
});
});
