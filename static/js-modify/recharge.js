require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-animate/angular-animate.js");
jQuery = require("../../bower_components/jquery/dist/jquery.js");
require("../../bower_components/bootstrap/dist/js/bootstrap.js");
require("../../bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js");
rechargeCtrl = angular.module('app',['ngAnimate']).controller('rechargeCtrl',['$scope',function($scope){
    $scope.nav = 'recharge';
    $scope.logout = function() {
        jQuery.get("/sys/logout.do",function(data){
            location.href = "/login.html";
        });
    };
    var refrash = function() {
        jQuery.get("/sys/getGoodsList.do?type=0",function(data){
            if ("error_no" in data && data.error_no == '1') {
                location.href = "/login.html";
            }

            $scope.data = data.root;
            $scope.$apply();
        });
    };
    refrash();
    $scope.save = function() {
        jQuery.post("/sys/addRecharge.do?type=0",$scope.add,function(data){
            refrash();
        })
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
        id : "",
        name : "",
        description : "",
        price : "",
        now_stock : ""
    };

    $scope.editForm = function(id,name,price,score) {
        $scope.edit.id = id;
        $scope.edit.name = name;
        $scope.edit.price = price;
        $scope.edit.score = score;
    };
    $scope.saveEdit = function() {
        jQuery.post("/sys/updateRechargeByParam.do?type=0",$scope.edit,function(data){
            refrash();
        })
    };
}]);
rechargeCtrl.$inject = ['$scope','rechargeCtrl']; 
