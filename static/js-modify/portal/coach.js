require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
coachCtrl = angular.module('sweetheart',['ngAnimate']).controller('coachCtrl',['$scope',function($scope){
    $scope.video = 'sdfsadf';
    $scope.avatar = 'http://sw.importos.com/res/20150917/fa962006c45646939312b7f7dc6ec425.jpg';
    $scope.person = {
        name : '华雄',
        sex : '0',
        price : '125',

    };
    $scope.skills = '击剑、拳击';
    $scope.dialogs = [{
        detail: "首先，从此处下载django-CKEditor: https://github.com/shaunsephton/django-ckeditor，解压下载的文件，安装到django中，（即：从命令行进入刚刚下载解压缩的文件，运行python setup.py install，系统就会自动完成安装。",
        name : "张飞",
        time : "2015.6.8 15:38"
    },{
        detail: "首先，从此处下载django-CKEditor: https://github.com/shaunsephton/django-ckeditor，解压下载的文件，安装到django中，（即：从命令行进入刚刚下载解压缩的文件，运行python setup.py install，系统就会自动完成安装。",
        name : "张飞",
        time : "2015.6.8 15:38"
    }];
    now = new Date();
    $scope.date = [{
        text : '今天',
        date : '9.24',
        active : true
    },{
        text : '明天',
        date : '9.25',
        active : false
    },{
        text : '9.26',
        date : '9.26',
        active : false
    }];
    $scope.times = ['AM 9:00 - PM 1:00','PM 3:00 - PM : 5:00'];
}]);
coachCtrl.$inject = ['$scope','coachCtrl']; 
