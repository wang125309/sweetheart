require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("../getParams.js");
//require("./login.js");
calendarCtrl = angular.module('sweetheart',['ngAnimate']).controller('calendarCtrl',['$scope',function($scope){
    require("./lib/alert.js");
    $scope.date = [];
    $scope.backShow = false;
    $scope.addrShow = false;
    pid = getQueryParams("addr_id");
    $scope.location = '不限';
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
    $scope.showSub = function($event) {
        $event.stopPropagation();
        if($scope.backShow == false) {
            $scope.backShow = true;
            $scope.subShow = true;
        }
        else {
            $scope.backShow = false;
            $scope.subShow = false;
        }
    };
    var getMenu = function() {
        $scope.addrs = [];
        $.get("/api/getAllPlace.do",function(data){
            for(i in data.data) {
                j = {};
                j.name = data.data[i].place_name;
                j.id = data.data[i].id;
                if(data.data[i].id == pid) {
                    j.active = "active";
                    $scope.location = j.name;
                }
                else {
                    j.active = "";
                }
                $scope.addrs.push(j); 
            }

        });
        $.get("/api/getGoodat.do",function(data){
            $scope.subjs = data.data;
            for(i in $scope.subjs) {
                $scope.subjs[i].active = "";
            }
            $scope.subjs.push({
                display:'不限',
                active:"active",
                id : 0
            });
        });
    };
    $scope.subject = '不限';
    $scope.type = '不限';
    getMenu();

    $scope.goAddr = function(id) {
        if(id == -1) {
            location.href = "/portal/calendar.html";
        }
        else {
            location.href = "/portal/calendar.html?addr_id="+id;
        }
    };
    $scope.goSub = function(id) {
        $scope.goodat_id = id;
        changeToDate($scope.currentDate , false, id);
    };
    var setDateToLocalStorage = function(year,month,date) {
        localStorage['calendar'] = year + '-' + month + '-' + date;
    };
    var changeToDate = function( date , can , sub) {
        $scope.currentDate = date;
        var getSubQuery = function(i,num) {
            if(num == 1) {
                line = $scope.cline1;
            }
            else if(num == 2) {
                line = $scope.cline2;
            }
            else {
                line = $scope.cline3;
            }
            if(getQueryParams("addr_id")) {
                queryString = "/api/getPublicClassListByDate.do?addr_id="+ getQueryParams("addr_id")+"&date="+line[i].year+"-"+line[i].month+"-"+line[i].date;
            }
            else {
                queryString = "/api/getPublicClassListByDate.do?&date="+line[i].year+"-"+line[i].month+"-"+line[i].date;
            }
            return sub || $scope.goodat_id ? queryString  +"&goodat_id="+$scope.goodat_id : queryString ;
        };

        for(i in $scope.cline1) {
            if($scope.cline1[i].date == date) {
                $scope.cline1[i].today = true;
                $.get(getSubQuery(i,1),function(data){
                    $scope.cards = data.data;
                    "classes" in $scope.cards && $scope.cards.classes.length ? $scope.cardShow = true : $scope.cardShow = false;
                    $scope.$apply();
                });
            }
            else {
                $scope.cline1[i].today = false;
            }
        }

        for(i in $scope.cline2) {
            if($scope.cline2[i].date == date) {
                $scope.cline2[i].today = true;
            
                $.get(getSubQuery(i,2),function(data){
                    $scope.cards = data.data;
                    "classes" in $scope.cards && $scope.cards.classes.length ? $scope.cardShow = true : $scope.cardShow = false;
                    $scope.$apply();
                });
            }
            else {
                $scope.cline2[i].today = false;
            }
        }
        for(i in $scope.cline3) {
            if($scope.cline3[i].date == date) {
                $scope.cline3[i].today = true;
                $.get(getSubQuery(i,3),function(data){
                    $scope.cards = data.data;
                    "classes" in $scope.cards && $scope.cards.classes.length ? $scope.cardShow = true : $scope.cardShow = false;
                    $scope.$apply();
                });
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
    $scope.goCourse = function(id) {
        location.href = "/portal/course.html?id="+id;
    };
    $scope.change = function(id) {
        location.href = "/portal/newcourse.html?id="+id;
    };
    var frashCalendar = function( first , fun ) {
        getUrl = '/api/getPublicClassListDateByAddress.do';
        if(getQueryParams("addr_id")) {
            getUrl += ("?addr_id="+ getQueryParams("addr_id")); 
        }
        $.get(getUrl,function(data){
            $scope.data = data.data;
            now = new Date();
            addrUrl = "/api/getPublicClassListByDate.do";
            if(getQueryParams("addr_id")) {
                addrUrl += ("?addr_id=" + getQueryParams("addr_id") + "&date=" +now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate());
            }
            else {
                addrUrl += ("?date=" +now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate());            
            }
            $.get(addrUrl,function(data){
                $scope.cards = data.data;
                "classes" in $scope.cards && $scope.cards.classes.length ? $scope.cardShow = true : $scope.cardShow = false;
                $scope.$apply();
            });
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
