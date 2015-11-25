require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-animate/angular-animate.js");
jQuery = require("../../bower_components/jquery/dist/jquery.js");
require("../../bower_components/bootstrap/dist/js/bootstrap.js");
require("../../bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js");
scanCtrl = angular.module('app',['ngAnimate']).controller('scanCtrl',['$scope',function($scope){
    $scope.nav = 'scan';
    $scope.logout = function() {
        jQuery.get("/sys/logout.do",function(data){
            location.href = "/login.html";
        });
    };
    var refrash = function() {
        jQuery.get("/sys/getAllPhone.do",function(data){
            $scope.data = data.root;
            if("error_no" in data && data.error_no != '0') {
                location.href = "/login.html";
            }
            $scope.$apply();
        });
        
    };
    refrash();
    $scope.add = function() {
        jQuery.get("/sys/newAuthCode.do",function(data){
            $scope.qrcode = "data:image/jpg;base64,"+data.root;
            $scope.$apply();
        });
    };
    $scope.refrash = refrash ;
}])
scanCtrl.$inject = ['$scope','scanCtrl']; 
