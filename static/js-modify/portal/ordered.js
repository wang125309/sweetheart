require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
orderedCtrl = angular.module('sweetheart',['ngAnimate']).controller('orderedCtrl',['$scope',function($scope){
    $scope.card = [{
        title : '山无棱天地合',
        course : '瑜伽',
        time : '周三下午一点',
        address : '北京德云社',
        phone : '18548758751',
        id : 'AJK42145456'
    },{
        title : '衍生会馆',
        course : '瑜伽',
        time : '周三下午一点',
        address : '北京德云社',
        phone : '18548758751',
        id : 'AJK42145456'
    }];
}]);
orderedCtrl.$inject = ['$scope','orderedCtrl']; 
