require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-animate/angular-animate.js");
jQuery = require("../../bower_components/jquery/dist/jquery.js");
require("../../bower_components/bootstrap/dist/js/bootstrap.js");
require("../../bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js");
coachCtrl = angular.module('app',['ngAnimate']).controller('coachCtrl',['$scope',function($scope){
    $scope.nav = 'coach'; 
    $scope.logout = function() {
        jQuery.get("/sys/logout.do",function(data){
            location.href = "/login.html";
        });
    };
}])
.directive('select',function(){
    return {
        link : function(scope,element,attr) {
            jQuery("#subject").multiselect({
                buttonWidth: '567px',
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
});
coachCtrl.$inject = ['$scope','coachCtrl']; 
