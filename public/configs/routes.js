var tubeKaraApp = angular.module('TubeKara', []);

tubeKaraApp
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'main.html',
      controller: 'MainCtrl'
    })
    .otherwise({redirecTo: '/'});
}]);