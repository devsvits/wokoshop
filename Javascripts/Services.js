var SuperCategoryURL = '/cgi-bin/superCategory.pl';
var CategoryURL = '/cgi-bin/Category.pl';
var BrandURL = '/cgi-bin/Brand.pl';
var CustomerURL = '/cgi-bin/Customer.pl';

'use strict';
 
sampleApp.factory('AuthenticationService',
    ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
    function (Base64, $http, $cookieStore, $rootScope, $timeout) {
        var AuthenticationService = {};

        AuthenticationService.Login = function (username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function(){
                var response = { success: username === 'test' && password === 'test' };
                if(!response.success) {
                    response.message = 'Username or password is incorrect';
                }
                callback(response);
            }, 1000);


            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

        };
 
        AuthenticationService.SetCredentials = function (username, password) {
            var authdata = Base64.encode(username + ':' + password);
 
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };
 
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };
 
        AuthenticationService.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
 
        return AuthenticationService;
    }]);
 
sampleApp.factory('Base64', function () {
    /* jshint ignore:start */
 
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
 
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
 
    /* jshint ignore:end */
});



sampleApp.factory('LoginService', function($http, $rootScope, $window) {
	
	var LoginService =  {};
    var userInfo;
	
	LoginService.login = function(user) {
		var credentials = {};
		credentials.Email = user.Email;
		credentials.Password = user.Password;
		credentials = JSON.stringify (credentials);
		var result;
						
		var req = {
			url: 'cgi-bin/login.pl',
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			data: credentials
		};
		$http(req)
		.success(function(data, status, headers, config) {
			userInfo = data;
			if (data.login_success == 1){
				$window.sessionStorage["userInfo"] = JSON.stringify(data);
				$rootScope.$broadcast('LoginSuccess', data);
			}
			else {
				$window.sessionStorage["userInfo"] = null;
				$rootScope.$broadcast('LoginError', data);
			}
		})
		.error(function (data, status, headers, config) {
			alert (data);
			alert (status);
			alert ('Login Error');
		});
	}
	
	function init() {
		if ($window.sessionStorage["userInfo"]) {
			userInfo = JSON.parse($window.sessionStorage["userInfo"]);
		}
	}
	init();
	
	LoginService.getUserInfo = function() {
		return userInfo;
	}
	
	LoginService.isUserLoggedIn = function() {
		return (userInfo) ? true : false;
	}
	
	LoginService.logOut = function() {
		$window.sessionStorage["userInfo"] = null;
		userInfo = null;
		/*
		
		var deferred = $q.defer();

		$http({
		method: "POST",
		url: logoutUrl,
		headers: {
		  "access_token": userInfo.accessToken
		}
		}).then(function(result) {
		$window.sessionStorage["userInfo"] = null;
		userInfo = null;
		deferred.resolve(result);
		}, function(error) {
		deferred.reject(error);
		});

		return deferred.promise;
		*/
	}
	
	
	
	return LoginService;
});	

sampleApp.factory('SCService', function($http) {
	
	var promise;
	var SCService =  {};
	
	SCService.GetSuperCategories = function() {
		var req = {
			method: 'POST',
			url: SuperCategoryURL,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: "action=GET"
		};
		if ( !promise ) {
			// $http returns a promise, which has a then function, which also returns a promise
			promise = $http(req).then(function (response) {
				// The then function here is an opportunity to modify the response
				console.log(response);
				// The return value gets picked up by the then in the controller.
				return response.data;
			});
		}
		// Return the promise to the controller
		return promise;
	}
	
	return SCService;
});

sampleApp.factory('CategoryService', function($http) {
		
	var promise;
	var CategoryService =  {};
	
	CategoryService.GetCategories = function() {
		var req = {
			method: 'POST',
			url: CategoryURL,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: "action=GET"
		};	
		
		if ( !promise ) {
			promise = $http(req).then(function (response) {
				console.log(response);
				return response.data;
			});
		}
		return promise;
	}
	
	return CategoryService;
});

