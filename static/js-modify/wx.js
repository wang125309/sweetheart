require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-animate/angular-animate.js");
jQuery = require("../../bower_components/jquery/dist/jquery.js");
require("../../bower_components/bootstrap/dist/js/bootstrap.js");
require("../../bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js");
wxCtrl = angular.module('app',['ngAnimate']).controller('wxCtrl',['$scope',function($scope){
    $scope.nav = 'wx';
    $scope.logout = function() {
        jQuery.get("/sys/logout.do",function(data){
            location.href = "/login.html";
        });
    };
    var refrash = function() {
        jQuery.get("/sys/getSysConstant.do",function(data){
            if ("error_no" in data) {
                location.href = "/login.html";
            }
            $scope.data = data;
            $scope.$apply();
        });
    };
    refrash();
    $scope.add = {
        xkey : "",
        xvalue : "",
        note : ""
    };
    $scope.save = function() {
        jQuery.post("/sys/insertSysConstant.do",$scope.add,function(data){
            if (data.error_no == '0') refrash();
        });
    };
    $scope.deleteKey = "";
    $scope.delete = function(xkey) {
        $scope.deleteKey = xkey;
    };
    $scope.doDelete = function() {
        jQuery.post("/sys/removeSysConstant.do",{
            "xkeys":$scope.deleteKey
        },function(data){
            console.log(data);
            refrash();
        });
    };
    $scope.edit = {
        xkey:"",
        xvalue:"",
        note:""
    };
    $scope.editForm = function(xkey,xvalue,note) {
        $scope.edit.xkey = xkey;
        $scope.edit.xvalue = xvalue;
        $scope.edit.note = note;
    };
    $scope.saveEdit = function() {
        jQuery.post("/sys/editSysConstant.do",$scope.edit,function(data){
            console.log(data);
            refrash();
        }); 
    };
}])
wxCtrl.$inject = ['$scope','wxCtrl']; 
