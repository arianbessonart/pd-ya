angular.module('pd-ya')
  .controller('findMapCtrl', ['$window', 'pd-ya.restaurantSrv', '$mdToast', 'pd-ya.urls', 'geolocation', function($window, restaurantSrv, $mdToast, urls, geolocation) {

    var baseImgUrl = urls.baseImg;
    var baseProfileUrl = urls.baseProfile;
    this.pages = 0;
    this.currentPage = 0;
    this.sizePage = 20;
    this.point = null;
    this.loading = false;
    this.center = [-34.9200968,-56.1508075];
    this.zoom = 14;
    this.restaurants = [];
    var self = this;


    this.findPlaces = function(point) {
      if (point) {
        self.point = point;
        self.center = pointToCoordinates(point);
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

    geolocation.getLocation().then(function(data){
      this.loading = true;
      self.center = [data.coords.latitude, data.coords.longitude];
      self.point = coordinatesToPoint(self.center);
      getData();
    });


    // FIXME: api return the total count of restaurant but someones are closed, this breaks the pagination.
    function getData() {
      if (self.point) {
        restaurantSrv.findByPoint(self.point, self.sizePage, self.currentPage).then(function(response) {
          var restaurantData = [];
          self.pages = Math.ceil(response.total/self.sizePage);
          var iterRestaurants = response.data;
          iterRestaurants.forEach(function(value) {
            if (value.opened === 1) {
              value.logoUrl = baseImgUrl + value.logo;
              value.profileUrl = baseProfileUrl;
              value.profileUrl = value.profileUrl.replace("{LINK}", value.link);
              value.coordinateX = pointToCoordinates(value.coordinates)[0];
              value.coordinateY = pointToCoordinates(value.coordinates)[1];
              restaurantData.push(value);
            }
          });
          self.restaurants = restaurantData;
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
      }

    }

    function pointToCoordinates(point) {
      return point.split(',');
    }

    function coordinatesToPoint(coords) {
      return coords[0] + ',' +coords[1];
    }

  }]);