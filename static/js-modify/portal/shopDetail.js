require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-touch/angular-touch.js");
require("../../../bower_components/angular-sanitize/angular-sanitize.min.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../getParams.js");
require("./lib/alert.js");
require("./login.js");
shopDetailCtrl = angular.module('sweetheart',['ngTouch','ngSanitize']).controller('shopDetailCtrl',['$scope','$sce',function($scope,$sce){
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
    var refrash = function() {
        $.get("/api/getGoodsById.do?gid="+getQueryParams("id"),function(data){
            $scope.data = data.data;
        
            $scope.$apply();
        });
    };
    refrash();
    pay = 0;
    $scope.process = false;
    $scope.buy = function() {
        if($scope.data.type == '1') {
            alertShow("确定要兑换它吗？",function(){
                $.post("/api/syncExchange.do",{
                    "gid":getQueryParams("id")
                },function(data){
                    alertShow("兑换成功");
                    $scope.alert = window.alert;
                    $scope.$apply();
                });
            });
        }
        else {
            if(pay == 0) {
                alertShow("确定要兑换它吗？",function(){
                    $.post("/api/orderScore.do",{
                        "goods_id":getQueryParams("id")
                    },function(data){
                        oid = data.data;
                                
                        $.ajax({
                            url : "/pay/unifiedorder.do?order_id="+oid,
                            beforeSend : function() {
                                $scope.process = true;
                                $scope.$apply();
                            },
                            success : function(data){
                                $scope.process = false;
                                if(data.error_no == '0') {
                                    wx.chooseWXPay({  
                                        timestamp: data.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                        nonceStr: data.data.nonceStr, // 支付签名随机串，不长于 32 位
                                        package: data.data.all, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                                        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                        paySign: data.data.paySign, // 支付签名
                                        success : function(res) {
                                            alertShow("您已经支付成功",function(){
                                                location.href = location.href;
                                            });
                                            $scope.alert = window.alert;
                                            $scope.$apply();
                                            pay = 0;
                                        },
                                        error: function() {
                                            $scope.process = false;
                                            $scope.$apply();
                                        }
                                    });
                                }
                            }
                        });

                    });
                });
            }
            else {
                alertShow("您还有未支付的订单");
            }
        
        }
        $scope.alert = window.alert ;
    };
}]);
shopDetailCtrl.$inject = ['$scope','shopDetailCtrl']; 
