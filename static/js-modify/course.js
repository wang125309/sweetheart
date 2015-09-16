require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-animate/angular-animate.js");
jQuery = require("../../bower_components/jquery/dist/jquery.js");
require("../../bower_components/bootstrap/dist/js/bootstrap.js");
require("../../bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js");
require("../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js");
require("../../bower_components/bootstrap-datepicker/js/locales/bootstrap-datepicker.zh-CN.js");
courseCtrl = angular.module('app',['ngAnimate']).controller('courseCtrl',['$scope',function($scope){
    $scope.nav = 'course'; 
    $scope.logout = function() {
        jQuery.get("/sys/logout.do",function(data){
            location.href = "/login.html";
        });
    };
    var refrash = function() {
        jQuery.get("/sys/getAllGoodat.do",function(data){
            $scope.data = data.data;
            if("error_no" in data && data.error_no != "0") {
                location.href = "/login.html";
            }
            $scope.$apply();
        });
    };
    refrash();
    $scope.save = function() {
        jQuery.post("/sys/insertGoodat.do",$scope.add,function(data){
            if (data.error_no == '0') refrash();
        });
    };
    $scope.delete = function(id,display) {
        $scope.subject = display;
        $scope.deleteId = id;
    };
    $scope.doDelete = function() {
        jQuery.post("/sys/removeGoodat.do",{
            "id":$scope.deleteId
        },function(data){
            refrash();
        });
    };
}]);
courseCtrl.$inject = ['$scope','courseCtrl']; 
