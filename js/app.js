var myapp = angular.module('myapp', ["ui.router"]);

myapp.config(function($stateProvider, $urlRouterProvider){
  
  // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise("/home");
  
  $stateProvider
    .state('home', {
        url: "/home",
        templateUrl: "../templates/home.html",
        controller: function($scope){
          $().UItoTop({ easingType: 'easeOutQuart' });
        }        
    })

    .state('about', {
        url: "/about",
        templateUrl: "../templates/about.html",
        controller: function($scope){
          
        }
    })
      
    .state('gallery', {
        url: "/gallery",
        templateUrl: "../templates/gallery.html"
    })

    .state('contact', {
        url: "/contact",
        templateUrl: "../templates/contact.html"
    })
});
