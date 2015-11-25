require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../getParams.js");
require("./login.js");
evaluatelistCtrl = angular.module('sweetheart',['ngAnimate']).controller('evaluatelistCtrl',['$scope',function($scope){
    personalclass_id = getQueryParams("personalclass_id");
    public_id = getQueryParams("publicclass_id");
    coach_id = getQueryParams("coach_id");
    var par = {};
    if(personalclass_id) {
        par.personalclass_id = personalclass_id;
    }
    if(public_id) {
        par.public_id = public_id;
    }
    if(coach_id) {
        par.coach_id = coach_id;
    }
    $.get("/api/getEvaluation.do",par,function(data){
        if(data.error_no == '0')    {
            $scope.dialogs = data.data;
            $scope.$apply();
        }
    });

}]);
evaluatelistCtrl.$inject = ['$scope','evaluatelistCtrl']; 
