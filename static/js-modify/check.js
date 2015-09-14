require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-animate/angular-animate.js");
jQuery = require("../../bower_components/jquery/dist/jquery.js");
require("../../bower_components/bootstrap/dist/js/bootstrap.js");
require("../../bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js");
require("../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js");
require("../../bower_components/bootstrap-datepicker/js/locales/bootstrap-datepicker.zh-CN.js");
checkCtrl = angular.module('app',['ngAnimate']).controller('checkCtrl',['$scope',function($scope){
    $scope.nav = 'check'; 
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
})
checkCtrl.$inject = ['$scope','checkCtrl']; 
