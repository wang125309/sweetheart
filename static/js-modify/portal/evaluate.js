require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
evaluateCtrl = angular.module('sweetheart',['ngAnimate']).controller('evaluateCtrl',['$scope',function($scope){
    now = 5;
    $scope.getstatus = function(n) {
        console.log(n);
        if( n <= now ) {
            return false;
        }
        else {
            return true;
        }
    };
    $scope.light = function(n) {
        now = n;
        console.log(n);
    };
}]);
evaluateCtrl.$inject = ['$scope','evaluateCtrl']; 
