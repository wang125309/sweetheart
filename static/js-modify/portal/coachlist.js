require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("./login.js");
coachlistCtrl = angular.module('sweetheart',['ngAnimate']).controller('coachlistCtrl',['$scope',function($scope){
    var refrash = function(sex,subject,sb) {
        url = "/api/getCoachsByPara.do";
        p = {};
        if (sex) {
            p.sex = sex;
        }
        if (subject) {
            p.subject = subject;
        }
        if (!sb) {
            $.get("/api/getGoodat.do",function(data){
                $scope.subjects = data.data;
                $scope.subject = '不限';
            });
        }
        else {
            $scope.subject = sb;
        }
        $.get(url,p,function(data){
            $scope.cards = [];
            for(i in data.data) {
                $scope.cards.push({
                    name : data.data[i].displayname,
                    sex : data.data[i].gender,
                    url : data.data[i].horizontalimg,
                    location : '北京',
                    id : data.data[i].userid,
                    cid : data.data[i].id
                });
            }
            $scope.$apply();
        });
    };
    refrash();
    $scope.filterSex = 0;
    $scope.filterSubject = 0;
    $scope.chooseSex = function($event,sex) {
        $scope.filterSex = sex;
        if(sex == 0) {
            $scope.sex = '不限';
        }
        else if(sex == 1) {
            $scope.sex = '男';
        }
        else if(sex == 2) {
            $scope.sex = '女';
        }
        refrash($scope.filterSex,$scope.filterSubject);
    };
    $scope.chooseSubject = function($event,id,subject) {
        $scope.filterSubject = id;
        refrash($scope.filterSex,$scope.filterSubject,subject);
    };
    $scope.goPersonSpace = function(id,cid) {
        if(id) location.href = "/portal/coach.html?id=" + id+"&coachid=" + cid;
    };
    $scope.locations = ["北京","日本","深蓝健身俱乐部","绿色俱乐部"];
    $scope.location = $scope.locations[0];
    $scope.sex = "不限";
    $scope.filter_location = function($event) {
        $scope.location_pull_down = !$scope.location_pull_down;
    };
    $scope.filter_sex = function($event) {
        $scope.sex_pull_down = !$scope.sex_pull_down;
    };
    $scope.filter_subject = function($event) {
        $scope.subject_pull_down = !$scope.subject_pull_down;
    };
    $scope.location_pull_down = false;
    $scope.sex_pull_down = false;
    $scope.subject_pull_down = false;
}]);
coachlistCtrl.$inject = ['$scope','coachlistCtrl']; 
