require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../../../bower_components/swiper/dist/js/swiper.js");
informationCtrl = angular.module('sweetheart',['ngAnimate']).controller('informationCtrl',['$scope',function($scope){
    $scope.person = {
        name : "张翼德",
        sex : "1",
        ordered : 50,
        ordered_new : 1,
        score : 3000,
        focusNum : 110,
        headurl : 'http://sw.importos.com/res/20150917/fa962006c45646939312b7f7dc6ec425.jpg',
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
        desc: '擅长很多别人不能的姿势',
        prize : [
            'dsfasfddsfdsfdsf',
            'dsfdsafsafdsfdsfdsaf',
            'sdfdsafdsafdsffdsa',
        ],
        videoDesc : 'dsfsadfsfdasdfsdfsdfsadfdsafsadf'
    };
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
        }
        else {
            $scope.bindShow = false;
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
    $scope.go = function(space) {
        location.href = '/portal/' + space + '.html';  
    };
}]);
informationCtrl.$inject = ['$scope','informationCtrl']; 
