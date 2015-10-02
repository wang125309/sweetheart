require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/angular-touch/angular-touch.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../../../bower_components/swiper/dist/js/swiper.js");
require("./login.js");
informationCtrl = angular.module('sweetheart',['ngAnimate']).controller('informationCtrl',['$scope',function($scope){
    $scope.person = {};
    var init = function() {
        $.get("/api/getUserInfo.do",function(data){
            $scope.person.sex = data.data.gender;
            $scope.person.nickname = data.data.nickname;
            $scope.person.headurl = data.data.headurl;
            $scope.person.phone= data.data.phonenum;
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
            $scope.bindingClass = 'enter';
        }
        else {
            $scope.bindShow = false;
            $scope.bindingClass = '';
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
                    alert("您的请求发送太频繁");
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
    $scope.showSkillChoose = function() {
        if($scope.skillChooseShow == false) {
            $scope.skillChooseShow = true;
            $scope.skillClass = 'enter';
        }
        else {
            $scope.skillChooseShow = false;
            $scope.skillClass = '';
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
    };
    $scope.go = function(space) {
        location.href = '/portal/' + space + '.html';  
    };
}]);
informationCtrl.$inject = ['$scope','informationCtrl']; 
