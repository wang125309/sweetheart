require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-animate/angular-animate.js");
jQuery = require("../../bower_components/jquery/dist/jquery.js");
require("../../bower_components/bootstrap/dist/js/bootstrap.js");
require("../../bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js");
require("./getParams.js");
orderedCtrl = angular.module('app',['ngAnimate']).controller('orderedCtrl',['$scope',function($scope){
    $scope.nav = 'ordered';
    $scope.filterText = '全部';
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
        jQuery.get("/sys/getAllOrder.do?start="+start+"&limit="+per_page,function(data){
            if ("error_no" in data && data.error_no == '1') {
                location.href = "/login.html";
            }
            $scope.data = data.data;
            $scope.count = data.total/per_page;
            $scope.$apply();
        });
    };
    refrash();
    $scope.search = function() {
        jQuery.get("/sys/getAllOrder.do?nick_name="+$scope.queryString,function(data){
            $scope.data = data.data;
            $scope.$apply();
        });
    };
    $scope.getOrder = function(type) {
        if(type == 'all') {
            type = 0;
            $scope.location = '全部';
        }
        else if(type == 'neworder') {
            type = 1;
            $scope.location = '新订单';
        }
        else if(type == 'payed') {
            type = 2;
            $scope.location = '已支付';
        }
        else if(type == 'finish') {
            type = 4;
            $scope.location = '已完成';
        }
        url = "/sys/getAllOrder.do?type="+type;
        jQuery.get(url,function(data){
            $scope.data = data.data;
            $scope.$apply();
        });
    };
    $scope.goToPage = function(page) {
        location.href = "/ordered.html?p="+page;  
    };
}]);
orderedCtrl.$inject = ['$scope','orderedCtrl']; 
