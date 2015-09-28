require("../../../bower_components/angular/angular.js");
require("../../../bower_components/angular-animate/angular-animate.js");
require("../../../bower_components/zepto/zepto.js");
require("../../../bower_components/zeptojs/src/touch.js");
coachapplyCtrl = angular.module('sweetheart',['ngAnimate']).controller('coachapplyCtrl',['$scope',function($scope){
    $scope.skills = [{
        name:"搏击",
        choose:false,
        id:1
    },{
        name:"游泳",
        choose:true,
        id:2
    },{
        name:"击剑",
        choose:false,
        id:3
    },{
        name:"自由操",
        choose:true,
        id:4
    },{
        name:"瘦身",
        choose:false,
        id:5
    }];
    $scope.skillShow = true;
    $scope.showSkill = function() {
        if ($scope.skillShow == true) {
            $scope.skillShow = false;
        }
        else {
            $scope.skillShow = true;
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
}])
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
});
coachapplyCtrl.$inject = ['$scope','coachapplyCtrl']; 
