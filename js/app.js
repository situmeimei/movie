(function() {
    var app = angular.module("doubanApp", ["ngRoute", "minorApp"]);
    app.config(["$routeProvider", function($routeProvider) {
        $routeProvider.when("/:status/:page?", {
            templateUrl: "hot/hot.html",
            controller: "hotControl"
        }).otherwise({
            redirectTo: "/in_theaters"
        })
    }])

    app.directive("search", ["$routeParams", "$route", "$location", "$timeout", function($routeParams, $route, $location, $timeout) {
        return {
            replace: true,
            template: '<form class="navbar-form navbar-right" ng-submit="searchMovie()">\
                    <input type="text" class="form-control" placeholder="Search..." ng-model="searchMessage">\
                </form>',
            link: function($scope, ele, attr) {
                 
                $scope.searchMovie = function() {
                    if ($routeParams.status) {
                        $route.updateParams({ status: "search", q: $scope.searchMessage ,page:$scope.page})
                    } else {
                        $location.path("search"); //
                        $timeout(function() {
                            $route.updateParams({ status: "search", q: $scope.searchMessage,page:$scope.page})
                        }, 0)
                    }
                }
            }
        }
    }])

    app.directive("page", [function() {
        return {
            replace: true,
            template: '<ul class="pagination"></ul>',
            link: function($scope, ele, attr) {
                $scope.$watch('pageControl', function(n) {
                	if(n){
                	var total =n.total;
                    var show = n.show;
                    var current =n.current;

                    var moiety = Math.floor(show / 2);

                    var begin = current - moiety;
                    begin = Math.max(1, begin);
                    var end = begin + show;
                      
                    if (end > total) {
                        end = total + 1;
                        begin = end - show;
                        begin = Math.max(1, begin);
                    }

                    var pageUl =ele[0];

                    for (var i = begin; i < end; i++) {
                        var li = document.createElement("li");
                        li.innerHTML = "<a>" + i + "</a>";
                        if (i == current) {
                            li.classList.add("active");
                        }
                        pageUl.appendChild(li);
                        li.index=i;
                        li.onclick=function(){
         
                        	n.click(this.index);
                        }
                    }
                    
                   $scope.pageUl_width=pageUl.offsetWidth+"px";


                	}

                    
                })
            }
        }
    }])
})()
