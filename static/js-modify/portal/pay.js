require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("./lib/alert.js");
require("../getParams.js");
require("./login.js");
payCtrl = angular.module('sweetheart',['ngAnimate']).controller('payCtrl',['$scope',function($scope){
    require("./lib/alert.js");
    order_id = getQueryParams('order_id');
    $.get("/js/getJsConfig.do",{
        url : location.href 
    },function(data){
        wx.config(data.data);
        wx.error(function(res){
            console.log(res);
        });
        wx.ready(function(){
            console.log(wx);
        });
    });
    $.get("/api/getOrderById.do?order_id="+order_id,function(data){
        $scope.courseName = data.data.desc;
        if(data.error_no != '0') {
            alertShow(data.data.message);
            $scope.alert = window.alert;
            $scope.$apply();
        }
        if("publicclass_id" in data.data) {
            $scope.cost = data.data.publicClassEntity.cost + '甜心币';
            $scope.bgtime = data.data.publicClassEntity.begintime;
            $scope.edtime = data.data.publicClassEntity.endtime;
            $scope.addr = data.data.publicClassEntity.address;
        }
        else if("personalclass_id" in data.data) {
            $scope.cost = data.data.personalClassEntity.cost + '甜心币';
            $scope.bgtime = data.data.personalClassEntity.begintime;
            $scope.edtime = data.data.personalClassEntity.endtime;
            $scope.addr = data.data.personalClassEntity.address;
        }
        $scope.type = '新店立减';
        $scope.payment = data.data.cost;
        $scope.$apply();
    });
    payed = 0;
    $scope.pay = function() {
        if(payed == 0) {
            $.get("/pay/payClassOrder.do?order_id="+order_id,function(data){
                if(data.error_no == '0') {
                    payed = 1;
                    alertShow("支付成功，请按时参加~",function(){
                        location.href = '/portal/ordered.html?type=2';
                    });
                    $scope.alert = window.alert;
                    $scope.$apply();
                }
                else {
                    alertShow(data.data.message,function(){
                        if(data.data.code == '500302') {
                            location.href = '/portal/shop.html?type=0';
                        }
                    });
                    $scope.alert = window.alert;
                    $scope.$apply();
                }
            });
        }
        payed = 1;
    };
}]);
payCtrl.$inject = ['$scope','payCtrl']; 
