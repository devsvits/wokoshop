
sampleApp.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();
 
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);


sampleApp.controller('loginCtrl', ['$scope', 'LoginService', function ($scope, LoginService) {
	
	$scope.login = function () {
		var user = {};
		user.Email = $scope.Email;
		user.Password = $scope.Password;
		LoginService.login(user);
	};
	
	$scope.$on('LoginSuccess', function(event, userInfo) {
		$scope.error = '';
	});
	
	$scope.$on('LoginError', function(event, userInfo) {
		$scope.Password = '';
		$scope.error = 'User Name or passwaord wrong';
	});

}]);

sampleApp.controller('ShoppingCartController', ['$scope', '$http', 'LoginService', 'ProductService' , 'CustomerService', function ($scope, $http, LoginService, ProductService, CustomerService){
	

	$scope.date1 = new Date();
	$scope.CurrentHour = $scope.date1.getHours();
	//alert ($scope.CurrentHour);
	
	//$scope.CurrentHour = ($scope.date | $scope.date:'h') ;
	//alert ($scope.CurrentHour);
	$scope.TabTwo = function ()  {
		$scope.tab = 2;
		if (LoginService.isUserLoggedIn()){
			userInfo = LoginService.getUserInfo();
			//alert (userInfo);
			$scope.CustomerName = userInfo.name;
			$scope.CustomerAddress = userInfo.address;
			$scope.CustomerMobile = userInfo.mobile;
			$scope.CustomerCity = userInfo.city;
		}
	};
	
	$scope.PlaceOrder = function ()  {
		var CustomerInfo = {};
		
		CustomerInfo.PaymentMode = $scope.Payment;
		CustomerInfo.Name = $scope.CustomerName;
		CustomerInfo.Address = $scope.CustomerAddress;
		CustomerInfo.City = $scope.CustomerCity;
		CustomerInfo.Mobile = $scope.CustomerMobile;
		
		//alert (CustomerInfo);
		//CustomerService.CheckCustomerInfo (CustomerInfo);
		ProductService.FillList(CustomerInfo);
		
	};
	
	
	$scope.ProductService = ProductService;
		
	$scope.RemoveItem = function (ProductID, VariantID)  {
		ProductService.RemoveItem(ProductID, VariantID);
	};	
	
		
	$scope.PlusItem = function(ProductID, VariantID) {
		ProductService.PlusItem(ProductID, VariantID);
	}	
	
	$scope.MinusItem = function(ProductID, VariantID) {
		ProductService.MinusItem(ProductID, VariantID);
	}
	
	$scope.greaterThan = function(prop, val){
		return function(item){
			return item[prop] > val;
		}
	}
}]);

sampleApp.controller('ProductsController', function ($scope, $state, $location, $filter, $routeParams, $log, $rootScope, $stateParams, ProductService) {

	this.ProductService = ProductService;
	
	$scope.orderList = function(){
		if ($scope.SearchText.length >=3) {
			$scope.orderedList = $filter('filter')(ProductService.Products, $scope.FilterExprManual, false);
			$scope.orderedList = $filter('orderBy')($scope.orderedList, ['BrandName', 'SubCategoryName', 'ProductName']);
		}
		else {
			$scope.orderedList = $filter('filter')(ProductService.Products, $scope.FilterExpr, true);
			$scope.orderedList = $filter('orderBy')($scope.orderedList, [$scope.orderKey, 'ProductName']);
		}
	}
	
	if($stateParams.SCID ) {
		$scope.orderKey = "BrandName";
		$scope.FilterExpr = {'SubCategoryID': $stateParams.SCID};
		$scope.SearchText = '';
		$scope.orderList();
	}
	
	if($stateParams.BrandID ) {
		$scope.orderKey = "SubCategoryName";
		$scope.FilterExpr = {'BrandID': $stateParams.BrandID};
		$scope.SearchText = '';
		$scope.orderList();
	}
	
	$scope.$on('BrandIDChanged', function(event, NewBrandID) {
		$location.path('/Brand/' + NewBrandID + '/');
	});
	
	$scope.$on('SearchTextChanged', function(event, SearchText) {
		$scope.SearchText = SearchText;
		$scope.FilterExprManual = SearchText;
		$scope.orderList();
	});
	
	$scope.$on('ProductLoaded', function(event, Products) {
		$scope.orderList();
	});
	
	this.AddToCart = function(ProductID, VariantID)  {
		ProductService.PlusItem	(ProductID, VariantID);
	};
	
	this.PlusItem = function(ProductID, VariantID)  {
		ProductService.PlusItem	(ProductID, VariantID);
	};
	
	this.MinusItem = function(ProductID, VariantID)  {
		ProductService.MinusItem(ProductID, VariantID);
	};

	
});



