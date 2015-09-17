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
            },
            error : function(data) {
                alert("文件上传失败");
            }
        });
        jQuery.post("/sys/insertSysConstant.do",$scope.add,function(data){
            if (data.error_no == '0') refrash();
        });
    };
    $scope.deleteKey = "";
    $scope.delete = function(xkey) {
        $scope.deleteKey = xkey;
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
        jQuery.post("/sys/editSysConstant.do",$scope.edit,function(data){
            console.log(data);
            refrash();
        }); 
    };
}]);
shopCtrl.$inject = ['$scope','shopCtrl']; 
