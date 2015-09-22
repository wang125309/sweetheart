require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-animate/angular-animate.js");
jQuery = require("../../bower_components/jquery/dist/jquery.js");
require("../../bower_components/bootstrap/dist/js/bootstrap.js");
require("../../bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js");
shopCtrl = angular.module('app',['ngAnimate']).controller('shopCtrl',['$scope',function($scope){
    $scope.nav = 'shop';
    $scope.logout = function() {
        jQuery.get("/sys/logout.do",function(data){
            location.href = "/login.html";
        });
    };
    var refrash = function() {
        jQuery.get("/sys/getGoodsList.do",function(data){
            if ("error_no" in data && data.error_no == '1') {
                location.href = "/login.html";
            }

            $scope.data = data.root;
            $scope.$apply();
        });
    };
    refrash();
    $scope.save = function() {
        formdata = new FormData(jQuery("#add-form")[0]);
        jQuery.ajax({
            type:"POST",
            url:"/sys/addGoods.do",
            data:formdata,
            processData:false,
            contentType:false,
            success: function(data) {
                alert("上传成功");
                refrash();
            },
            error : function(data) {
                alert("文件上传失败");
            }
        });
    };
    $scope.deleteKey = "";
    $scope.delete = function(xkey) {
        $scope.deleteKey = xkey;
    };
    $scope.onGood = function(id){
        jQuery.post("/sys/updateGoodsStatus.do",{
            "ids":id,
            "status":1
        },function(data){
            console.log(data);
            refrash();
        });
    };
    $scope.offGood = function(id){
        jQuery.post("/sys/updateGoodsStatus.do",{
            "ids":id,
            "status":2
        },function(data){
            console.log(data);
            refrash();
        });
    };
    $scope.doDelete = function() {
        jQuery.post("/sys/removeSysConstant.do",{
            "xkeys":$scope.deleteKey
        },function(data){
            console.log(data);
            refrash();
        });
    };
    $scope.edit = {
        id : "",
        name : "",
        description : "",
        price : "",
        now_stock : ""
    };

    $scope.editForm = function(id,name,description,price,now_stock) {
        $scope.edit.id = id;
        $scope.edit.name = name;
        $scope.edit.description = description;
        $scope.edit.price = price;
        $scope.edit.now_stock = now_stock;
    };
    $scope.saveEdit = function() {
        formdata = new FormData(jQuery("#edit-form")[0]);
        jQuery.ajax({
            type:"POST",
            url:"/sys/updateGoodsByParam.do",
            data:formdata,
            processData:false,
            contentType:false,
            success: function(data) {
                refrash();
            },
            error : function(data) {
                alert("修改失败");
            }
        });
    };
}]);
shopCtrl.$inject = ['$scope','shopCtrl']; 
