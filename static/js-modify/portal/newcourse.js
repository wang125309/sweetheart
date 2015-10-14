require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/swiper/dist/js/swiper.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../getParams.js");
require("./login.js");
newcourseCtrl = angular.module('sweetheart',['ngAnimate']).controller('newcourseCtrl',['$scope',function($scope){
    id = getQueryParams("id");
    if(id) {
        $scope.edit = true;
        $.get("/api/getPersonalClassById.do?id="+id,function(data){
            $scope.course = data.data;
            $scope.$apply();
        });
    }
    else {
        $scope.edit = false;
    }   
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
                id = getQueryParams("id");
                var gettime = function(data) {
                    shour = $("#shour .swiper-wrapper .swiper-slide-active").text();
                    sminute = $("#sminute .swiper-wrapper .swiper-slide-active").text();
                    thour = $("#thour .swiper-wrapper .swiper-slide-active").text();
                    tminute = $("#tminute .swiper-wrapper .swiper-slide-active").text();
                    begintime = shour + "-" + sminute;
                    endtime = thour + "-" + tminute;
                    if(id) {
                        scope.course.date = data.data.begintimefull.split(" ")[0];
                    }
                    scope.course.begintime = scope.course.date + "-" + begintime;
                    scope.course.endtime = scope.course.date + "-" + endtime;
                };
                var makeSwiper = function(name,slide,data) {
                    new Swiper(name,{
                        spaceBetween : 10,
                        centeredSlides : true,
                        slidesPerView : 'auto',
                        loopAdditionalSlides : 2,
                        loopedSlides : 60,
                        loop : true,
                        direction : 'vertical',
                        initialSlide : slide,
                        onInit : function() {
                            gettime(data);
                        },
                        onSlideChangeEnd : function(swiper){
                            gettime(data);
                        }
                    });
                };
                var initSwiper = function(data) {
                    if(id) {
                        begintime = data.data.begintimedisplay;
                        endtime = data.data.endtimedisplay;
                        begintimehour = begintime.split(':')[0];
                        begintimeminute = begintime.split(':')[1];
                        endtimehour = endtime.split(':')[0];
                        endtimeminute = endtime.split(':')[1];
                        bh = parseInt(begintimehour);
                        eh = parseInt(endtimehour);
                        bm = parseInt(begintimeminute);
                        em = parseInt(endtimehour);
                        makeSwiper('#shour.swiper-container',bh,data);
                        makeSwiper('#thour.swiper-container',eh,data);
                        makeSwiper('#sminute.swiper-container',bm,data);
                        makeSwiper('#tminute.swiper-container',em,data);
                    }
                    else {
                        makeSwiper('#shour.swiper-container',0);
                        makeSwiper('#thour.swiper-container',0);
                        makeSwiper('#sminute.swiper-container',0);
                        makeSwiper('#tminute.swiper-container',0);
                    }
                };
                if(id) {
                    $.get("/api/getPersonalClassById.do?id="+id,function(data){
                        scope.course = data.data;
                        initSwiper(data);
                    });
                }
                else {
                    initSwiper();
                }
            };
        }
    }
});
newcourseCtrl.$inject = ['$scope','newcourseCtrl']; 
