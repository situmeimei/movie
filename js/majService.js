(function() {
    var app = angular.module("serviceApp", []);
    app.service("serviceControl", ["$window",function($window) {
        this.jsonp = function(url, params, fn) {
            var urlName = "?";
            for (key in params) {
                urlName += key + "=" + params[key] + "&&";
            }
            var callbackFun = "myCallback" + new Date().getTime()
                urlName += "callback" + "=" + callbackFun;
            $window[callbackFun] = function(data) {
                fn(data);
                $window.document.body.removeChild(script);
            };
            var script = $window.document.createElement("script");
                script.src = url+urlName;
            $window.document.body.appendChild(script);
        }
        this.movie=function(typeNumber){
            switch(typeNumber){
               case "hot":
                 return "in_theaters";
               break;
               case "will":
               return "coming_soon";
               break;
               case "top250":
               return "top250";
               break;
               case "search":
               return "search";
               break;
            }
        }
    }])
})()