sampleApp.controller('SearchController', ['$scope', '$http', 'ProductService',   function ($scope, $http, ProductService){
	

}]);


sampleApp.controller('PasswordController', ['$scope', '$http', function ($scope, $http){

}]);



sampleApp.controller('SignupController', ['$scope', '$http', function ($scope, $http){
	
	$scope.SaveCustomer = function() {
		
		alert ($scope.newcustomer);
		$scope.newcustomer = {};
	
	}
	
	
}]);


sampleApp.controller('ResourceController',function($scope, Entry) {
	 
	var entries = Entry.query(function() {
		console.log(entries);
	}); //query() returns all the entries
 
	var entry = Entry.get({ id: $scope.id }, function() {
		console.log(entry);
	}); // get() returns a single entry
	
	$scope.entry = new Entry(); //You can instantiate resource class
 
	$scope.entry.data = 'some data';
 
	Entry.save($scope.entry, function() {
		//data saved. do something here.
	}); //saves an entry. Assuming $scope.entry is the Entry object  
});

sampleApp.controller('BrandController', function( $scope, BrandService) {
	
	$scope.Brands = [];
		
	$scope.GetBrands = function() {
		BrandService.GetBrands().then(function(data) {
			$scope.Brands = data;
		});
	};
	
	$scope.GetBrands();
});


sampleApp.controller('MainCtrl', function( $rootScope, $scope, $routeParams, $location, LoginService, SCService, CategoryService, BrandService, ProductService) {
	
	$scope.SearchText = ''
	
		
	$scope.$watch('SelectedBrand', function() {
		if (typeof $scope.SelectedBrand != 'undefined')  {
			$scope.SearchText = '';
			$rootScope.$broadcast('BrandIDChanged', $scope.SelectedBrand.id);
		}
	});
	var user = LoginService.getUserInfo();
	if (LoginService.getUserInfo()){
		$scope.username = user.name;
		$scope.login = 1;
	}
	else {
		//alert ('somewhere');
	}
		
	$scope.logOut = function() {
		//$cookies.put('myFavorite', 'oatmeal');
		LoginService.logOut();
		var user ={};
		$scope.login = 0;
	};
	
	$scope.$on('LoginSuccess', function(event, userInfo) {
		if (userInfo.login_success == 1){
			var user = LoginService.getUserInfo() 
			$scope.username = user.name;
			$scope.login = 1;
			$location.path('/Brand/');
		}
	});
	
	$scope.$watch('SearchText', function() {
		$rootScope.$broadcast('SearchTextChanged', $scope.SearchText);
	});
	
	$scope.$on('TotalAmountChanged', function(event, NewAmount) {
		$scope.TotalAmount = NewAmount;
	});
	
	$scope.$on('TotalItemsChanged', function(event, NewItemCount) {
		$scope.TotalItems = NewItemCount;
	});
	
	$scope.TotalAmount = 0;
	$scope.TotalItems = 0;
	
	$scope.SuperCategories = [];
	$scope.Categories = [];
	$scope.SubCategories = [];
	$scope.Brands = [];
	
	$scope.ShowSC = true;
    $scope.ShowBrand =false;

	$scope.toggle = function() {
		$scope.ShowSC = !$scope.ShowSC;
		$scope.ShowBrand = !$scope.ShowBrand;
	};
	
	$scope.clearSuperCategories = function() {
		$scope.SuperCategories = {};
	};
	
	$scope.GetSuperCategories = function() {
		SCService.GetSuperCategories().then(function(data) {
			$scope.SuperCategories = data;
		});
	};
	
	$scope.GetCategories = function() {
		CategoryService.GetCategories().then(function(data) {
			$scope.Categories = data;
		});
	};
	
	$scope.GetBrands = function() {
		BrandService.GetBrands().then(function(data) {
			$scope.Brands = data;
		});
	};
	
	$scope.GetBrands();
	$scope.GetSuperCategories();
	$scope.GetCategories();
		
});
