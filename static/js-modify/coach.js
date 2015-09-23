require("./getParams.js");
require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-animate/angular-animate.js");
jQuery = require("../../bower_components/jquery/dist/jquery.js");
require("../../bower_components/bootstrap/dist/js/bootstrap.js");
require("../../bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js");
coachCtrl = angular.module('app',['ngAnimate']).controller('coachCtrl',['$scope',function($scope){
    $scope.nav = 'coach'; 
    $scope.logout = function() {
        jQuery.get("/sys/logout.do",function(data){
            location.href = "/login.html";
        });
    };
    per_page = 40;
    var refrash = function() {
        p = getQueryParams("p");
        if (p > 0){
            start = (p-1) * per_page;
            $scope.page = parseInt(p,10);
        }
        else {
            start = 0;
            $scope.page = 1;
        }
        jQuery.get("/sys/getCoachList.do?start="+start+"&limit="+per_page,function(data){
            if ("error_no" in data && data.error_no == '1') {
                location.href = "/login.html";
            }
            $scope.data = data;
            $scope.count = data.total/per_page;
            $scope.$apply();
        });
    };
    refrash();
    $scope.getCoach = function(query_status){
        if(query_status < 0){
            refrash();
        }
        if(query_status == 1 || query_status == 2){
            jQuery.get("/sys/getCoachList.do?start="+start+"&limit="+per_page+"&status="+query_status,function(data){
                if ("error_no" in data && data.error_no == '1') {
                    location.href = "/login.html";
                }
                $scope.data = data;
                $scope.count = data.total/per_page;
            });
        }
    }
}])
coachCtrl.$inject = ['$scope','coachCtrl']; 
