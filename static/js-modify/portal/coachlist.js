require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("./login.js");
coachlistCtrl = angular.module('sweetheart',['ngAnimate']).controller('coachlistCtrl',['$scope',function($scope){
    var refrash = function(sex,subject,sb,place_id) {
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
        if(place_id) {
            p.place_id = place_id;
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
                    cid : data.data[i].id,
                    skill : function() {
                        res = "";
                        for(j in data.data[i].goodats) {
                            res += data.data[i].goodats[j].display + ",";
                        }
                        res = res.substring(0,res.length-1);
                        return res;
                    }()
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
    $scope.chooseLocation = function(id) {
        refrash($scope.filterSex,$scope.filterSubject,0,id);
    };
    $.get("/api/getAllPlace.do",function(data){
        $scope.locations = data.data;
    });
    $scope.location = '不限';
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
