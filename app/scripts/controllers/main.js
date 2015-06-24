'use strict';

/**
 * @ngdoc function
 * @name multiplyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the multiplyApp
 */
angular.module('multiplyApp')
    .controller('InlineEditorController', function($scope) {

        $scope.greeting = 'Hola Amigos!';

	})
    .controller('CostingController', function($scope, $http) {

    	// retrieve grade data
        var gradeChoice = 0;

        function callData(gradeChoice){
        	$http.get('database.json').
	            success(function(data) {

	                data = data.results[gradeChoice];

	                $scope.costs = [
	                    data.costs[0],
	                    data.costs[1],
	                    data.costs[2],
	                    data.costs[3],
	                    data.costs[4],
	                    data.costs[5],
	                    data.costs[6]
	                ];
	            }).
	            error(function(data) {
	                alert(data);
	            });
	    }

	    
	    callData(0);

	    //change grade data on drop down change
        $('select').on('change', function() {
            gradeChoice = $(this).val();

            callData(gradeChoice);

    	});

	    console.log(gradeChoice);

	    $scope.toggleMoreInfo = function() {
            this.moreInfo = !this.moreInfo;
        };



	    $scope.toggleActive = function(c) {
	        c.active = !c.active;
	    };

	    $scope.total = function() {

	        var total = 0;

	        angular.forEach($scope.costs, function(c) {
	            if (c.active) {
	                total += c.value;
	            }
	        });

	        return total;
	    };

	});
       