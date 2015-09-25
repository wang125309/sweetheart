require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
courseCtrl = angular.module('sweetheart',['ngAnimate']).controller('courseCtrl',['$scope',function($scope){
    $scope.time = '周四下午3点半';
    $scope.location = '北京';
    $scope.ready = 14;
    $scope.total = 30;
    $scope.banner = 'http://upload.northnews.cn/2014/0424/1398292423809.jpg';
    $scope.price = 123;
    $scope.ps = [];
    initps = function() {
        for(i=0;i<$scope.ready;i++) {
            $scope.ps.push(true);
        }
        for(i=0;i<$scope.total-$scope.ready;i++) {
            $scope.ps.push(false);
        }
    };
    initps();
    $scope.desc = '这是一个牛逼的运动';
}]);
courseCtrl.$inject = ['$scope','courseCtrl']; 
