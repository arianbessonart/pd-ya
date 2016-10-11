angular.module('pd-ya.login', [])
  .controller('loginCtrl', ['pd-ya.authSrv', '$location', '$mdToast', function(authSrv, $location, $mdToast){

    // Success
    this.login = function () {
      var credentials = {
        "username": this.username,
        "password": this.password
      };
      authSrv.login(credentials).then(function (user) {
        $location.path("/");
      }, function (response) {
        if (response.status === 401) {
          message = "Invalid username/password.";
        } else {
          message = "Ooops";
        }
        $mdToast.show(
          $mdToast.simple()
            .textContent(message)
            .position("top right")
            .hideDelay(5000)
        );
      });
    };

  }]);