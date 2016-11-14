(function(){
    
    var detailApp=angular.module("detailApp",["serviceApp"]);
    detailApp.config(["$routeProvider",function($routeProvider){
          $routeProvider.when("/detail/:movieID",{
          	templateUrl:"detail/detail.html",
          	controller:"detailControl"
          })
    }])
    detailApp.controller("detailControl",["$scope","serviceControl","$rootScope" ,"$routeParams",
    	function($scope,$service,$rootScope,$routeParams){
    		$scope.loading=false;
        // $rootScope.rootStatus=$routeParams.detail;
          $service.jsonp("https://api.douban.com/v2/movie/subject/"+$routeParams.movieID,
          	{},function(data){
                    $scope.loading=true;
                    $scope.movie=data;
                    $scope.$apply();

          })
    }])
})()