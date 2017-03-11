myapp.controller('indexcontroller', function($scope,$rootScope) {
 $scope.isRouteLoading = false;

 
});


myapp.directive('routeLoadingIndicator', function($rootScope) {
  return {
    restrict: 'E',
    template: "<div class='col-lg-12' ng-if='isRouteLoading'><h1>Loading <i class='fa fa-cog fa-spin'></i></h1></div>",
    link:function(scope, elem, attrs) {
        scope.isRouteLoading = false;
        
        $rootScope.$on('$stateChangeStart', function() {
          scope.isRouteLoading = true;
        
        });

        $rootScope.$on('$stateChangeSuccess', function() {
            scope.isRouteLoading = false;

        });
      }
  };
});