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
    $scope.filterText = "全部";
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
    $scope.optid = function(uid,id) {
        $scope.id = id;
        $scope.user_id = uid;
    };
    $scope.passCoachApply = function() {
        jQuery.get("/sys/approvalCoach.do?coach_id="+$scope.id+"&user_id="+$scope.user_id+"&pass=true",function(data){
            if(data.error_no != '0') {
                alert("后台异常");
            }
            else {
                refrash();
            }
        });
    };
    $scope.rejectCoachApply = function() {
        jQuery.get("/sys/approvalCoach.do?coach_id="+$scope.id+"&user_id="+$scope.user_id+"&pass=false",function(data){
            if(data.error_no != '0') {
                alert("后台异常");
            }
            else {
                refrash();
            }
        });
    };
    $scope.getCoach = function(query_status){
        if(query_status < 0){
            $scope.filterText = "全部";
            refrash();
        }
        if(query_status == 1 || query_status == 2){
            jQuery.get("/sys/getCoachList.do?start="+start+"&limit="+per_page+"&status="+query_status,function(data){
                if ("error_no" in data && data.error_no == '1') {
                    location.href = "/login.html";
                }
                if(query_status == 1) {
                    $scope.filterText = '待审批';
                }
                else {
                    $scope.filterText = '已通过';
                }
                $scope.data = data;
                $scope.count = data.total/per_page;
                $scope.$apply();
            });
        }
    };
    $scope.addVApply = function() {
        jQuery.get("/sys/setCoachVic.do?coach_id="+$scope.id,function(data){
             
        });
    };
}])
coachCtrl.$inject = ['$scope','coachCtrl']; 
