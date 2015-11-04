require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-animate/angular-animate.js");
jQuery = require("../../bower_components/jquery/dist/jquery.js");
require("../../bower_components/bootstrap/dist/js/bootstrap.js");
positionCtrl = angular.module('app',['ngAnimate']).controller('positionCtrl',['$scope',function($scope){
    $scope.nav = 'position'; 
    
    var refrash = function() {
        jQuery.get("/sys/getAllPlace.do",function(data){
            if ("error_no" in data && data.error_no == '1') {
                location.href = "/login.html";
            }
            $scope.data = data;
            $scope.$apply();
        });
    };
    $scope.add = function() {
        if("id" in $scope.place) {
            delete $scope.place.id;
        }
        jQuery.post("/sys/insertPlace.do",$scope.place,function(data){
            if(data.error_no == '0') {
                refrash();
            }
            else {
                alert('后台异常');
            }
        });
    };
    $scope.optid = function(id,edit) {
        $scope.id = id;
        if(edit) {
            jQuery.get("/sys/getPlaceById.do?place_id="+$scope.id,function(data){
                if(data.error_no == '0') {
                    $scope.place = data.root;
                    $scope.$apply();
                }
                else {
                    alert("后台异常");
                }
            });
        }
    };
    $scope.edit = function() {
        $scope.place.id = $scope.id;
        jQuery.post("/sys/updatePlace.do",$scope.place,function(data){
            if(data.error_no == '0') {
                refrash();
            }
            else {
                alert("后台异常");
            }
        });
    };
    $scope.sync = function() {
        jQuery.get("/sys/syncPlaceToWxMenu.do",function(data){
            refrash();
        });
    };
    $scope.delete = function() {
        jQuery.get("/sys/deletePlace.do?place_id="+$scope.id,function(data){
            refrash();
        });
    };
    refrash();
    $scope.logout = function() {
        jQuery.get("/sys/logout.do",function(data){
            location.href = "/login.html";
        });
    };
}]);
positionCtrl.$inject = ['$scope','positionCtrl']; 
