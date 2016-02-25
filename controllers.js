weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {

  $scope.city = cityService.city;

  $scope.$watch('city', function() {
    cityService.city = $scope.city;
  });

  $scope.submit = function() {
    $location.path("/forecast");
  };

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {

  $scope.city = cityService.city;

  $scope.days = $routeParams.days || '3';

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
