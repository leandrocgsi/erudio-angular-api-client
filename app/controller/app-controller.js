"use strict";
angular.module('erudioApp').controller('AppController',
[ '$rootScope', '$scope', 'MessageService', '$state', '$location',
function($rootScope, $scope, MessageService, $state, $location){
    var self = this;

    function getNameField(field) {
        var label = angular.element(document.querySelector("label[for='"+field.$name+"']"));
        if (label && label.length > 0) {
            return '"'+label.html()+'"';
        } else {
            return '"'+field.$name+'"';
        }
    }

    function getMinlength(field) {
        var field = angular.element(document.getElementById(field.$name));
        return field.attr('minlength');
    }

    function getFieldsWithError(form) {
        var fieldsWithError = [];
        angular.forEach(form.$error, function(fields) {
            fieldsWithError = fieldsWithError.concat(fields);
        });
        return fieldsWithError;
    }

    function ValidationType(valid, message) {
        this.isValid = valid;
        this.message = message;
        this.show = function() {
            MessageService.show();
        };
    }

    $scope.getMessageErro = function(field) {
        var msgs = [];
        if(field.$error.required){
            msgs.push(MessageService.getMessage('REQUIRED_FIELD', {field:getNameField(field)}));
        }
        if(field.$error.email){
            msgs.push(MessageService.getMessage('INVALID_EMAIL', {field:getNameField(field)}));
        }
        if(field.$error.cpf){
            msgs.push(MessageService.getMessage('INVALID_CPF'));
        }
        if(field.$error.cnpj){
            msgs.push(MessageService.getMessage('INVALID_CNPJ'));
        }
        if(field.$error.minlength){
            msgs.push(MessageService.getMessage('INVALID_FIELD_MIN_LENGHT', {field:getNameField(field), quantidade:getMinlength(field)}));
        }
        if(field.$error.maxlength){
            msgs.push(MessageService.getMessage('INVALID_FIELD_MAX_LENGHT', {field:getNameField(field)}));
        }
        if(field.$error.parse){
            msgs.push(MessageService.getMessage('INVALID_FIELD'));
        }
        return msgs;
    };

    $scope.validateField = function(field) {
        var msgs = $scope.getMessageErro(field);
        if (msgs.length > 0) {
            MessageService.addError(msgs).show();
            return false;
        }
        return true;
    };

    $scope.validateForm = function (form){
        var msgs = [];
        var fieldsWithError = getFieldsWithError(form);
        angular.forEach(fieldsWithError, function(field){
            msgs.push($scope.getMessageErro(field));
        });
        if (msgs.length > 0) {
            MessageService.addError(msgs);
            return new ValidationType(false, msgs);
        }
        return new ValidationType(true);
    };

    $scope.validateFieldsIguais = function(fieldA, fieldB, message) {
        var iguais = (isBlank(fieldA.$viewValue) && isBlank(fieldB.$viewValue)) || (fieldA.$viewValue === fieldB.$viewValue);
        var msg = null;
        if (!iguais) {
            msg = MessageService.getMessage(message);
            MessageService.addError(msg);
        }
        return new ValidationType(iguais, msg);
    };

    $scope.validateValoresIguais = function(fieldA, fieldB, message) {
        var iguais = (fieldA === fieldB);
        var msg = null;
        if (!iguais) {
            msg = MessageService.getMessage(message);
            MessageService.addError(msg);
        }
        return new ValidationType(iguais, msg);
    };

    $scope.validateTamanho = function(field, tamanho, message) {
        var menor = (field.length >= tamanho);
        var msg = null;
        if(!menor){
            msg = MessageService.getMessage(message);
            MessageService.addError(message);
        }
        return new ValidationType(menor, msg);
    };

    $scope.validateColecaoVazia = function(colecao, message, parameters) {
        var vazia = ((!colecao) || (colecao.length === 0));
        var msg = null;
        if (vazia) {
            msg = MessageService.getMessage(message, parameters);
            MessageService.addError(msg);
        }
        return new ValidationType(!vazia, msg);
    };

    $scope.getMessage = function(message, obj) {
        return MessageService.getMessage(message, obj);
    };

    $scope.getAtivoInativo = function(ativo) {
        if (ativo) {
            return MessageService.getMessage('ENABLED');
        } else {
            return MessageService.getMessage('DISABLED');
        }
    };
    $scope.getSimNao = function(simNao) {
        if (simNao) {
            return MessageService.getMessage('YES');
        } else {
            return MessageService.getMessage('NO');
        }
    };

    $scope.performLogout = function(callback){
        $scope.userLogado = null;
        if (callback){

        } else {
            $state.go('app.public.signIn.login');
        }
    };

    $scope.$on('HTTP_401', function(rejection){
        if ($state.current.name !== 'app.public.signIn.login') {
            $scope.performLogout(function() {
                $state.go('app.public.signIn.login',{redirectUrl: $location.url()});
            });
        } else {
            $scope.performLogout();
        }
    });

    /*$scope.$on('HTTP_-1', function(rejection){
        MessageService.addError("Você não tem permissão.").show();
    });*/

    $scope.$on('$viewContentLoaded', function(){
        angular.element(document.querySelectorAll('input')).attr('autocomplete','off');
    });

    $scope.$on('USUARIO_LOGADO_EVENT', function(event, userLogado){
        $scope.userLogado = userLogado;
    });

    $scope.isUserExternal = function(){
        if($scope.userLogado && $scope.userLogado.tipo){
            return $scope.userLogado.tipo == "USUARIO_EXTERNAL";
        }
        return false;
    };

    $scope.hasPermission = function(permission) {
        return true;
    };

    $scope.validatePermission = function(permission) {
        if (!$scope.hasPermission(permission)) {
            $state.go('app.private.index');
        }
    };

    function init() {
    }

    init();

}]);
