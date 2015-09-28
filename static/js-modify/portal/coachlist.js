require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("./login.js");
coachlistCtrl = angular.module('sweetheart',['ngAnimate']).controller('coachlistCtrl',['$scope',function($scope){
    var refrash = function(sex,subject) {
        url = "/api/getCoachsByPara.do";
        p = {};
        if (sex) {
            p.sex = sex;
        }
        if (subject) {
            p.subject = subject;
        }
        $.get(url,p,function(data){
            $scope.cards = [];
        
            for(i in data.data) {
                $scope.cards.push({
                    name : data.data[i].nickname,
                    sex : data.data[i].gender,
                    url : data.data[i].headurl,
                    location : '北京'
                });
                alert(data.data[i].nickname);
            }
        });
    }
    refrash();
    
    $scope.locations = ["北京","日本","深蓝健身俱乐部","绿色俱乐部"];
    $scope.subjects = ["柔道","散打","瑜伽","举重","击剑"];
    $scope.subject = $scope.subjects[0];
    $scope.location = $scope.locations[0];
    $scope.sex = "不限";
    $scope.location_pull_down = function() {
        return false;
    };
    $scope.sex_pull_down = function() {
        return false;
    };
    $scope.subject_pull_down = function() {
        return false;
    };
}]);
coachlistCtrl.$inject = ['$scope','coachlistCtrl']; 
