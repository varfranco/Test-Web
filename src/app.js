function showAlertRC() {
    alert("Recuperar Contraseña");
}

function successLogin(){
  alert("Usuario ha iniciado sesion")
}

function errorLogin(){
  alert("Error 401. Datos invalidos")
}

function erroData(){
  alert("Ha ocurrido un error trayendo los datos") 
}

var app = angular.module("myApp",['ngCookies','ngRoute']);

app.config( function ($routeProvider){
    $routeProvider 
      .when('/',{
        templateUrl : '../src/login.html',
      })
      .when('/timeline',{
          templateUrl : '../src/timeline.html',
      });

});



app.controller('login-controller',function($scope, $http,$cookies,$location){
  $scope.tipoError = function(){
          if ($scope.tipo){
            return false;
          }else{
            return true;
          }

    }

    $scope.userError = function(){
          if (($scope.tipo) && !($scope.username) ){
            return true;
          }else{
            return false;
          }

    }

    $scope.passwordError = function(){
        if (($scope.tipo) && ($scope.username)){
          return true;
        }else {
          return false;
        }

    }
    $scope.submitForm = function(){
      if (($scope.username) && ($scope.password) && ($scope.tipo)){  
          var user = {
            username: $scope.username,
            password: $scope.password,
            type: $scope.tipo
          }
          console.log(user)
          var config = {
              headers : {
                'Content-Type' : 'application/json'
              }
          }
          $http({
              method : 'POST',
              url    : 'https://prueba-admision-web.herokuapp.com/session',
              data   : user,
              headers : { 'Content-Type': 'application/json' }
          }).then(function(response){              
              successLogin();
              $cookies.put('cid',response.data.cid)
              $location.path('/timeline');
          }, function(response){
              console.log(response)
              errorLogin();
          });
      }else{
        $(document).ready(function(){
          $("#error").modal();
        })
      }  
    };
});

app.controller('timeline-controller', function($scope, $http,$cookies){
        

    $scope.init = function(){
        $http({
              method : 'GET',
              url    : 'https://prueba-admision-web.herokuapp.com/data?cid='+ $cookies.get('cid'),
          }).then(function(response){              
              console.log(response)
              $scope.datos = response.data;
          }, function(response){
              console.log(response)
              errorData();
        });
    }
    $scope.init();
});