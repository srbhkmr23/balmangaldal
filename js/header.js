myapp.controller('headerController',function($scope,$rootScope){


	$scope.changeLink=function(linkforchange){
		$scope.homeLink=false;
		$scope.aboutLink=false;
		$scope.galleryLink=false;
		$scope.contactLink=false;
		$scope.chatLink=false;
		$scope[linkforchange]=true;
		
	}

});

myapp.directive('myHeader', function() {

	return{
		restrict: 'E',
		scope:{
			 linkname: "@linkname"
		},
		templateUrl:'../templates/header.html',
		link:function(scope, elem, attrs) {
			
			scope[scope.linkname]=true;
		

		}
	}
});