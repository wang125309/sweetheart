require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
controlCtrl = angular.module('sweetheart',['ngAnimate']).controller('controlCtrl',['$scope',function($scope){
    initCalender = function() {
        $scope.calendar = [];
        now = new Date();
        date = now.getDate();
        day = now.getDay();
        $scope.calendar.push({
            date : now.getDate(),
            day : now.getDay(),
            active : true,
            today : true
        });
        for( i=0 ; i < day ; i++ ) {
            now.setDate(now.getDate() - 1);
            c = {
                date : now.getDate(),
                day : now.getDay(),
                active : false,
                today : false
            };
            $scope.calendar.push(c);
        }
        $scope.calendar.reverse();
        for (i=1;i<=14;i++) {
            now.setDate(now.getDate() + 1);
            c = {
                date : now.getDate(),
                day : now.getDay(),
                active : true,
                today : false
            };
            $scope.calendar.push(c);
        }
        cl = $scope.calendar.length;
        for(i=0;i<21-cl;i++) {
            now.setDate(now.getDate()+1);
            c = {
                date : now.getDate(),
                day : now.getDay(),
                active : false,
                today : false
            };
            $scope.calendar.push(c);
        }
        $scope.cline1 = [];
        $scope.cline2 = [];
        $scope.cline3 = []; 

        for(i=0;i< $scope.calendar.length;i++) {
            console.log(i);
            if (i < 7) {
                $scope.cline1.push($scope.calendar[i]);
            }
            else if(i>=7&&i<14) {
                $scope.cline2.push($scope.calendar[i]);
            }
            else {
                $scope.cline3.push($scope.calendar[i]);
            }
        }
        for(i in $scope.cline3) {
            console.log($scope.cline3[i].date);
        }
    };
    initCalender();
    $scope.cards = [{
        time : 'AM 8:00 - AM 10:00',
        price : '135每小时',
        address : '台湾',
        status : '0',
        id : 0
    },{
        time : 'AM 8:00 - AM 10:00',
        price : '135每小时',
        address : '台湾',
        status : '1',
        id : 1
    }];
}]);
controlCtrl.$inject = ['$scope','controlCtrl']; 
