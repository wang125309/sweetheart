require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-animate/angular-animate.js");
jQuery = require("../../bower_components/jquery/dist/jquery.js");
require("../../bower_components/bootstrap/dist/js/bootstrap.js");
require("../../bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js");
backuserCtrl = angular.module('app',['ngAnimate']).controller('backuserCtrl',['$scope',function($scope){
    $scope.nav = 'backuser';
    $scope.logout = function() {
        jQuery.get("/sys/logout.do",function(data){
            location.href = "/login.html";
        });
    };
    var refrash = function() {
        jQuery.get("/sys/getSysUser.do",function(data){
            $scope.data = data.data;
            if("error_no" in data && data.error_no != '0') {
                location.href = "/login.html";
            }
            $scope.$apply();
        });
    };
    refrash();
    $scope.save = function() {
        jQuery.post("/sys/insertSysUser.do",$scope.add,function(data){
            if (data.error_no == '0') refrash();
        });
    };
    $scope.edit = {
        id : "",
        user_name : "",
        password : "",
        real_name : "",
        level : ""
    };
    $scope.editForm = function(id,user_name,password,real_name,level) {
        $scope.edit.id = id;
        $scope.edit.user_name = user_name;
        $scope.edit.password = password;
        $scope.edit.real_name = real_name;
        $scope.edit.level = level;
    };
    $scope.saveEdit = function() {
        jQuery.post("/sys/editSysUser.do",$scope.edit,function(data){
            console.log(data);
            refrash();
        }); 
    };
}])
backuserCtrl.$inject = ['$scope','backuserCtrl']; 
