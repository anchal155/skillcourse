
(function (){
    'use strict';

    angular.module('app')
    .controller('CoursesController', CoursesController);
    CoursesController.$inject=['api'];
    function CoursesController(api){
        var vm=this;
        api.getCourses().then(function(data){
            vm.courses = data;
        })

    }
  }());