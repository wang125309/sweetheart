require("./getParams.js");
require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-animate/angular-animate.js");
jQuery = require("../../bower_components/jquery/dist/jquery.js");
require("../../bower_components/bootstrap/dist/js/bootstrap.js");
require("../../bower_components/smalot-bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js");
_ = require("../../bower_components/underscore/underscore.js");
userCtrl = angular.module('app',['ngAnimate']).controller('userCtrl',['$scope',function($scope){
    $scope.nav = 'user'; 
    $scope.logout = function() {
        jQuery.get("/sys/logout.do",function(data){
            location.href = "/login.html";
        });
    };
    per_page = 40;
    var refrash = function() {
        p = getQueryParams("p");
        if (p > 0){
            start = (p-1) * per_page;
            $scope.page = parseInt(p,10);
        }
        else {
            start = 0;
            $scope.page = 1;
        }
        jQuery.get("/sys/getStUsersList.do?start="+start+"&limit="+per_page,function(data){
            if ("error_no" in data && data.error_no == '1') {
                location.href = "/login.html";
            }
            $scope.data = data;
            $scope.count = data.total/per_page;
            $scope.$apply();
        });
    };
    refrash();
    $scope.goToPage = function(page) {
        location.href = "/user.html?p="+page;  
    };
    search_start = 0;
    $scope.optid = function(id,nickname) {
        $scope.addNickName = nickname;
        $scope.editid= id;
    };
    $scope.vip = {};
    $scope.vipTypeSelect = '选择会员类型';
    $scope.vipType = function(t) {
        if(t == 4) { //年费会员 
            $scope.vipTypeSelect = '年卡会员';
            $scope.vip.type = 4;
        }
        else if(t == 3) { //季卡会员
            $scope.vipTypeSelect = '季卡会员';
            $scope.vip.type = 3;
        }
        else if(t == 2) { //月卡会员
            $scope.vipTypeSelect = '月卡会员';
            $scope.vip.type = 2;
        }
        else if(t == 1){
            $scope.vipTypeSelect = '充值会员';
            $scope.vip.type = 1;
        }
        else if(t == 0){
            $scope.vipTypeSelect = '非会员';
            $scope.vip.type = 0;
        }

    };
    $scope.beVip = function() {
        jQuery.get("/sys/updateUserVipStatus.do",{
            user_id : $scope.editid,
            vip_status : $scope.vip.type,
            vip_out_date : $scope.vip.endtime
        },function(data){
            if(data.error_no == '0') {
                refrash();
            }
            else {
                alert("后台错误，成为会员失败");
            }
        });
    };
    $scope.vipFilter = '所有用户';
    $scope.filterVipType = function(t) {
        if(t == -2) {
            $scope.vipFilter = '所有用户';
            refrash();
        }
        else if(t == -1) {
            $scope.vipFilter = '所有用户';
        }
        else if(t == 0) {
            $scope.vipFilter = '非用户';
        }
        else if(t == 1) {
            $scope.vipFilter = '充值会员';
        }
        else if(t == 2) {
            $scope.vipFilter = '月卡会员';
        }
        else if(t == 3) {
            $scope.vipFilter = '季卡会员';
        }
        else if(t == 4) {
            $scope.vipFilter = '年卡会员';
        }
        jQuery.get("/sys/",{
            type : t
        },function(data){
        
        });
    };
    $scope.addScore = function() {
        jQuery.get("/sys/insertUserScore.do",{"user_id":$scope.editid,"score":$scope.add.count,"remark":$scope.add.remark},function(data){
            if(data.error_no == '0') {
                refrash();
            }
            else {
                alert(data.data.message);
            }
        });
    };
    $scope.viewScore = function(id) {
        jQuery.get("/sys/getUserScore.do",{
            "user_id":id
        },function(data){
            $scope.logs = data.data; 
            $scope.$apply();
        });
    };
    $scope.search = function() {
        jQuery.get("/sys/getStUsersList.do?start="+search_start+"&limit=100&nickname="+$scope.queryString,function(data){
            if ("error_no" in data && data.error_no == '1') {
                location.href = "/login.html";
            }
            $scope.data = data;
            $scope.count = 0;
            $scope.$apply();
        });
    };
    $scope.sync = function() {
        jQuery.get("/sys/syncWeixinUser.do",function(data){
            alert("同步成功");
        });
    };
}])
.directive('datepicker',function(){
    return {
        link:function(scope,element,attr) {
            options = {
                weekStart : 1,
                todayHighlight : true,
                format : 'yyyy-mm-dd-hh-ii',
                language : 'zh-CN',
                autoclose:true,
                minuteStep : 5,
            };
            jQuery("#endtime").datetimepicker(options).on('changeDate',function(){
                scope.vip.endtime = jQuery("#endtime").val();
                scope.$apply();
            });
        }
    }
});
userCtrl.$inject = ['$scope','userCtrl']; 
