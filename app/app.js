/**
 * Created by jmccommas on 9/30/15.
 */


var ngsocial = angular.module('ngsocial', [
	'ngRoute',
	'ngFacebook'
]);

ngsocial.config(function ($routeProvider) {
	$routeProvider
		.when('/facebook', {
			templateUrl: '../facebook/facebook.html',
			controller: 'facebookController'

			})
			config( function( $facebookProvider ) {
				$facebookProvider.setAppId('<1286230068069561>');
			})
	config( function( $facebookProvider ) {
		$facebookProvider.setPermissions('publicprofile','email','userposts','publishactions','userphotos');
		.run(function)($rootScope){
			(function(d, s, id){
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) {return;}
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/en_US/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		</script>

		}
		})
		.when('/about', {
			templateUrl: '../about/about.html',
			controller: 'aboutController'
		})
		.otherwise({
			redirectTo: '/facebook'

		});
});
.controller('facebookController', ['$scope', '$facebook', function($scope, $facebook) {
	$scope.isLoggedIn = false;

	$scope.login = function(){
		$facebook.login().then(function(){
			$scope.isLoggedIn = true;
			refresh();
		})
	};

	$scope.logout = function(){
		$facebook.logout().then(function(){
			$scope.isLoggedIn = false;
			refresh();
		})
	};

	function refresh(){
		$facebook.api("/me",{ fields: 'name,last_name,first_name,email,gender,locale,link' }).then(function(response){
				$scope.isLoggedIn = true;
				$scope.user = response;
				$scope.welcomeMessage = "Welcome " + response.name;
				$facebook.api("/me/picture").then(function(response) {
					$scope.picture = response.data.url
				});
				$facebook.api("/me/permissions").then(function(response){
					$scope.permissions = response.data;
				});
				$facebook.api("/me/posts").then(function(response){
					$scope.posts = response.data;
					$scope.postIds = [];
					$scope.posts.forEach(function(item){
						$scope.postIds.push(item.id);
					});
					$scope.fullPosts = [];
					$scope.postIds.forEach(function(id){
						$facebook.api("/"+id, {fields: 'place, message, picture, link, with_tags, created_time'}).then(function(response){
							$scope.fullPosts.push(response)
						});
					})
				})
			},
			function(err){
				$scope.welcomeMessage = "Please login"
			})
	}

	$scope.postStatus = function(){
		var body = this.body;
		$facebook.api("/me/feed", "post", {message: body}).then(function(response){
			$scope.msg = "Thanks for posting";
			refresh();
		})
	};

	refresh();
}]);