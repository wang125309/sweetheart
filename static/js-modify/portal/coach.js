require("../../../bower_components/angular/angular.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../getParams.js");
require("./lib/alert.js");
coachCtrl = angular.module('sweetheart',[]).controller('coachCtrl',['$scope',function($scope){
    id = window.getQueryParams("id");
    coach_id = window.getQueryParams("coachid");
    $scope.person = {};
    $.get("/api/getUserInfo.do?id="+id,function(data){
        $scope.person.sex = data.data.coachinfo.gender;
        $scope.person.name = data.data.coachinfo.displayname;
        $scope.avatar = data.data.coachinfo.headimg;
        $scope.video = data.data.coachinfo.video;
        goodat = "";
        for (i in data.data.goodats) {
            goodat += (data.data.goodats[i] + ",");
        }
        $scope.skills = goodat;
        $scope.$apply();
    });
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
    $.get("/api/getPersonalClassListDateByCoach.do?coach_id="+coach_id,function(data){
        $scope.date = data.data;
        date = '';
        for(i in $scope.date) {
            if($scope.date[i].active == true) {
                date = $scope.date[i].date;
            }
        }
        $.get("/api/getPersonalClassListByDate.do?coach_id="+coach_id+"&date="+date,function(d){
            $scope.times = d.data.classes;        
            $scope.$apply();
        });
    });
    $scope.orderP = {};
    $scope.setOrderP = function(id) {
        $scope.orderP.personalclass_id = id;
        $scope.orderP.coach_id = coach_id;
    };
    $scope.order = function() {
        if("personalclass_id" in $scope.orderP) {
            $.get("/api/orderPersonalClass.do",$scope.orderP,function(data){
                if(data.error_no == '0') {
                    alert('您的预约请求已发送，请15分钟之内完成支付');
                }
                else {
                    alert('预约失败，该课程已经被预约');
                }
            });
        }
        else {
            alert('请先选择一个时段进行预');
        }
    };
    $scope.changeToDate = function(id) {
        for(i in $scope.date) {
            if($scope.date[i].id == id) {
                $scope.date[i].active = true;
                
                $.get("/api/getPersonalClassListByDate.do?coach_id="+coach_id+"&date="+$scope.date[i].date,function(d){
                    $scope.times = d.data.classes;        
                    $scope.$apply();
                });
                break;
            }
        }
        return ;
    };

    now = new Date();
}]);
coachCtrl.$inject = ['$scope','coachCtrl']; 
