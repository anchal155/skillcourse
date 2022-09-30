(function() {
    'use strict';
    
    angular.module('app')
    .controller('DetailsController', DetailsController);
    DetailsController.$inject=['api','$routeParams'];
    
    function DetailsController(api,$routeParams){
        var vm = this;
        
        api.getCourseDetails($routeParams.courseId).then(function(data){
            console.log(data);
            vm.course = data;
        });
      
    }
   
  }());