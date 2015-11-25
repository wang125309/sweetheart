require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-touch/angular-touch.js");
require("../../../bower_components/angular-sanitize/angular-sanitize.min.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../getParams.js");
require("./lib/alert.js");
require("./login.js");
shopCtrl = angular.module('sweetheart',['ngTouch','ngSanitize']).controller('shopCtrl',['$scope','$sce',function($scope,$sce){
    $scope.payStateType = 'active';
    $scope.rechargeStateType = '';
    var refrash = function() {
        if(getQueryParams("type") == '1') {
            type = 1;
            $scope.payStateType = 'active';
            $scope.rechargeStateType = '';
        }
        else {
            type = 0;
            $scope.payStateType = '';
            $scope.rechargeStateType = 'active';
        }
        $.get("/api/getGoodsList.do?type=" + type,function(data){
            $scope.cards = data.data;
            $scope.$apply();
        });
    };
    refrash();
    $scope.changeTo = function(type) {
        if(type == 'pay') {
            $scope.payStateType = 'active';
            $scope.rechargeStateType = '';
            $.get("/api/getGoodsList.do?type=1",function(data){
                $scope.cards = data.data;
                $scope.$apply();
            });
        }
        else {
            $scope.payStateType = '';
            $scope.rechargeStateType = 'active';
            $.get("/api/getGoodsList.do?type=0",function(data){
                $scope.cards = data.data;
                $scope.$apply();
            });
       }
    };
    $scope.goDetail = function(id) {
        location.href = "/portal/shopDetail.html?id="+id;
    };
}]);
shopCtrl.$inject = ['$scope','shopCtrl']; 
