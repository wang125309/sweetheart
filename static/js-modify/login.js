require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-animate/angular-animate.js");
jQuery = require("../../bower_components/jquery/dist/jquery.js");
require("../../bower_components/bootstrap/dist/js/bootstrap.js");
require("../../bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js");
loginCtrl = angular.module('app',['ngAnimate']).controller('loginCtrl',['$scope',function($scope){
    $scope.user = {
        uname : "",
        upwd : ""
    };
    $scope.login = function() {
        jQuery.post("/sys/login.do",$scope.user,function(data){
            console.log(data);
            if(data.error_no == "0") {
                location.href = "/user.html";
            }
            else {
                alert(data.data.message);
            }
        });
    };
}])
loginCtrl.$inject = ['$scope','loginCtrl']; 
