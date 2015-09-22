require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("./login.js");
coachapplyCtrl = angular.module('sweetheart',['ngAnimate']).controller('coachapplyCtrl',['$scope',function($scope){
    $scope.skills = [{
        name:"搏击",
        choose:false,
        id:1
    },{
        name:"游泳",
        choose:true,
        id:2
    },{
        name:"击剑",
        choose:false,
        id:3
    },{
        name:"自由操",
        choose:true,
        id:4
    },{
        name:"瘦身",
        choose:false,
        id:5
    }];
    $scope.skillShow = true;
    $scope.showSkill = function() {
        if ($scope.skillShow == true) {
            $scope.skillShow = false;
        }
        else {
            $scope.skillShow = true;
        }
    };
}]);
coachapplyCtrl.$inject = ['$scope','coachapplyCtrl']; 
