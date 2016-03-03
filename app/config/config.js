'use strict';

angular.module('$config', [
	'oc.lazyLoad',
	'ui.router',
	'pascalprecht.translate',
    'ngStorage'
])

.config(['$translateProvider', '$translatePartialLoaderProvider', '$httpProvider', function($translateProvider, $translatePartialLoaderProvider, $httpProvider){
  	$translateProvider.useLoader('$translatePartialLoader', {
  		  urlTemplate: '{part}/{lang}.json'
  	});

  	$translateProvider.preferredLanguage('pt-BR');
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
}])


.constant('CONFIG_APP', {
    context:'/erudio',
    apiEndpoint:'/api/'
});
