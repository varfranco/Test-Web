// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute', 'ui.bootstrap']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'src/views/login.html',
            controller: 'loginController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angularRoutingApp.controller('loginController', function($scope, $uibModal) {
    $scope.submitForm = function() {
        //verficar error
        $scope.error = false;
        $scope.errorData = ""
        if (angular.isUndefined($scope.userForm.type)) {
            $scope.error = true;
            $scope.errorData = "Seleccione un Tipo de Usuario";
        } else if (angular.isUndefined($scope.userForm.username)) {
            $scope.error = true;
            $scope.errorData = "Ingrese un Usuario";
        } else if (angular.isUndefined($scope.userForm.password)) {
            $scope.error = true;
            $scope.errorData = "Ingrese una Contraseña";
        }

        if ($scope.error === true) {
            // open the modal
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'src/views/error.html',
                controller: 'ModalInstanceCtrl',
                size: 'sm',
                resolve: {
                    data: function() {
                        return $scope.errorData;
                    }
                }
            });
        }
    };

    $scope.enviar = function() {
        alert("recuperar contraseña");
    }
});


angularRoutingApp.controller('ModalInstanceCtrl', function($scope, $uibModalInstance, data) {
    $scope.data = data;
    $scope.ok = function() {
        $uibModalInstance.close();
    };
});