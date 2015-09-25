require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/swiper/dist/js/swiper.js");
require("../../../bower_components/zeptojs/src/touch.js");
newcourseCtrl = angular.module('sweetheart',['ngAnimate']).controller('newcourseCtrl',['$scope',function($scope){
}])
.directive('move',function(){
    return {
        link : function(scope,element,attr) {
            $(document).on('touchmove',function(){
                return false;
            });
            window.onload = function() {   
                var swiper = new Swiper('.swiper-container',{
                    spaceBetween : 10,
                    centeredSlides : true,
                    slidesPerView : 'auto',
                    initialSlide : 0,
                    direction : 'vertical',
                    loopAdditionalSlides : 2,
                    loopedSlides : 60,
                    loop : true
                });
            };
        }
    }
});
newcourseCtrl.$inject = ['$scope','newcourseCtrl']; 
