require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../getParams.js");
require("./lib/alert.js");
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
    };
    $scope.evaluate = function() {
        var par = {
            values : now,
            comment : $scope.information  
        };
        personalclass_id = getQueryParams("personalclass_id");
        public_id = getQueryParams("public_id");
        coach_id = getQueryParams("coach_id");
        if(personalclass_id) {
            par.personalclass_id = personalclass_id;
        }
        if(public_id) {
            par.public_id = public_id;
        }
        if(coach_id) {
            par.coach_id = coach_id;
        }
        $.post("/api/insertEvaluation.do",par,function(data){
            if(data.error_no == '0') {
                address = "";
                if(personalclass_id) {
                    address += "personalclass_id="+personalclass_id;
                }
                if(public_id) {
                    if(address.length) {
                        address += "&";
                    }
                    address += "public_id="+public_id;
                }
                if(coach_id) {
                    if(address.length) {
                        address += "&";
                    }
                    address += "coach_id="+coach_id;
                }
                
                window.alertShow("您的评论已经记录",function(){
                    location.href = "/portal/evaluatelist.html?"+address;
                });
                $scope.alert = window.alert;
                $scope.$apply();
            }
            else {
                window.alertShow(data.data.message);
                $scope.alert = window.alert;
                $scope.$apply();
            }
        });
    };
}]);
evaluateCtrl.$inject = ['$scope','evaluateCtrl']; 
