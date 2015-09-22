require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
calendarCtrl = angular.module('sweetheart',['ngAnimate']).controller('calendarCtrl',['$scope',function($scope){
    initCalender = function() {
        $scope.calendar = [];
        now = new Date();
        date = now.getDate();
        day = now.getDay();
        for (i=1;i<=14;i++) {
            now.setDate(now.getDate() + 1);
            
            c = {
                date : now.getDate(),
                day : now.getDay()
            };

            $scope.calendar.push(c);
        }
    };
    initCalender();
}]);
calendarCtrl.$inject = ['$scope','calendarCtrl']; 
