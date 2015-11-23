require("./getParams.js");
require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-animate/angular-animate.js");
jQuery = require("../../bower_components/jquery/dist/jquery.js");
require("../../bower_components/bootstrap/dist/js/bootstrap.js");
require("../../bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js");
userCtrl = angular.module('app',['ngAnimate']).controller('userCtrl',['$scope',function($scope){
    $scope.nav = 'user'; 
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
        jQuery.get("/sys/getStUsersList.do?start="+start+"&limit="+per_page,function(data){
            if ("error_no" in data && data.error_no == '1') {
                location.href = "/login.html";
            }
            $scope.data = data;
            $scope.count = data.total/per_page;
            $scope.$apply();
        });
    };
    refrash();
    $scope.goToPage = function(page) {
        location.href = "/user.html?p="+page;  
    };
    search_start = 0;
    $scope.search = function() {
        jQuery.get("/sys/getStUsersList.do?start="+search_start+"&limit=100&nickname="+$scope.queryString,function(data){
            if ("error_no" in data && data.error_no == '1') {
                location.href = "/login.html";
            }
            $scope.data = data;
            $scope.count = 0;
            $scope.$apply();
        });
    };
    $scope.sync = function() {
        jQuery.get("/sys/syncWeixinUser.do",function(data){
            alert("同步成功");
        });
    };
}])
userCtrl.$inject = ['$scope','userCtrl']; 
