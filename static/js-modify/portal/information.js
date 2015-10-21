require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/angular-touch/angular-touch.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../../../bower_components/swiper/dist/js/swiper.js");
require("./lib/alert.js");
informationCtrl = angular.module('sweetheart',['ngAnimate']).controller('informationCtrl',['$scope',function($scope){
    $scope.person = {};
    var init = function() {
        $.get("/api/getUserInfo.do",function(data){
            $scope.person.sex = data.data.gender;
            $scope.person.nickname = data.data.nickname;
            $scope.person.headurl = data.data.headurl;
            $scope.person.phone= parseInt(data.data.phonenum);
            $scope.person.qq = parseInt(data.data.qq);
            $scope.person.address = data.data.location;
            $scope.skillsed = data.data.goodats;
            $scope.$apply();
        });
        $.get("/api/getGoodat.do",function(data){
            $scope.skills = data;
            $scope.$apply();
        });
    };
    init();
    $scope.chooseSex = function($event) {
        $event.stopPropagation();
        if ($scope.person.sex == '1') {
            $scope.person.sex = '0';
        }
        else {
            $scope.person.sex = '1';
        }
        return false;
    };
    $scope.bindShow = false;
    $scope.showBind = function() {
        if($scope.bindShow == false) {
            $scope.bindShow = true;
        }
        else {
            $scope.bindShow = false;
        }
    };
    $scope.phoneEdit = function($event) {
        
        $event.stopPropagation();
    };
    $scope.sexChooseShow = false;
    $scope.showChooseSex = function() {
        if ($scope.sexChooseShow == false) {
            $scope.sexChooseShow = true;
        }
        else {
            $scope.sexChooseShow = false;
        }
    };
    $scope.sendText = '发送验证码';
    send = false;
    $scope.sendCode = function() {

        if(!send) {
            $.get("/api/getPhoneAuthCode.do",{
                "phoneNum":$scope.person.phone
            },function(data){
                if (data.error_no == 0) {
                    $scope.sendText = '已发送(60)';
                    count = 60;
                    setInterval(function(){
                        count -= 1;
                        strcnt = count;
                        $scope.sendText = '已发送(' + strcnt + ')';
                        $scope.$apply();
                        if (count <= 0) {
                            $scope.sendText = '发送验证码';
                            $scope.$apply();
                            send = false;
                            return false;
                        }
                    },1000);
                    send = true;
                    $scope.$apply();
                }
                else {
                    alertShow("您的请求发送太频繁");
                    $scope.alert = window.alert;
                    $scope.$apply();
                }
            });
        }
    };
    $scope.savePhone = function() {
        $.get("/api/authPhoneCode.do",{
            "authCode":$scope.credit
        },function(data){
            if(data.error_no == '0') {
                showBind();
            }
            else {
                alert(data.message);
            }
        });
    };
    $scope.skillChooseShow = false;
    $scope.showSkillChoose = function($event) {
        $event.stopPropagation();
        if($scope.skillChooseShow == false) {
            $scope.skillChooseShow = true;
        }
        else {
            $scope.skillChooseShow = false;
        }
    };
    $scope.skillsed = [];
    $scope.addSkill = function($event,skill) {
        $event.stopPropagation();
        flag = false;
        for (i in $scope.skillsed) {
            if ($scope.skillsed[i].id == skill.id) {
                flag = true;
                break;
            }
        }
        if(!flag)   $scope.skillsed.push(skill);
        for(i in $scope.skills.data) {
            if($scope.skills.data[i].id == skill.id) {
                if("select" in $scope.skills.data[i] && $scope.skills.data[i].select == "active") {
                    $scope.skills.data[i].select = "";
                }
                else {
                    $scope.skills.data[i].select  = "active" ;
                }
            }
        }
        return false;
    };
    $scope.saveInformation = function() {
        $.post("/api/completionUserInfo.do",{
            location:$scope.person.address,
            qq : $scope.person.qq,
            goodat : function() {
                res = '';
                for(i in $scope.skillsed) {
                    res += $scope.skillsed[i].id + ',';
                }
                res = res.substring(0,res.length-1);
                return res;
            }()
        },function(data){
            if(data.error_no == '0') {
                alertShow("信息更新成功");
                $scope.alert = window.alert;
                $scope.$apply();
            }
            else {
                alertShow(data.data.message);
                $scope.alert = window.alert;
                $scope.$apply();
            }
        });
    };
    $scope.go = function(space) {
        location.href = '/portal/' + space + '.html';  
    };
}]);
informationCtrl.$inject = ['$scope','informationCtrl']; 
