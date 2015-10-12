require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../../../bower_components/swiper/dist/js/swiper.js");
require("./login.js");
require("../getParams.js");
personalspaceCtrl = angular.module('sweetheart',['ngAnimate']).controller('personalspaceCtrl',['$scope',function($scope){

    p = {};
    id = window.getQueryParams('id');
    if(id){
        p = {
            id : id 
        };
    }
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
                    focusNum : 110,
                    avatar : data.data.coachinfo.headimg,
                    pic : data.data.coachinfo.imagesUrlList, 
                    desc: data.data.coachinfo.description,
                    prize : data.data.coachinfo.winning,
                    video : data.data.coachinfo.video,
                    videoDesc : 'dsfsadfsfdasdfsdfsdfsadfdsafsadf',
                    coachid : data.data.coach_id
                };
                $scope.type = '2';
                $scope.$apply();
            }
        }
    });
    $scope.go = function(space) {
        location.href = '/portal/' + space + '.html';  
    };
    $scope.type = '2';
    $scope.focus = true;
    $scope.goCoach = function() {
        location.href = '/portal/control.html?coach_id=' + $scope.person.coachid;
    };
}])
.directive('move',function(){
    return {
        link : function(scope,element,attr) {
            window.onload = function() {
                setTimeout(function(){
                    var swiper = new Swiper('.swiper-container',{
                        speed : 10,
                        freeMode : true,
                        spaceBetween : 10,
                        slidesPerView : 'auto',
                    });
                },2000);
            };
        }

    }
});
personalspaceCtrl.$inject = ['$scope','personalspaceCtrl']; 
