window.alertShow = function(text,okfun) {
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
