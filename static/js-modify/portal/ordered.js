require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../getParams.js");
orderedCtrl = angular.module('sweetheart',['ngAnimate']).controller('orderedCtrl',['$scope',function($scope){

    $scope.active = [];
    for(i=0;i<=5;i++) {
        $scope.active.push("");
    }
    type = getQueryParams("type");
    if(!type) {
        type = 1;
    }
    $scope.active[type] = "active";
    $.get("/api/getMyOrder.do?type="+type,function(data){
        $scope.card = data.data;
        for(i in $scope.card) {
            if($scope.card[i].classtype == 'public') {
                if("publicClassEntity" in $scope.card[i]) {
                    $scope.card[i].begintime = $scope.card[i].publicClassEntity.begintime;
                    $scope.card[i].endtime = $scope.card[i].publicClassEntity.endtime;
                }
            }
            else {
                if("personalClassEntity" in $scope.card[i]) {
                    $scope.card[i].begintime = $scope.card[i].personalClassEntity.begintime;
                    $scope.card[i].endtime = $scope.card[i].personalClassEntity.endtime;   
                }
            }
        }
        $scope.$apply(); 
    });
    $scope.qrcodeShow = false;
    $scope.qrcode = '';
    $scope.showQrcode = function(id) {
        if($scope.qrcodeShow == false) {
            $scope.qrcodeShow = true;
            $scope.qrcode = $scope.card[id].remark;
        }
        else {
            $scope.qrcodeShow = false;
        }

    };
    $scope.goType = function(id) {
        location.href = '/portal/ordered.html?type='+id;
    };
    $scope.goPay = function(order_id) {
        location.href = '/portal/pay.html?order_id='+order_id;
    };
    $scope.goEvaluate = function(id,coach_id) {
        location.href = "/portal/evaluate.html?personalclass_id="+id+"&coach_id="+coach_id;
    }; 
}]);
orderedCtrl.$inject = ['$scope','orderedCtrl']; 
