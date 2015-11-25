require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
require("./login.js");
coachapplyCtrl = angular.module('sweetheart',['ngAnimate']).controller('coachapplyCtrl',['$scope',function($scope){
    $scope.skills = [];
    $scope.videoUpload = "上传视频";
    var refrash = function() {
        $.get("/api/getGoodat.do",function(data){
            for(i in data.data) {
                d = {
                    name : data.data[i].display,
                    id : data.data[i].id,
                    choose : false,
                    class : "unchoose"
                };
                $scope.skills.push(d);
            }
            $scope.$apply();
        });
    };
    refrash();
    $scope.skillShow = true;
    $scope.showSkill = function() {
        if ($scope.skillShow == true) {
            $scope.skillShow = false;
        }
        else {
            $scope.skillShow = true;
        }
    };
    $scope.coach = {
        realname : '',
        age : '',
        idcard : '',
        description : '',
        winning : '',
        skills : ''
    };
    $scope.creditUpText = '+ 点击上传';
    $scope.creditDownText = '+ 点击上传';
    $scope.chooseSkill = function(id) {
        for(i in $scope.skills) {
            if($scope.skills[i].id == id) {
                $scope.skills[i].choose = !$scope.skills[i].choose;
                if($scope.skills[i].class == 'unchoose') {
                    $scope.skills[i].class = 'choose';
                    $scope.coach.skills += ','+$scope.skills[i].id;
                }
                else {
                    $scope.skills[i].class = 'unchoose';
                    s = $scope.coach.skills.split(",");
                    for (j in s) {
                        if (s[j] == $scope.skills[i].id) {
                            if(!s.splice(j,1)) {
                                s.pop();
                            }
                        }
                    }
                    res = '';
                    for (j in s) {
                        res += ',' + s[j];
                    }
                    $scope.coach.skills = res;
                }
                break;
            }
        }
    };
    $scope.pics = [];
    $scope.images = [1];
    $scope.addPic = function() {
        $("#input"+$scope.images.length).click();
    };
    $scope.addVideo = function() {
        $("#video").click();
    };
    $scope.addAvatar = function() {
        $("#avatar-input").click();
    };
    $scope.addBanner = function() {
        $("#banner-input").click();
    };
    $scope.addCreditUp = function() {
        $("#credit-up").click();
    };
    $scope.addCreditDown = function() {
        $("#credit-down").click();
    };
    var alertShow = function(text,okfun) {
        $scope.alert = {
            text : text, 
            sure : "确定",
            cancel : "取消",
            show : true,
            ok : function() {
                $scope.alert.show = false;
                okfun();
            },
            not : function() {
                $scope.alert.show = false;
            }
        };
        $scope.$apply();
    };
    var formUpload = function(url,form,success,error,errorText,uploadingText) {
        var formdata = new FormData($(form)[0]);
        $.ajax({
            type : "POST",
            url : url,
            data : formdata,
            processData : false,
            contentType : false,
            beforeSend : function() {
                $scope.processing = true;
                $scope.uploadingText = uploadingText;
                $scope.$apply();
            },
            success : function(data) {
                if (data.error_no != 0) {
                    alertShow(errorText);
                    $scope.processing = false;
                    $scope.$apply();
                }
                else {
                    success();
                }
            },
            error : function() {
                error();
                $scope.processing = false;
                $scope.$apply();
            }
        });
    };
    var insertAvatar = function() {
        formUpload("/api/insertCoachImagesHeadImage.do","#avatar-form",function(){
            insertBanner();
        },function(){
            alertShow("ajax错误，头像上传失败");
        },"头像上传失败","头像上传中...");
    };

    var insertBanner = function() {
        formUpload("/api/insertCoachImagesHorizontal.do","#banner-form",function(){
            insertCard();
        },function(){
            alertShow("ajax错误，展示图上传失败");
        },"展示图上传失败","展示图上传中...");
    };
    var insertVideo = function() {
        formUpload("/api/insertCoachVideos.do","#video-form",function(){
            $scope.processing = false;
            $scope.$apply();
            alertShow("资料上传成功，请耐心等待审批",function(){
                location.href = '/portal/personalspace.html';
            });
        },function(){
            alertShow("ajax错误，视频上传失败");
        },"视频上传失败","视频上传中...");
    };
    var insertCard = function() {
        formUpload("/api/insertCoachImagesIDCardImage.do","#credit-form",function(){
            insertVideo();
        },function(){
            alertShow("ajax错误，认证照片上传失败");
        },"认证照片上传失败","认证照片上传中");
    };
    var insertImages = function() {
        formUpload("/api/insertCoachImages.do","#image-form",function(){
            insertVideo();
        },function(){
            alertShow("ajax错误，生活照上传失败");
        },"生活照上传失败","生活照上传中...");
    };

    $scope.save = function() {
        check = false;
        if(!check) {
            $.post('/api/userToCoach.do',$scope.coach,function(data){
                if(data.error_no == '0') {
                    insertImages();
                }
                else {
                    alertShow("信息填写失败，您可能已经是教练了");
                    $scope.processing = false;
                    $scope.$apply();
                }
            });
        } 
    };
}])
.directive('videoUpload',function(){
    return {
        link : function(scope,element,attr) {
            element.on('change',function(){
                f = element[0].value.split("\\");
                scope.videoUpload = f[f.length - 1];
                scope.$apply();
            });
        }
    }
})
.directive('fileUpload',function(){
    return {
        link : function(scope,element,attr) {
            element.on('change',function(){
                var fReader = new FileReader();
                file_element = $("#input"+scope.images.length)[0];
                console.log(file_element);
                fReader.readAsDataURL(file_element.files[0]);
                fReader.onloadend = function(event) {
                    upload_image = event.target.result;
                    l = scope.images.length;
                    scope.pics.push({
                        image:"background-image:url("+upload_image+")",
                    });
                    scope.images.push(1);
                    scope.$apply();
                }
            });
        }
    }
})
.directive('avatarUpload',function(){
    return {
        link : function(scope,element,attr) {
            element.on('change',function(){
                var fReader = new FileReader();
                file_element = $("#avatar-input")[0];
                fReader.readAsDataURL(file_element.files[0]);
                fReader.onloadend = function(event) {
                    upload_image = event.target.result;
                    scope.avatar = 'background-image:url("'+ upload_image +'")';
                    scope.avatarUploaded = true;
                    scope.$apply();
                }
            });
        }
    }
})
.directive('bannerUpload',function(){
    return {
        link : function(scope,element,attr) {
            element.on('change',function(){
                var fReader = new FileReader();
                file_element = $("#banner-input")[0];
                fReader.readAsDataURL(file_element.files[0]);
                fReader.onloadend = function(event) {
                    upload_image = event.target.result;
                    scope.banner = 'background-image:url("'+ upload_image +'")';
                    scope.bannerUploaded = true;
                    scope.$apply();
                }
            });
        }
    }
})
.directive('creditUploadUp',function(){
    return {
        link : function(scope,element,attr) {
            element.on('change',function() {
                var fReader = new FileReader();
                file_element = $("#credit-up")[0];
                fReader.readAsDataURL(file_element.files[0]);
                fReader.onloadend = function(event) {
                    upload_image = event.target.result;
                    scope.creditUpImage = 'background-image:url("'+ upload_image +'")';
                    scope.creditUpText = '';
                    scope.$apply();
                }
            });
        }
    }
})
.directive('creditUploadDown',function(){
    return {
        link : function(scope,element,attr) {
            element.on('change',function() {
                var fReader = new FileReader();
                file_element = $("#credit-down")[0];
                fReader.readAsDataURL(file_element.files[0]);
                fReader.onloadend = function(event) {
                    upload_image = event.target.result;
                    scope.creditDownImage = 'background-image:url("'+ upload_image +'")';
                    scope.creditDownText = '';
                    scope.$apply();
                }
            });
        }
    }
});

coachapplyCtrl.$inject = ['$scope','coachapplyCtrl']; 
