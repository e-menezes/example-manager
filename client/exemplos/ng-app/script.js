angular.module('myApp', [])
  .controller('myController', ['$scope', function($scope) {
    $scope.titulo = 'Meu primeiro App';
    $scope.subtitulo = 'Olá Mundo';
    $scope.saudacao = 'Olá mundo, esse é meu primeiro App';
  }]);
