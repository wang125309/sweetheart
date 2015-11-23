require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-touch/angular-touch.js");
require("../../../bower_components/angular-sanitize/angular-sanitize.min.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../getParams.js");
require("./lib/alert.js");
require("./login.js");
coachCtrl = angular.module('sweetheart',['ngTouch','ngSanitize']).controller('coachCtrl',['$scope','$sce',function($scope,$sce){
    id = window.getQueryParams("id");
    coach_id = window.getQueryParams("coachid");
    $scope.person = {};

    var refrash = function() {
        $.get("/api/getUserInfo.do?id="+id,function(data){
            $scope.person.sex = data.data.coachinfo.gender;
            $scope.person.name = data.data.coachinfo.displayname;
            $scope.avatar = data.data.coachinfo.headimg;
            $scope.video = $sce.trustAsResourceUrl(data.data.coachinfo.video);
            $scope.self = data.data.self;
            $scope.like = data.data.coachinfo.like;
            goodat = "";
            for (i in data.data.coachinfo.goodats) {
                console.log(data.data.coachinfo.goodats[i]);
                goodat += (data.data.coachinfo.goodats[i].display + " ");
            }
            $scope.skills = goodat;
            $scope.$apply();
        });
    };
    refrash();
    $scope.ask = function() {
        alertShow("愤怒开发中");
        $scope.alert = window.alert;
    };
    $scope.likeCoach = function() {
        $.get("/api/likeCoach.do?coach_id="+coach_id,function(data){
            refrash();
            alertShow("关注成功");
            $scope.alert = window.alert;
            $scope.$apply();
        });    

    };
    $.get("/api/getEvaluation.do",{
        coach_id : coach_id
    },function(data){
        if(data.error_no == '0') {
            $scope.dialogs = data.data;
            $scope.$apply();
        }
    });
    $scope.goEvaluate = function() {
        location.href = "/portal/evaluatelist.html?coach_id=" + coach_id;
    };
    $.get("/api/getPersonalClassListDateByCoach.do?coach_id="+window.getQueryParams("coachid"),function(data){
        $scope.date = data.data;
        date = '';
        for(i in $scope.date) {
            if($scope.date[i].active == true) {
                date = $scope.date[i].date;
            }
        }
        $.get("/api/getPersonalClassListByDate.do?coach_id="+window.getQueryParams("coachid")+"&date="+date,function(d){
            $scope.times = d.data.classes;        
            $scope.$apply();
        });
    });
    $scope.orderP = {};
    $scope.setOrderP = function(id) {
        $scope.orderP.personalclass_id = id;
        $scope.orderP.coach_id = coach_id;
        for(i in $scope.times) {
            if($scope.times[i].id == id) {
                $scope.times[i].class = "active";
                $scope.cost = $scope.times[i].cost + '甜心币';
                $scope.location = '地址：' + $scope.times[i].address.place_name;
                console.log($scope.cost);
            }
            else {
                $scope.times[i].class = "";
            }
        }
    };
    $scope.goPersonalSpace = function() {
        location.href = "/portal/personalspace.html?id="+id;
    };
    $scope.order = function() {
        if("personalclass_id" in $scope.orderP) {
            $.get("/api/orderPersonalClass.do",$scope.orderP,function(data){
                if(data.error_no == '0') {
                    alertShow('您的预约请求已发送，请15分钟之内完成支付');
                    $scope.alert = window.alert;
                    $scope.$apply();
                }
                else {
                    alertShow(data.data.message);
                    $scope.alert = window.alert;
                    $scope.$apply();
                }
            });
        }
        else {
            alertShow('请先选择一个时段进行预约');
            $scope.alert = window.alert;
            $scope.$apply();
        }
    };
    $scope.changeToDate = function(date) {
        for(i in $scope.date) {
            $scope.date[i].active = false;
            if($scope.date[i].date == date) {
                $scope.date[i].active = true;
                $.get("/api/getPersonalClassListByDate.do?coach_id="+coach_id+"&date="+$scope.date[i].date,function(d){
                    $scope.times = d.data.classes;        
                    $scope.$apply();
                });
            }
        }

        return ;
    };

    now = new Date();
}]);
coachCtrl.$inject = ['$scope','coachCtrl']; 
