// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute', 'ui.bootstrap']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'src/views/login.html',
            controller: 'loginController'
        })
        .when('/timeline', {
            templateUrl: 'src/views/timeline.html',
            controller: 'timelineController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

// Controladores
angularRoutingApp.controller('loginController', function($scope, $uibModal, $http, $location, $rootScope) {
    $('body').addClass('body-index');

    $scope.submitForm = function() {
        //verficar error
        $scope.error = false;
        $scope.errorData = ""
        if (angular.isUndefined($scope.loginForm.type)) {
            $scope.error = true;
            $scope.errorData = "Seleccione un Tipo de Usuario";
        } else if (angular.isUndefined($scope.loginForm.username)) {
            $scope.error = true;
            $scope.errorData = "Ingrese un Usuario";
        } else if (angular.isUndefined($scope.loginForm.password)) {
            $scope.error = true;
            $scope.errorData = "Ingrese una Contraseña";
        }

        if ($scope.error === true) {
            // abrir el modal
            $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'src/views/error.html',
                controller: 'modalController',
                size: 'sm',
                resolve: {
                    data: function() {
                        return $scope.errorData;
                    }
                }
            });
        } else {
            $http({
                url: 'https://prueba-admision-web.herokuapp.com/session',
                method: 'post',
                data: {
                    "username": $scope.loginForm.username,
                    "password": $scope.loginForm.password,
                    "type": $scope.loginForm.type
                },
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(function(res) {
                $rootScope.cid = res.data.cid;
                $location.path('/timeline');
            }, function(res) {
                if (res.status === 400) {
                    alert('Verifique su usuario y contraseña')
                }
            });
        }
    };

    $scope.enviar = function() {
        alert("recuperar contraseña");
    }
});


angularRoutingApp.controller('modalController', function($scope, $uibModalInstance, data) {
    $scope.data = data;
    $scope.ok = function() {
        $uibModalInstance.close();
    };
});

angularRoutingApp.controller('timelineController', function($scope, $http, $rootScope) {
    $('body').removeClass('body-index');

    $scope.timelines = "";

    $http({
        url: 'https://prueba-admision-web.herokuapp.com/data?cid=' + $rootScope.cid,
        method: 'get'
    }).then(function(res) {
        $scope.timelines = res.data;
    }, function(res) {
        if (res.status === 400) {
            alert('error timeline')
        }
    });
});