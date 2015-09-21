require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
personalspaceCtrl = angular.module('sweetheart',['ngAnimate']).controller('personalspaceCtrl',['$scope',function($scope){
    $scope.person = {
        name : "张翼德",
        sex : "1",
        ordered : 50,
        ordered_new : 1,
        score : 3000,
        focusNum : 110,
        avatar : 'http://sw.importos.com/res/20150917/fa962006c45646939312b7f7dc6ec425.jpg'
    };
    $.get("/api/getUserInfo.do",function(data){
        console.log(data); 
    });
}]);
personalspaceCtrl.$inject = ['$scope','personalspaceCtrl']; 
