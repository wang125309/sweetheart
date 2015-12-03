require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-animate/angular-animate.js");
jQuery = require("../../bower_components/jquery/dist/jquery.js");
require("../../bower_components/bootstrap/dist/js/bootstrap.js");
require("../../bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js");
require("../../bower_components/smalot-bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js");
_ = require("../../bower_components/underscore/underscore.js");
subjectCtrl = angular.module('app',['ngAnimate']).controller('subjectCtrl',['$scope',function($scope){
    $scope.nav = 'subject';
    var refrash = function() {
        $scope.course = {};
        jQuery.get("/sys/getAllPublicClass.do",function(data){
            $scope.data = data.root;
            $scope.$apply();
        });
        jQuery.get("/sys/getAllPlace.do",function(data){
            if ("error_no" in data && data.error_no == '1') {
                location.href = "/login.html";
            }
            else {
                $scope.places = data.root;
                $scope.$apply();
            }
        });
        jQuery.get("/sys/getGoodat.do",function(data){
            $scope.skills = data.data; 
            $scope.$apply();
        });
        jQuery.get("/sys/getAllPlace.do",function(data){
            $scope.locations = data.root;
            $scope.location = '选择场地';
            $scope.locationSelect = '选择场地';
            $scope.$apply();
        });
        jQuery.get("/sys/getWeeks.do",function(data){
            $scope.weeks = data.data;
            $scope.week = '选择时间段';
            $scope.weekStart = '选择要复制到的时间段';
            $scope.weekSample = '选择样本时间段';
            $scope.$apply();
        });
    };
    refrash();
    $scope.copy = {};
    $scope.getLocation = function(id,place_name) {
        $scope.copy.location = id;
        $scope.locationSelect = place_name;
    };
    $scope.getWeek = function(numberof,start,end) {      
        $scope.copy.numberof = numberof;
        $scope.weekStart =  '第'+numberof+'周 ' + start + ' ~ ' + end;
    };
    $scope.getWeekSample = function(numberof,start,end) {
        $scope.copy.samplenumberof = numberof;
        $scope.weekSample = '第'+numberof+'周 ' + start + ' ~ ' + end;
    };
    $scope.filter = {};
    $scope.selectLocation = function(id,place_name) {
        $scope.location = place_name;
        $scope.filter.place_id = id;
        jQuery.get("/sys/getPublicClassByWeekAndPlace.do",$scope.filter,function(data){
            $scope.data = data.data;
            $scope.$apply();
        });
    };
    $scope.selectWeek = function(numberof,start,end) {      
        $scope.week = '第'+numberof+'周 ' + start + ' ~ ' + end;
        $scope.filter.numberof = numberof;
        jQuery.get("/sys/getPublicClassByWeekAndPlace.do",$scope.filter,function(data){
            $scope.data = data.data;
            $scope.$apply();
        });
    };
    $scope.addMenu = function() {
        $scope.optText = '添加课程';
        $scope.course = {};
        jQuery("#position+.btn-group>button>span").html("请选择项目");
    };
    
    $scope.optid = function(id) {
        $scope.id = id;
        $scope.optText = '编辑课程';
        jQuery.get("/sys/getPublicClassById.do?publicclass_id="+id,function(data){
            $scope.course = data.root;
            $scope.course.begintime = function() {
                d = new Date(parseInt($scope.course.begintime));
                return (d.getYear()+1900)+'-'+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours()+"-"+d.getMinutes();
            }();
            $scope.course.endtime = function() {
                d = new Date(parseInt($scope.course.endtime));
                return (d.getYear()+1900)+'-'+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours()+"-"+d.getMinutes();
            }();

            $scope.$apply();

            jQuery("#position+.btn-group>button>span").html($scope.course.placeEntity.place_name);
            
            jQuery("#subject+.btn-group>button>span").html(function(){
                res = '';
                for(i in $scope.course.goodats) {
                    res += $scope.course.goodats[i].display+',';
                }
                res.substring(0,res.length-1);
                if(!res.length) {
                    res = '请选择项目';
                }
                return res;
            }());
        });
    };
    $scope.saveCopy = function() {
        jQuery.get("/sys/copyPublicClassByNumble.do",{
            "numberof":$scope.copy.samplenumberof,
            "target":$scope.copy.numberof,
            "place_id":$scope.copy.location
        },function(data){
            if(data.error_no == '0') {
                refrash();
            }
            else {
                alert(data.data.message);
            }
        });
    };
    $scope.deleteid = function(id) {
        $scope.id = id;
    };
    $scope.delete = function() {
        jQuery.get("/sys/deletePublicClass.do?publicclass_id="+$scope.id,function(data){
            if(data.error_no == '0') {
                refrash();
            }
            else {
                alert(data.data.message);
            }
        });
    };

    $scope.logout = function() {
        jQuery.get("/sys/logout.do",function(data){
            location.href = "/login.html";
        });
    };
    
    var formUpload = function(url,form,success,error,errorText) {
        var formdata = new FormData(jQuery(form)[0]);
        jQuery.ajax({
            type : "POST",
            url : url,
            data : formdata,
            processData : false,
            contentType : false,
            beforeSend : function() {
                $scope.process = true;
                $scope.$apply();
            },
            success : function(data) {
                $scope.process = false;
                $scope.$apply();
                if (data.error_no != 0) {
                    alert(errorText);
                }
                else {
                    success();
                }
            },
            error : function() {
                $scope.process = false;
                $scope.$apply();
                error();
            }
        });
    };
    $scope.openPublicClass = function() {
        if($scope.optText != '添加课程') {
            $scope.course.id = $scope.id;
        }
        $scope.course.skills = function() {
            res = '';
            _.each(jQuery("#subject").val(),function(num){ res+=num+','; });
            return res;
        }();
        jQuery.post("/sys/openPublicClass.do",$scope.course,function(data){
            if(data.error_no == '0') {
                refrash();
                if("root" in data) {
                    $scope.publicclass_id = data.root;
                    $scope.$apply();
                }
                if(jQuery("#image-form #image").val()) {
                        formUpload("/sys/insertPublicClassVideoPoster.do","#image-form",function(){
                            refrash();
                        },function(){
                            if(jQuery("#video-form #video").val()) {
                                alert("ajax异常，上传图片出现错误");
                            }
                        },"上传图片时后台异常");

                }
                if(jQuery("#video-form #video").val()) {
                    formUpload("/sys/insertPublicClassVideos.do","#video-form",function(){
                        refrash();
                    },function(){
                        alert("ajax异常，上传视频出现错误");
                    },"上传视频时后台异常"); 
                }
            }
            else {
                alert(data.data.message);
            }
        });


    };
}])
.directive('select',function(){
    return {
        link : function(scope,element,attr) {
            jQuery("#position").multiselect({
                buttonWidth: '567px',
                onDropdownShow : function() {
                    var data = [];
                    for(i in scope.places) {
                        data.push({
                            label : scope.places[i].place_name,
                            value : scope.places[i].id
                        });
                    }
                    jQuery("#position").multiselect('dataprovider',data);
                    jQuery("#position").val(scope.course.address_id);


                    jQuery("#position").multiselect('refresh');
                },
                onChange : function() {
                    scope.course.address_id = jQuery("#position").val();
                    scope.$apply();
                },
                buttonText: function(options, select) {
                    if (options.length == 0) {
                        return '请选择项目';
                    }
                    else if (options.length > 4) {
                        return '已选择多余4个项目';
                    }
                    else {
                        var labels = [];
                        options.each(function() {
                            if (jQuery(this).attr('label') !== undefined) {
                                labels.push(jQuery(this).attr('label'));
                            }
                            else {
                                labels.push(jQuery(this).html());
                            }
                        });
                        return labels.join(', ') + '';
                    }

                }
            });
            jQuery("#subject").multiselect({
                buttonWidth: '567px',
                onDropdownShow : function() {
                    var data = [];
                    for(i in scope.skills) {
                        data.push({
                            label : scope.skills[i].display,
                            value : scope.skills[i].id
                        });
                    }
                    jQuery("#subject").multiselect('dataprovider',data);
                    jQuery("#subject").multiselect('refresh');
                    jQuery("#subject").multiselect('select',function(){
                        arr = [];
                        for(i in scope.course.goodats) {
                            arr.push(scope.course.goodats[i].old_id);
                        }
                        console.log(arr);
                        return arr;
                    }());
                },
                onChange : function() {
                    scope.$apply();
                },
                buttonText: function(options, select) {
                    if (options.length == 0) {
                        return '请选择项目';
                    }
                    else if (options.length > 4) {
                        return '已选择多余4个项目';
                    }
                    else {
                        var labels = [];
                        options.each(function() {
                            if (jQuery(this).attr('label') !== undefined) {
                                labels.push(jQuery(this).attr('label'));
                            }
                            else {
                                labels.push(jQuery(this).html());
                            }
                        });
                        return labels.join(', ') + '';
                    }
                }
            });
        }
    }
})
.directive('datepicker',function(){
    return {
        link:function(scope,element,attr) {
            options = {
                weekStart : 1,
                todayHighlight : true,
                format : 'yyyy-mm-dd-hh-ii',
                language : 'zh-CN',
                autoclose:true,
                minuteStep : 5,
            };
            jQuery("#starttime").datetimepicker(options).on('changeDate',function(){
                scope.course.begintime = jQuery("#starttime").val();
                scope.$apply();
            });
            jQuery("#endtime").datetimepicker(options).on('changeDate',function(){
                scope.course.endtime = jQuery("#endtime").val();
                scope.$apply();
            });
        }
    }
});
subjectCtrl.$inject = ['$scope','subjectCtrl']; 
