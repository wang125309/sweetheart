require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../getParams.js");
require("./lib/alert.js");
require("./login.js");
courseCtrl = angular.module('sweetheart',['ngAnimate']).controller('courseCtrl',['$scope',function($scope){
    id = getQueryParams("id");
    var refrash = function(){
        $.get("/api/getPublicClassById.do?publicclass_id="+id,function(data){
            $scope.desc = data.data.name;
            $scope.bgtime = data.data.begintime;
            $scope.edtime = data.data.endtime;
            $scope.location = data.data.placeEntity.place_name;
            $scope.price = data.data.cost;
            $scope.banner = data.data.video_poster;
            $scope.video = data.data.video;
            $scope.ready = data.data.order_count;
            $scope.total = data.data.user_count;
            $scope.ps = [];
            initps = function() {
                for(i=0;i<$scope.ready;i++) {
                    $scope.ps.push(true);
                }
                for(i=0;i<$scope.total-$scope.ready;i++) {
                    $scope.ps.push(false);
                }
            };
            initps();
            $scope.$apply();
        }); 
    };
    refrash();
    $scope.order = function() {
        $.get("/api/orderPublicClass.do?publicclass_id="+id,function(data){
            if(data.error_no == '0') {
                alertShow(data.data,function(){
                    location.href = '/portal/ordered.html';
                });
                $scope.alert = window.alert;
                refrash();
            }
            else {
                alertShow(data.data.message);
                $scope.alert = window.alert;
                $scope.$apply();
            }
        });
    };
}]);
courseCtrl.$inject = ['$scope','courseCtrl']; 
