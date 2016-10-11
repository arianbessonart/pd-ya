angular.module('pd-ya.home', [])
.controller('homeCtrl', ['$window', 'pd-ya.restaurantSrv', '$mdToast', 'pd-ya.urls', function($window, restaurantSrv, $mdToast, urls) {

  var baseImgUrl = urls.baseImg;
  var baseProfileUrl = urls.baseProfile;
  this.pages = 0;
  this.currentPage = 0;
  this.sizePage = 20;
  this.point = null;
  this.loading = false;
  var self = this;


  this.findPlaces = function(point) {
    if (point) {
      self.point = point;
      self.loading = true;
      getData();
    }
  };

  this.goTo = function (url) {
    $window.open(url, '_blank');
  };


  this.onPageChanged = function () {
    if (self.point) {
      getData();
    }
  };


  // FIXME: api return the total count of restaurant but someones are closed, this breaks the pagination.
  var getData = function () {
    restaurantSrv.findByPoint(self.point, self.sizePage, self.currentPage).then(function(response) {
        self.restaurants = [];
        self.pages = Math.ceil(response.total/self.sizePage);
        var iterRestaurants = response.data;
        iterRestaurants.forEach(function(value) {
          if (value.opened === 1) {
            value.logoUrl = baseImgUrl + value.logo;
            value.profileUrl = baseProfileUrl;
            value.profileUrl = value.profileUrl.replace("{LINK}", value.link);
            self.restaurants.push(value);
          }
        });
        self.loading = false;
    }).catch(function(error) {
      $mdToast.show(
        $mdToast.simple()
          .textContent("Oops something go wrong")
          .position("top right")
          .hideDelay(5000)
      );
      self.loading = false;
    });
  };

}]);