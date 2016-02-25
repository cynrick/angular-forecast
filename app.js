var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function($routeProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'homeController'
  })

  .when('/forecast', {
    templateUrl: 'pages/forecast.html',
    controller: 'forecastController'
  })

  .when('/forecast/:days', {
    templateUrl: 'pages/forecast.html',
    controller: 'forecastController'
  });

});

weatherApp.service('cityService', function() {

  this.city = "San Francisco, CA";

});

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {

  $scope.city = cityService.city;

  $scope.$watch('city', function() {
    cityService.city = $scope.city;
  });

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {

  $scope.city = cityService.city;

  $scope.days = $routeParams.days || 5;

  $scope.weatherAPI = $resource(weather.API_URL, { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" } });

  $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days, appid: weather.API_KEY });

  console.log($scope.weatherResult);

  $scope.convertToFahrenheit = function(degK) {
    return Math.round((1.8 * (degK - 273)) + 32);
  };

  $scope.convertToDate = function(date) {
    return new Date(date * 1000);
  };

}]);
