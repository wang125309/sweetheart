require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/angular-sanitize/angular-sanitize.min.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../../../bower_components/swiper/dist/js/swiper.js");
require("../getParams.js");
require("./lib/alert.js");
require("./login.js");
personalspaceCtrl = angular.module('sweetheart',['ngAnimate','ngSanitize']).controller('personalspaceCtrl',['$scope','$sce',function($scope,$sce){
    p = {};
    id = window.getQueryParams('id');
    if(id){
        p = {
            id : id 
        };
    }
    $scope.goMyOrdered = function() {
        location.href = "/portal/ordered.html";
    };
    var refrash = function() {
        $.get("/api/getUserInfo.do",p,function(data){
            if(data.error_no == '0') {
                if(data.data.iscoach == false) {
                    $scope.type = '1';
                    $scope.person = {
                        avatar : data.data.headurl,
                        name : data.data.nickname,
                        score : data.data.score,
                    }
                    $scope.$apply();
                }
                else {
                    $scope.person = {
                        name : data.data.coachinfo.displayname,
                        sex : data.data.gender,
                        ordered : 50,
                        ordered_new : 1,
                        score : data.data.score,
                        focusNum : data.data.coachinfo.likecount,
                        avatar : data.data.coachinfo.headimg,
                        pic : data.data.coachinfo.imagesUrlList, 
                        desc: data.data.coachinfo.description,
                        prize : data.data.coachinfo.winning,
                        video : $sce.trustAsResourceUrl(data.data.coachinfo.video),
                        coachid : data.data.coach_id,
                        
                    };
                    $scope.focus = data.data.coachinfo.like;
                    $scope.skills = data.data.coachinfo.goodats;
                    if(id) {
                        $scope.self = data.data.self;
                    }
                    else {
                        $scope.self = true;
                    }
                    $scope.type = '2';
                    $scope.$apply();
                }
            }
        });
    };
    refrash();
    $scope.goMyFocus = function() {
        location.href = '/portal/focuslist.html';
    };
    $scope.goFocusMe = function() {
        location.href = '/portal/focuslist.html?type=me&&coach_id='+$scope.person.coachid;
    };
    $scope.focusOn = function() {
        $.get("/api/likeCoach.do?coach_id="+$scope.person.coachid,function(data){
            if(data.error_no == '0') {
                alertShow("关注成功");
                $scope.alert = window.alert;
                refrash();
                $scope.$apply();
            }
        });
        $scope.alert = window.alert;
    };
    $scope.go = function(space) {
        location.href = '/portal/' + space + '.html';  
    };
    $scope.type = '2';
    $scope.goCoach = function() {
        location.href = '/portal/coach.html?coachid=' + $scope.person.coachid+"&id="+id;
    };
    $scope.goControl = function() {
        location.href = '/portal/control.html';
    };
    $scope.details = false;
    $scope.showDetails = function(i) {
        $scope.details = true;
        if(!bigswiper) {
            setTimeout(function(){
                bigswiper = new Swiper('.image-slide.swiper-container',{
                    speed:5,
                    initialSlide : i,
                    slidesPerView : 1,
                    pagination : '.swiper-pagination'
                });
            },500);
        }
        else {
            bigswiper.slideTo(i,0,false);
        }
    };
    var bigswiper;
    $scope.hideDetails = function() {
        $scope.details = false;
    };
}])
.directive('move',function(){
    return {
        link : function(scope,element,attr) {
            window.onload = function() {
                setTimeout(function(){
                    var swiper = new Swiper('.image-area.swiper-container',{
                        speed : 10,
                        freeMode : true,
                        spaceBetween : 10,
                        slidesPerView : 'auto',
                    });

                },500);
            };
        }

    }
});

personalspaceCtrl.$inject = ['$scope','personalspaceCtrl']; 
