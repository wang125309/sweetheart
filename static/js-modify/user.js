require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-animate/angular-animate.js");
jQuery = require("../../bower_components/jquery/dist/jquery.js");
require("../../bower_components/bootstrap/dist/js/bootstrap.js");
require("../../bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js");
userCtrl = angular.module('app',['ngAnimate']).controller('userCtrl',['$scope',function($scope){
    $scope.nav = 'user'; 
}])
userCtrl.$inject = ['$scope','userCtrl']; 
