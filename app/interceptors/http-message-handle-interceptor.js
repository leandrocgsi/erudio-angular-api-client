angular.module('$alerts').factory('httpMessageHandleInterceptor', ['$q', '$log', '$rootScope', '$translate', function($q, $log, $rootScope, $translate) {
    'use strict';
    return {
        // optional method
        'request': function(config) {

            config.headers["Accept-Language"] = $translate.use();
            // do something on success
            return config;
        },

        // optional method
        'requestError': function(rejection) {

        return $q.reject(rejection);
        },

        // optional method
        'response': function(response) {
        // do something on success
        return response;
        },

        // optional method
        'responseError': function(rejection) {

        var exceptions = rejection && rejection.data && rejection.data.erros || [];
        if( exceptions.length ){
          for( var i in exceptions ){
            $rootScope.$broadcast('responseErrorEvent', { type: exceptions[i].type, msg: exceptions[i].msg });
          }
        }

        if(rejection.status != 200 ){
            $rootScope.$broadcast('HTTP_'+rejection.status, rejection);
        }

        return $q.reject(rejection);
        }
    };
}]);
