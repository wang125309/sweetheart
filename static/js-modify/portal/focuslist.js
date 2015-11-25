require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../getParams.js");
require("./login.js");
focuslistCtrl = angular.module('sweetheart',['ngAnimate']).controller('focuslistCtrl',['$scope',function($scope){
    $scope.activeCoach = 'active';
    coach_id = getQueryParams("coach_id");
    var refrash = function() {
        if(getQueryParams("type") == 'me') {
            $scope.type = '1';
            $.get("/api/getAllUserLikeByCoach.do?coach_id="+coach_id,function(data){
                if(data.error_no == '0') {
                    $scope.coachlist = data.data;
                    $scope.$apply();
                }
            });

        }
        else {
            $scope.type = '2';
            $.get("/api/getAllMyLikeCoach.do",function(data){
                if(data.error_no == '0') {
                    $scope.coachlist = data.data;
                    $scope.$apply();
                }
            });
        }
    };
    refrash();
    $scope.goCoach = function(coach_id,id) {
        location.href = '/portal/coach.html?coachid='+coach_id+'&&id='+id;
    };
}]);
focuslistCtrl.$inject = ['$scope','focuslistCtrl']; 
