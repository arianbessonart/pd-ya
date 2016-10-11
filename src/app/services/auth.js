angular.module('pd-ya')
  .service('pd-ya.authSrv', ['$http', '$rootScope', '$cookies', '$sessionStorage', 'pd-ya.urls', function($http, rootScope, cookies, $sessionStorage, urls) {

    var baseUrl = urls.baseApi + "/api/v1/auth/";

    var user = null;
    var self = this;

    var sanitizeCredentials = function(credentials) {
      return {
        username: credentials.username,
        password: credentials.password
      };
    };

    this.getAuthenticatedUser = function () {
      if (user) {
        return user;
      } else {
        return $sessionStorage.user;
      }
    };

    this.login = function(credentials) {
      var promise = $http.post(baseUrl+'login', sanitizeCredentials(credentials)).success(function(data, status, headers, config) {
        if (status === 200) {
          user = data.user;
          $sessionStorage.user = user;
          $sessionStorage.isLogged = true;
          $sessionStorage.token = data.token;
        }
        return data;
      });
      return promise;
    };

    this.logout = function () {
      var token = $sessionStorage.token;
      $http.post(baseUrl+'logout', {}, {headers: {"Authorization": token}});
      user = null;
      delete $sessionStorage.user;
      $sessionStorage.isLogged = false;
    };

  }]);