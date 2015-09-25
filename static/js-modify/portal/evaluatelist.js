require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
evaluatelistCtrl = angular.module('sweetheart',['ngAnimate']).controller('evaluatelistCtrl',['$scope',function($scope){
    $scope.dialogs = [{
        detail: "首先，从此处下载django-CKEditor: https://github.com/shaunsephton/django-ckeditor，解压下载的文件，安装到django中，（即：从命令行进入刚刚下载解压缩的文件，运行python setup.py install，系统就会自动完成安装。",
        name : "张飞",
        time : "2015.6.8 15:38"
    },{
        detail: "首先，从此处下载django-CKEditor: https://github.com/shaunsephton/django-ckeditor，解压下载的文件，安装到django中，（即：从命令行进入刚刚下载解压缩的文件，运行python setup.py install，系统就会自动完成安装。",
        name : "张飞",
        time : "2015.6.8 15:38"
    }];

}]);
evaluatelistCtrl.$inject = ['$scope','evaluatelistCtrl']; 
