require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../getParams.js");
require("./lib/alert.js");
hellowCtrl = angular.module('sweetheart',['ngAnimate']).controller('hellowCtrl',['$scope',function($scope){
    $.get("/test/helloworld.do",function(data){
        $scope.world = data.data;
    });

}]);
hellowCtrl.$inject = ['$scope','hellowCtrl']; 