sampleApp.factory('ProductService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope){
     
	var ProductService =  {};
    var promise;
	ProductService.Products = [];
	
	ProductService.GetProducts = function() {
		var req = {
			method: 'POST',
			url: 'cgi-bin/productlist.pl',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: "action=GET"
		};
		if ( !promise ) {
			promise = $http(req).then(function (response) {
				console.log(response);
				ProductService.Products = response.data;
				$rootScope.$broadcast('ProductLoaded', ProductService.Products);
				return response.data;
			});
		}
		return promise;
	}
	ProductService.GetProducts();
	
	/*
	
	ProductService.GetProducts = function () {
		var req = {
			method: 'POST',
			url: 'cgi-bin/productlist.pl',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: "action=GET"
		};	
		var defer = $q.defer();
		$http(req).then(function(response) {
			ProductService.Products = response.data;
			defer.resolve(ProductService.Products);
		}, function(error) {
			defer.reject("Some error");
		});
		return defer.promise;
	}
	
	ProductService.GetProducts();

*/
	
	  
	  
	  
	ProductService.Calculate = function() {
		var Total = 0;
		var Items = 0;
		for (i in ProductService.Products) {
			for (j in ProductService.Products[i].Variants)  {
				Total += ProductService.Products[i].Variants[j].InCart * ProductService.Products[i].Variants[j].SellPrice; 
				Items += ProductService.Products[i].Variants[j].InCart *1; 
			}
		}
		//alert (Items);
		$rootScope.$broadcast('TotalAmountChanged', Total);
		$rootScope.$broadcast('TotalItemsChanged', Items);
		
	}
	
	ProductService.FillList = function(CustomerInfo) {
		
		var NewOrder ={ "ItemList":[]};
		
		
		for (i in ProductService.Products) {
			for (j in ProductService.Products[i].Variants)  {
				if (ProductService.Products[i].Variants[j].InCart > 0)  {
					NewOrder.ItemList.push({
						ItemName: ProductService.Products[i].BrandName + " " + ProductService.Products[i].ProductName + " " + ProductService.Products[i].Variants[j].VariantName,
						Quantity: ProductService.Products[i].Variants[j].InCart.toString(),
						MRP: ProductService.Products[i].Variants[j].MRP,
						SellPrice: ProductService.Products[i].Variants[j].SellPrice
					});
				}
			}
		}
		
		NewOrder.CustomerID = "1";
		NewOrder.DeliverySlot = "2"; 
		NewOrder.PaymentMode = "1";
		NewOrder.CustomerName = CustomerInfo.Name;
		NewOrder.Address = CustomerInfo.Address;
		NewOrder.City = CustomerInfo.City;
		NewOrder.Mobile = CustomerInfo.Mobile;
		NewOrder =  JSON.stringify (NewOrder);
		//alert (NewOrder);
		
		var req = {
			url: '/cgi-bin/PlaceOrder.pl',
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			data: NewOrder
		};
		
		
		$http(req)
		.success(function(data) {
			alert ('Your order is successful');
			//console.log(success);
			for (i in ProductService.Products) {
				for (j in ProductService.Products[i].Variants)  {
					ProductService.Products[i].Variants[j].InCart = 0;
				}
			}
			
			$rootScope.$broadcast('TotalAmountChanged', 0.00);
			$rootScope.$broadcast('TotalItemsChanged', 0);
		
		})	
		.error(function (data, status, headers, config) {
			alert ('Order Placing Error');
			//alert (status);
			//alert (data);
		});
	} 
		

	
		
	$rootScope.$watch('Products', function(newValue, oldValue) {
        if($rootScope.Products) {
			//alert ('in');
            console.log($rootScope.Products);
			ProductService.Products = $rootScope.Products;
        }
    });
	
	ProductService.RemoveItem = function(ProductID, VariantID) {
		for (i in ProductService.Products) {
			if (ProductService.Products[i].ProductID == ProductID) {
				for (j in ProductService.Products[i].Variants)  {
					if (ProductService.Products[i].Variants[j].VariantID == VariantID)  {
						ProductService.Products[i].Variants[j].InCart = 0;
						//alert ('updated');
						break;
					}
				}
				break;
			}
		}
		ProductService.Calculate();
		
	}
	
	ProductService.MinusItem = function(ProductID, VariantID) {
		for (i in ProductService.Products) {
			if (ProductService.Products[i].ProductID == ProductID) {
				for (j in ProductService.Products[i].Variants)  {
					if (ProductService.Products[i].Variants[j].VariantID == VariantID)  {
						--ProductService.Products[i].Variants[j].InCart;
						//alert ('updated');
						break;
					}
				}
				break;
			}
		}
		ProductService.Calculate();
	}	
	
	
	ProductService.PlusItem = function(ProductID, VariantID) {
		for (i in ProductService.Products) {
			if (ProductService.Products[i].ProductID == ProductID) {
				for (j in ProductService.Products[i].Variants)  {
					if (ProductService.Products[i].Variants[j].VariantID == VariantID)  {
						++ProductService.Products[i].Variants[j].InCart;
						//alert ('updated');
						break;
					}
				}
				break;
			}
		}
		ProductService.Calculate();
	}	
	
	return ProductService;
	
}]);

sampleApp.factory('BrandService', function($http) {
	
	var promise;
	var BrandService =  {};
	
	BrandService.GetBrands = function() {
		var req = {
			method: 'POST',
			url: BrandURL,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: "action=GET"
		};
		if ( !promise ) {
			promise = $http(req).then(function (response) {
				console.log(response);
				return response.data;
			});
		}
		return promise;
	}
	
	return BrandService;
});

sampleApp.factory('CustomerService', function($http) {
	
	var promise;
	var CustomerService =  {};
	
	CustomerService.CheckCustomerInfo = function(CustomerInfo) {
		
		var dataObj = {
			name : 'Devesh Agrawal',
			address : 'Sarani Gate',
			headoffice : 'Bangalore'
			
		};	
		alert (dataObj);
		alert (JSON.stringify (dataObj));
		
		/*
		var req = $http.post(CustomerURL, dataObj);
		req.success(function(data, status, headers, config) {
			$scope.message = data;
		});
		req.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});		
		
		$scope.name='';
		$scope.employees='';
		$scope.headoffice='';
		
		
		
		
		
		
		var req = {
			method: 'POST',
			url: CustomerURL,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: "action=GET"
		};
		var CInfo = JSON.stringify(CustomerInfo);
		alert (CInfo);
	*/
	}
	
	return CustomerService;
});
