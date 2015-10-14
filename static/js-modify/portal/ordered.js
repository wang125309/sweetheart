require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
orderedCtrl = angular.module('sweetheart',['ngAnimate']).controller('orderedCtrl',['$scope',function($scope){
    $.get("/api/getMyNotUpOrderPersonalClass.do",function(data){
        $scope.card = data.data;
        $scope.$apply();
    });
    $scope.goEvaluate = function(id,coach_id) {
        location.href = "/portal/evaluate.html?personalclass_id="+id+"&coach_id="+coach_id;
    }; 
}]);
orderedCtrl.$inject = ['$scope','orderedCtrl']; 
