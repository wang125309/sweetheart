require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/swiper/dist/js/swiper.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("./login.js");
newcourseCtrl = angular.module('sweetheart',['ngAnimate']).controller('newcourseCtrl',['$scope',function($scope){
    $scope.newCourse = function() {
        $.post("/api/openNewPersonalClass.do",$scope.course,function(data){
            if(data.error_no == '0') {
                location.href = "/portal/personalspace.html";
            }
        });
    };
    date = new Date();
    $scope.course = {
        date : localStorage['date']
    };
}])
.directive('move',function(){
    return {
        link : function(scope,element,attr) {
            $(document).on('touchmove',function(){
                return false;
            });
            window.onload = function() {
                var gettime = function() {
                    shour = $("#shour .swiper-wrapper .swiper-slide-active").text();
                    sminute = $("#sminute .swiper-wrapper .swiper-slide-active").text();
                    thour = $("#thour .swiper-wrapper .swiper-slide-active").text();
                    tminute = $("#tminute .swiper-wrapper .swiper-slide-active").text();
                    begintime = shour + "-" + sminute;
                    endtime = thour + "-" + tminute;
                    scope.course.begintime = scope.course.date + "-" + begintime;
                    scope.course.endtime = scope.course.date + "-" + endtime;
                };
                var swiper = new Swiper('.swiper-container',{
                    spaceBetween : 10,
                    centeredSlides : true,
                    slidesPerView : 'auto',
                    initialSlide : 0,
                    direction : 'vertical',
                    loopAdditionalSlides : 2,
                    loopedSlides : 60,
                    loop : true,
                    onInit : function() {
                        gettime();
                    },
                    onSlideChangeEnd : function(swiper){
                        gettime();
                    }
                });
            };
        }
    }
});
newcourseCtrl.$inject = ['$scope','newcourseCtrl']; 
