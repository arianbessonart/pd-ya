angular.module('pd-ya')
  .controller('headerCtrl', ['pd-ya.authSrv', '$location', function(authSrv, $location){

    this.user = authSrv.getAuthenticatedUser();

    this.displayName = this.user.name + " " + this.user.lastName;

    this.logout = function () {
      authSrv.logout();
      $location.path("/login");
    };

  }]);


