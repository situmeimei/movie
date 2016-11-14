(function(){
    var hotApp=angular.module("hotApp",["serviceApp"]);
    hotApp.controller("hotControl",["$scope","serviceControl","$routeParams","$rootScope","$route",
    	function($scope,$service,$routeParams,$rootScope,$route){
          $rootScope.rootStatus=$routeParams.status;
          $scope.status=$routeParams.status;
          $scope.filmOnTime=$service.movie($routeParams.status);
          $scope.page=parseInt($routeParams.page||1);
          var count=12;
          var start=($scope.page-1)*count;    
        //  $rootScope.searchMovie=function(){
        //       $route.updateParams({status:"search",q:$rootScope.searchMessage})
        // }
         
       

          $service.jsonp("https://api.douban.com/v2/movie/"+$scope.filmOnTime,{count:count,start:start,q:$routeParams.q},
          	function(data){
              $scope.total=data.total;
              $scope.totalPage=Math.ceil($scope.total / count);
              $scope.title=(data.title=="豆瓣电影Top250"?"兔兔电影最火250":data.title);
              $scope.subjects=data.subjects;
              $scope.pageControl={total:$scope.totalPage,current:$scope.page,show:count,click:function(index){
              $route.updateParams({page:index});
              $scope.$apply();
               }}
              $scope.$apply();         
          })
               
         
        // $scope.changePage=function(currentPage){
        //   currentPage=Math.min(Math.max(currentPage,1),$scope.totalPage);
        //   $route.updateParams({page: currentPage});
        // }

    }])
})()

