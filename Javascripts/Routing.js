var sampleApp = angular.module('sampleApp', ['ngRoute', 'ui.bootstrap', 'ui.router']);

sampleApp.run(function($rootScope, $q, $http) {
  
	$rootScope.test = new Date();
	console.log($rootScope.test);
	$rootScope.hello = function() {
		console.log('hello');
	}
	
	/*
	$rootScope.Products = [];
	
	$rootScope.GetProducts = function () {
		var req = {
			method: 'POST',
			url: 'cgi-bin/productlist.pl',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: "action=GET"
		};	
		var defer = $q.defer();
		$http(req).then(function(response) {
			$rootScope.Products = response.data;
			defer.resolve($rootScope.Products);
		}, function(error) {
			defer.reject("Some error");
		});
		return defer.promise;
	}
	
	$rootScope.GetProducts();
	
	console.log($rootScope.Products);
	*/
});


/*
sampleApp.filter('groupBy', ['$parse', function ($parse) {
    return function (list, group_by) {
        
        var filtered = [];
        var prev_item = null;
        var group_changed = false;
        // this is a new field which is added to each item where we append "_CHANGED"
        // to indicate a field change in the list
        //was var new_field = group_by + '_CHANGED'; - JB 12/17/2013
        var new_field = 'group_by_CHANGED';
        
        // loop through each item in the list
        angular.forEach(list, function (item) {
            
            group_changed = false;
            
            // if not the first item
            if (prev_item !== null) {
                
                // check if any of the group by field changed
                
                //force group_by into Array
                group_by = angular.isArray(group_by) ? group_by : [group_by]; 
                
                //check each group by parameter
                for (var i = 0, len = group_by.length; i < len; i++) {
                    if ($parse(group_by[i])(prev_item) !== $parse(group_by[i])(item)) {
                        group_changed = true;
                    }
                }
                
                
            }// otherwise we have the first item in the list which is new
            else {
                group_changed = true;
            }
            
            // if the group changed, then add a new field to the item
            // to indicate this
            if (group_changed) {
                item[new_field] = true;
            } else {
                item[new_field] = false;
            }
            
            filtered.push(item);
            prev_item = item;
            
        });
        
        return filtered;
    };
    
    
}]);

*/

/*
sampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
		when('/Login', {
			templateUrl: 'templates/Login.html',
			controller: 'LoginController'
		}).
		when('/SignUp', {
			templateUrl: 'templates/SignUp.html',
			controller: 'SignupController'
		}).
		when('/ForgotPassword', {
			templateUrl: 'templates/ForgotPassword.html',
			controller: 'PasswordController'
		}).
		when('/ShoppingCart', {
			templateUrl: 'templates/ShoppingCart.html',
			controller: 'ShoppingCartController'
		}).
		
		when('/Products/:SCId', {
			templateUrl: 'templates/Products.html',
			controller: 'ProductsController as pc'
		}).
		
		otherwise({
			redirectTo: '/Products/38'
		});
}]);
*/


sampleApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/Category/52/");
	$stateProvider
	
	.state('Category', {
		templateUrl: "templates/Products.html",
        url: '/Category/:SCID/',
		controller: 'ProductsController as pc'
    })
	
	.state('Brand', {
		templateUrl: "templates/Products.html",
        url: '/Brand/:BrandID/',
		controller: 'ProductsController as pc'
    })
	
	.state('ShoppingCart', {
		templateUrl: "templates/ShoppingCart.html",
		url: "/ShoppingCart",
		controller: 'ShoppingCartController'
	})
	.state('ForgotPassword', {
		templateUrl: "templates/ForgotPassword.html",
		url: "/ForgotPassword",
		controller: 'PasswordController'
	})
	.state('Login', {
		templateUrl: "templates/Login.html",
		url: "/Login",
		controller: 'loginCtrl'
	})
	.state('SignUp', {
		templateUrl: "templates/SignUp.html",
		url: "/SignUp",
		controller: 'SignUpController'
	})
	;
	
});

