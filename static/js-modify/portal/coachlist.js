require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
coachlistCtrl = angular.module('sweetheart',['ngAnimate']).controller('coachlistCtrl',['$scope',function($scope){
    $scope.locations = ["北京","日本","深蓝健身俱乐部","绿色俱乐部"];
    $scope.subjects = ["柔道","散打","瑜伽","举重","击剑"];
    $scope.subject = $scope.subjects[0];
    $scope.location = $scope.locations[0];
    $scope.sex = "不限";
    $scope.location_pull_down = function() {
        return false;
    };
    $scope.sex_pull_down = function() {
        return false;
    };
    $scope.subject_pull_down = function() {
        return false;
    };
    $scope.cards = [{
        name : '张飞',
        sex : '0',
        location : '北京',
        url : 'http://upload.northnews.cn/2014/0424/1398292423809.jpg'
    },{
        name : '张飞',
        sex : '0',
        location : '北京',
        url : 'http://upload.northnews.cn/2014/0424/1398292423809.jpg'
    },{
        name : '张飞',
        sex : '0',
        location : '北京',
        url : 'http://upload.northnews.cn/2014/0424/1398292423809.jpg'
    }];
}]);
coachlistCtrl.$inject = ['$scope','coachlistCtrl']; 
