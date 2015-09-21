require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../../../bower_components/swiper/dist/js/swiper.js");
personalspaceCtrl = angular.module('sweetheart',['ngAnimate']).controller('personalspaceCtrl',['$scope',function($scope){
    $scope.person = {
        name : "张翼德",
        sex : "1",
        ordered : 50,
        ordered_new : 1,
        score : 3000,
        focusNum : 110,
        avatar : 'http://sw.importos.com/res/20150917/fa962006c45646939312b7f7dc6ec425.jpg',
        pic : [{
            url:'http://sw.importos.com/res/20150917/fa962006c45646939312b7f7dc6ec425.jpg' 
        },{
            url:'http://sw.importos.com/res/20150917/fa962006c45646939312b7f7dc6ec425.jpg'
        },{
            url: 'http://sw.importos.com/res/20150917/fa962006c45646939312b7f7dc6ec425.jpg'
        },{
            url: 'http://sw.importos.com/res/20150917/fa962006c45646939312b7f7dc6ec425.jpg'
        },{
            url: 'http://sw.importos.com/res/20150917/fa962006c45646939312b7f7dc6ec425.jpg'
        },{
            url: 'http://sw.importos.com/res/20150917/fa962006c45646939312b7f7dc6ec425.jpg'
        }],
        desc: '擅长很多别人不能的动作',
        prize : [
            'dsfasfddsfdsfdsf',
            'dsfdsafsafdsfdsfdsaf',
            'sdfdsafdsafdsffdsa',
        ],
        videoDesc : 'dsfsadfsfdasdfsdfsdfsadfdsafsadf'
    };
    $.get("/api/getUserInfo.do",function(data){
        console.log(data); 
    });
    $scope.go = function(space) {
        location.href = '/portal/' + space + '.html';  
    };
    $scope.type = '2';
}])
.directive('move',function(){
    return {
        link : function(scope,element,attr) {
            window.onload = function() {   
                var swiper = new Swiper('.swiper-container',{
                    speed : 500,
                    freeMode : true,
                    spaceBetween : 10,
                    slidesPerView : 'auto',
                    initialSlide : 0
                });
            };
        }

    }
});
personalspaceCtrl.$inject = ['$scope','personalspaceCtrl']; 
