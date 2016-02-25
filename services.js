weatherApp.service('cityService', function() {

  this.city = "";

});

weatherApp.service('weatherService', ['$resource', function($resource) {
  this.GetWeather = function(city, days) {
    var weatherAPI = $resource(weather.API_URL, { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" } });

    return weatherAPI.get({ q: city, cnt: days, appid: weather.API_KEY });
  };
}]);
