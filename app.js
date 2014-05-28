

var boxes = angular.module("boxes", []);

 boxes.controller('MainCtrl', ['$scope', 'colorService', function ($scope, colorService) {


 			$scope.charts ={ 
 					red:[],
 					blue:[],
 					green:[],
 					orange:[],
 					purple:[],
 					yellow:[]
 				};

 			  $scope.service = colorService;
 			  $scope.length='0';

 			  $scope.$watch('service.getColor("green")', function(newVal) {
 					$scope.green=colorService.getColor("green");	
 					$scope.charts.green.push($scope.green);
		            $('.greenChart').sparkline($scope.charts.green);
		            $scope.draw();
 			  })

 			  $scope.$watch('service.getColor("orange")', function(newVal) {
 					$scope.orange=colorService.getColor("orange");	
 					$scope.charts.orange.push($scope.orange);
		            $('.orangeChart').sparkline($scope.charts.orange);
		            $scope.draw();
 			  })

 			  $scope.$watch('service.getColor("purple")', function(newVal) {
 					$scope.purple=colorService.getColor("purple");
					$scope.charts.purple.push($scope.purple);
					$('.purpleChart').sparkline($scope.charts.purple);
					$scope.draw();
 			  })

 			  $scope.$watch('service.getColor("red")', function(newVal) {
 					$scope.red=colorService.getColor("red");	
 					$scope.charts.red.push($scope.red);
 					$('.redChart').sparkline($scope.charts.red);
		            $scope.draw();
 			  }) 			   			   			  

 			  $scope.$watch('service.getColor("blue")', function(newVal) {
 					$scope.blue=colorService.getColor("blue");	
 					$scope.charts.blue.push($scope.blue);
		            $('.blueChart').sparkline($scope.charts.blue);
		            $scope.draw();
 			  })

 			  $scope.$watch('service.getColor("yellow")', function(newVal) {
 					$scope.yellow=colorService.getColor("yellow");
 					$scope.charts.yellow.push($scope.yellow);
		            $('.yellowChart').sparkline($scope.charts.yellow);
		            $scope.draw();
 			  })

 			  $scope.getLength = function() {
 			  		$scope.length=$scope.items.length;

 			  };

 			  $scope.draw = function() {
							$(".breakdown").sparkline([$scope.red,
		                						   $scope.green,
		                						   $scope.blue,
		                						   $scope.yellow,
		                						   $scope.purple,
		                						   $scope.orange], {
    						type: 'pie',
    						width: '300',
    						height: '300',
    						sliceColors: ['red','green','blue','yellow','purple','orange']});

 			  };
 		
	
}])

boxes.factory('colorService', [ function () {
	var colors = {
		red:0,
		blue:0,
		yellow:0,
		green:0,
		orange:0,
		purple:0
	}

	var setColor = function(color, val) {
		colors[color] = val;
	};

	var getColor = function(color) {
		return colors[color];
	};

	var getColors = function() {
		return colors;
	};

	return {
		getColors:getColors,
		getColor:getColor,
		setColor:setColor		

	};
}]);

boxes.directive('box', ['colorService', function (colorService) {
		return {
				
				restrict : "E",
				replace : true,
	 		    template : "<div class='box'></div>",
				 
				 controller: function($scope) {
				 	$scope.colorCheck = {
				 		red:false,
				 		blue:false,
				 		yellow:false,
				 		green:false,
				 		purple:false,
				 		orange:false
				 	}

				 	var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
				 	
				 	$scope.countColors = function(element) {
				 		  
				 		var colorsObj = colorService.getColors();
				 	 	var color = colors[Math.floor(Math.random()*colors.length)];
						for (var i=0;i<colors.length;i++) {
		                    element.removeClass(colors[i]);
		                }

		                element.addClass(color).addClass('current');    
		                  
	               		if (!$scope.colorCheck[color]) {
							var colorValue = eval('colorsObj.'+color);
							colorValue++;	
							$scope.$apply(colorService.setColor(String(color), colorValue));
							$scope.colorCheck[color] = true;

							for (var i=0; i<colors.length;i++) {
								if (color != colors[i]) {
									if ($scope.colorCheck[colors[i]]) {
										$scope.colorCheck[colors[i]] = false
										var colorValue = eval('colorsObj.'+colors[i]);
										colorValue--;
										$scope.$apply(colorService.setColor(String(colors[i]), colorValue));											
									}
									
									
								}
							}
						}
					}
				},
        		link: function(scope,element,attr) {
        			  
		              element.on('mouseenter',function() {
		                 
		                 var $boxes = $('.box');                 
		                 $boxes.removeClass('current');



		                scope.countColors(element);

		              })
         		}
		}
}])

boxes.directive('whenScrolled', function() {
    return {
    	link: 	function(scope, elm, attr) {
	        var raw = elm[0];
	       
	        elm.bind('scroll', function() {
	            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
	                scope.$apply(attr.whenScrolled);
	            }
	        })
	    },
        controller :  function($scope) {
				$scope.items = [];
    
			    var counter = 0;
    			$scope.loadMore = function(amount) {
    					if (!amount) {amount=50}
				        for (var i = 0; i < amount; i++) {
            					$scope.items.push({id: counter});
            					counter += 10;
        				}
        				$scope.getLength();
    			};
   				$scope.loadMore(3300);	
		}
  	  
	}	
})


