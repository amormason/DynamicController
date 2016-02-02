var app = angular.module("yhwl", ['ngRoute']);
app.config(function($controllerProvider, $compileProvider, $filterProvider, $provide, $routeProvider) {
	app.register = {
		controller: $controllerProvider.register,
		directive: $compileProvider.directive,
		filter: $filterProvider.register,
		factory: $provide.factory,
		service: $provide.service
	};
	app.asyncjs = function(js) {
		return ["$q", "$route", "$rootScope", function($q, $route, $rootScope) {

			var deferred = $q.defer();
			var dependencies = js;
			if (Array.isArray(dependencies)) {
				for (var i = 0; i < dependencies.length; i++) {
					dependencies[i];
				}
			} else {
				dependencies += "?v=" + v; //v是版本号
			}
			$script(dependencies, function() {
				$rootScope.$apply(function() {
					deferred.resolve();
				});
			});
			return deferred.promise;
		}];
	};

	angular.forEach(menus, function(data, index, array) {
		$routeProvider.when('/' + data.id, {
			templateUrl: data.templateUrl,
			resolve: {
				load: app.asyncjs(data.jsFiles)
			}
		});
	});

});