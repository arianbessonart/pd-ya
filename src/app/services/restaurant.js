angular.module('pd-ya')
  .service('pd-ya.restaurantSrv', ['$http', '$sessionStorage', 'pd-ya.urls', function($http, $sessionStorage, urls) {

    var baseUrl = urls.baseApi + "/api/v1/restaurants/";

    this.findByPoint = function(point, sizePage, page) {
      var token = $sessionStorage.token;
      var promise = $http.get(baseUrl+'find?point='+point+'&limit='+sizePage+'&offset='+page, {headers: {"Authorization": token}}).then(function(response, status) {
        return response.data;
      });
      return promise;
    };

  }]);