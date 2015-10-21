require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
calendarCtrl = angular.module('sweetheart',['ngAnimate']).controller('calendarCtrl',['$scope',function($scope){

    require("./lib/alert.js");
    $scope.date = [];
    $scope.backShow = false;
    $scope.addrShow = false;
    $scope.cards = [{
        background : '/res/20151014/4fbb77a927254f16a80ac2ff6fe7c5ae.jpeg'
    },{
        background : '/res/20151014/4fbb77a927254f16a80ac2ff6fe7c5ae.jpeg'
    
    }];
    $scope.showAddr = function($event) {
        $event.stopPropagation();
        if($scope.backShow == false) {
            $scope.backShow = true;
            $scope.addrShow = true;
        }
        else {
            $scope.backShow = false;
            $scope.addrShow = false;
        }
    };
    $scope.addrs = [{
        active : "active",
        name : '不限'
    },{
        active : "",
        name : '北京伯乐铺子健身中心'
    },{
        active : "",
        name : '北京吃饱健身中心'
    },{
        active : "",
        name : '北京有缘健身中心'
    }];
    setDateToLocalStorage = function(year,month,date) {
        localStorage['calendar'] = year + '-' + month + '-' + date;
    };
    changeToDate = function( date , can ) {
        $scope.currentDate = date;
        for(i in $scope.cline1) {
            if($scope.cline1[i].date == date) {
                $scope.cline1[i].today = true;
                setDateToLocalStorage($scope.cline1[i].year,$scope.cline1[i].month,$scope.cline1[i].date);
            }
            else {
                $scope.cline1[i].today = false;
            }
        }
        for(i in $scope.cline2) {
            if($scope.cline2[i].date == date) {
                $scope.cline2[i].today = true;
                setDateToLocalStorage($scope.cline2[i].year,$scope.cline2[i].month,$scope.cline2[i].date);
            }
            else {
                $scope.cline2[i].today = false;
            }
        }
        for(i in $scope.cline3) {
            if($scope.cline3[i].date == date) {
                $scope.cline3[i].today = true;
                setDateToLocalStorage($scope.cline3[i].year,$scope.cline3[i].month,$scope.cline3[i].date);
            }
            else {
                $scope.cline3[i].today = false;
            }
        }
    };
    $scope.changeToDate = changeToDate;
    initCalender = function() {
        $scope.calendar = [];
        now = new Date();
        date = now.getDate();
        day = now.getDay();

        $scope.calendar.push({
            year : now.getFullYear(),
            month : now.getMonth()+1,
            date : now.getDate(),
            day : now.getDay(),
            active : true,
            today : true,
            can : false
        });
        setDateToLocalStorage(now.getFullYear(),now.getMonth()+1,now.getDate());
        for( i=0 ; i < day ; i++ ) {
            now.setDate(now.getDate() - 1);
            c = {
                year : now.getFullYear(),
                month : now.getMonth()+1,
                date : now.getDate(),
                day : now.getDay(),
                active : false,
                today : false,
                can : false
            };
            $scope.calendar.push(c);
        }
        $scope.calendar.reverse();
        now.setDate(now.getDate()+day);
        for (i=1;i<=14;i++) {
            now.setDate(now.getDate() + 1);
            c = {
                year : now.getFullYear(),
                month : now.getMonth()+1,
                date : now.getDate(),
                day : now.getDay(),
                active : true,
                today : false,
                can : false
            };
            $scope.calendar.push(c);
        }
        cl = $scope.calendar.length;
        for(i=0;i<21-cl;i++) {
            now.setDate(now.getDate()+1);
            c = {
                year : now.getFullYear(),
                month : now.getMonth()+1,
                date : now.getDate(),
                day : now.getDay(),
                active : false,
                today : false,
                can : false
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
    };
    initCalender();
    $scope.change = function(id) {
        location.href = "/portal/newcourse.html?id="+id;
    };
    var frashCalendar = function( first , fun ) {
        $.get("/api/getPersonalClassListBySession.do",function(data){
            $scope.data = data.data.list;
            $scope.self = data.data.self;
            for(i in $scope.data) {
                $scope.date.push($scope.data[i].date);
            }
            for(i in $scope.cline1) {
                for(j in $scope.date) {
                    if($scope.date[j].split("-")[2] == $scope.cline1[i].date) {
                        $scope.cline1[i].can = true;
                    }
                }
            }
            for(i in $scope.cline2) {
                for(j in $scope.date) {
                    if($scope.date[j].split("-")[2] == $scope.cline2[i].date) {
                        $scope.cline2[i].can = true;                
                    }
                }
            }
            for(i in $scope.cline3) {
                for(j in $scope.date) {
                    if($scope.date[j].split("-")[2] == $scope.cline3[i].date) {
                        $scope.cline3[i].can = true;                
                    }
                }
            }
            if (first) {
                now = new Date();
                changeToDate(now.getDate(),false);
            }
            if (fun) {
                changeToDate($scope.currentDate,false);
            } 
            $scope.$apply();
        });
    };

    frashCalendar(1);
}]);
calendarCtrl.$inject = ['$scope','calendarCtrl']; 
