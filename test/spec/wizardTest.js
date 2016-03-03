describe('Serviço WizardControll', function() {
    'use strict';

    var WizardControll;
    var $state;
    var stateProvider;
    var $locationProvider;
    var $rootScope;

    var $httpMessageHandleInterceptorProvider;
    var httpMessageHandleInterceptor;
    var $http;
    var $translatePartialLoader;

    var $q;
    var configWizard = {
        steps: [
            {
                name: 'test.step1',
                status: [],
                text: 'Step1',
                description: 'Descrição Step1',
                validate: true
            },
            {
                name: 'test.step2',
                status: [],
                text: 'Step2',
                description: 'Descrição Step2',
                validate: true
            },
            {
                name: 'test.step3',
                status: [],
                text: 'Step3',
                description: 'Descrição Step3',
                validate: true
            },
            {
                name: 'test.step4',
                status: [],
                text: 'Step4',
                description: 'Descrição Step4',
                validade: true
            }
        ],
        controllState: 'test',
        validate: ''
    };
    var wizard = {};


    beforeEach( module('$config') );
    beforeEach( module('$alerts') );
    
    beforeEach( module('ui.router') );
    beforeEach( module('erudioApp') );
    beforeEach( module(function($stateProvider, $provide){
        stateProvider = $stateProvider;  

        $stateProvider.state( 'test', {} );
        angular.forEach(configWizard.steps, function(step, key){

            $stateProvider.state(step.name,{
                params: {}
            });
        }); 
    }));


    beforeEach( inject(function(_$state_, _WizardControll_, _$rootScope_, _$q_,_httpMessageHandleInterceptor_){
        $state = _$state_;
        WizardControll = _WizardControll_;
        $rootScope = _$rootScope_;
        $q = _$q_;
        httpMessageHandleInterceptor = _httpMessageHandleInterceptor_;

        $state.transitionTo('test',{},{});
        $rootScope.$digest();

        resetWizard();
    }));

    function resetWizard(){
        /*$state.transitionTo('test',{},{});
        $rootScope.$digest();*/

        wizard = new WizardControll(configWizard);
    };
    

    it('Existência Servico WizardControll', function() {
        expect(WizardControll).toBeFunction();
    });
    it( 'Existência do método current', function(){
        expect(wizard).toHaveMethod('current');
    });
    it( 'Existência do método updateSize', function(){
        expect(wizard).toHaveMethod('updateSize');
    });
    it( 'Existência do método isValid', function(){
        expect(wizard).toHaveMethod('isValid');
    });
    it( 'Existência do método goNext', function(){
        expect(wizard).toHaveMethod('goNext');
    });
    it( 'Existência do método goPrevious', function(){
        expect(wizard).toHaveMethod('goPrevious');
    });
    it( 'Existência do método next', function(){
        expect(wizard).toHaveMethod('next');
    });
    it( 'Existência do método previous', function(){
        expect(wizard).toHaveMethod('previous');
    });
    it( 'Existência do método goTo', function(){
        expect(wizard).toHaveMethod('goTo');
    });
    it( 'Existência do método isFirst', function(){
        expect(wizard).toHaveMethod('isFirst');
    });
    it( 'Existência do método isLast', function(){
        expect(wizard).toHaveMethod('isLast');
    });
    it( 'Existência do método isActive', function(){
        expect(wizard).toHaveMethod('isActive');
    });
    it( 'Existência do método isComplete', function(){
        expect(wizard).toHaveMethod('isComplete');
    });
    it( 'Existência do método isDisabled', function(){
        expect(wizard).toHaveMethod('isDisabled');
    });
    it( 'Existência do método desactivate', function(){
        expect(wizard).toHaveMethod('desactivate');
    });
    it( 'Existência do método activate', function(){
        expect(wizard).toHaveMethod('activate');
    });
    it( 'Existência do método enable', function(){
        expect(wizard).toHaveMethod('enable');
    });
    it( 'Existência do método disable', function(){
        expect(wizard).toHaveMethod('disable');
    });
    it( 'Existência do método complete', function(){
        expect(wizard).toHaveMethod('complete');
    });
    it( 'Existência do método uncomplete', function(){
        expect(wizard).toHaveMethod('uncomplete');
    });
    it( 'Existência do método check', function(){
        expect(wizard).toHaveMethod('check');
    });
    it( 'Existência do método size', function(){
        expect(wizard).toHaveMethod('size');
    });
    it( 'Tamanho do wizard', function(){
        expect( wizard.size() ).toBe(4);
    });
    it( 'Posição inicial', function(){
        expect( wizard.current() ).toBe(-1);
    });
    it( 'State inicial', function(){
        expect($state.current.name).toBe('test');
        expect(wizard.isFirst()).toBe(false);
    });
    it( 'Next a partir do inicial', function(){
        wizard.next();
        $rootScope.$digest();

        expect($state.current.name).toBe('test.step1');
        expect(wizard.current()).toBe(0);
        expect(wizard.isFirst()).toBe(true);
        expect(wizard.isLast()).toBe(false);
        expect(wizard.isActive(0)).toBe(true);
    });
    it( 'Dois nexts a partir do inicial', function(){
        wizard.next();
        wizard.next();
        $rootScope.$digest();

        expect($state.current.name).toBe('test.step2');
        expect(wizard.current()).toBe(1);
        expect(wizard.isFirst()).toBe(false);
        expect(wizard.isLast()).toBe(false);
        expect(wizard.isActive(0)).toBe(false);
        expect(wizard.isActive(1)).toBe(true);
    });
    it( 'Dois nexts e um back test', function(){
        wizard.next();
        wizard.next();
        wizard.previous();
        $rootScope.$digest();

        expect($state.current.name).toBe('test.step1');
        expect(wizard.current()).toBe(0);
        expect(wizard.isFirst()).toBe(true);
        expect(wizard.isLast()).toBe(false);
        expect(wizard.isActive(0)).toBe(true);
        expect(wizard.isActive(1)).toBe(false);
    });
    it( 'Goto para o primeiro', function(){
        wizard.goTo(0);
        $rootScope.$digest();

        expect($state.current.name).toBe('test.step1');
        expect(wizard.current()).toBe(0);
        expect(wizard.isFirst()).toBe(true);
        expect(wizard.isLast()).toBe(false);
        expect(wizard.isActive(0)).toBe(true);
        expect(wizard.isActive(1)).toBe(false);
    });
    it( 'Goto para o segundo', function(){
        wizard.goTo(1);
        $rootScope.$digest();

        expect($state.current.name).toBe('test.step2');
        expect(wizard.current()).toBe(1);
        expect(wizard.isFirst()).toBe(false);
        expect(wizard.isLast()).toBe(false);
        expect(wizard.isActive(0)).toBe(false);
        expect(wizard.isActive(1)).toBe(true);
    });
    it( 'Goto para o 3', function(){
        wizard.goTo(2);
        $rootScope.$digest();

        expect($state.current.name).toBe('test.step3');
        expect(wizard.current()).toBe(2);
        expect(wizard.isFirst()).toBe(false);
        expect(wizard.isLast()).toBe(false);
        expect(wizard.isActive(0)).toBe(false);
        expect(wizard.isActive(1)).toBe(false);
        expect(wizard.isActive(2)).toBe(true);
    });
    it( 'Nexts para o 3', function(){
        wizard.next();
        wizard.next();
        wizard.next();
        $rootScope.$digest();

        expect($state.current.name).toBe('test.step3');
        expect(wizard.current()).toBe(2);
        expect(wizard.isFirst()).toBe(false);
        expect(wizard.isLast()).toBe(false);
        expect(wizard.isActive(0)).toBe(false);
        expect(wizard.isActive(1)).toBe(false);
        expect(wizard.isActive(2)).toBe(true);
    });
    it( 'Nexts para o ultímo', function(){
        wizard.next();
        wizard.next();
        wizard.next();
        wizard.next();
        $rootScope.$digest();

        expect($state.current.name).toBe('test.step4');
        expect(wizard.current()).toBe(3);
        expect(wizard.isFirst()).toBe(false);
        expect(wizard.isLast()).toBe(true);
        expect(wizard.isActive(0)).toBe(false);
        expect(wizard.isActive(1)).toBe(false);
        expect(wizard.isActive(2)).toBe(false);
        expect(wizard.isActive(3)).toBe(true)
    });
    it( 'goTo para o ultímo', function(){
        wizard.goTo(3);
        $rootScope.$digest();

        expect($state.current.name).toBe('test.step4');
        expect(wizard.current()).toBe(3);
        expect(wizard.isFirst()).toBe(false);
        expect(wizard.isLast()).toBe(true);
        expect(wizard.isActive(0)).toBe(false);
        expect(wizard.isActive(1)).toBe(false);
        expect(wizard.isActive(2)).toBe(false);
        expect(wizard.isActive(3)).toBe(true)
    });
    it( 'Validação(retornando erro) com next no primeiro step', function(){
        wizard.next();//Iniciar
        wizard.validate = function(sucess){
            return false;
        };
        wizard.next();
        $rootScope.$digest();

        expect($state.current.name).toBe('test.step1');
        expect(wizard.current()).toBe(0);
        expect(wizard.isFirst()).toBe(true);
        expect(wizard.isLast()).toBe(false);
        expect(wizard.isActive(0)).toBe(true);
        expect(wizard.isActive(1)).toBe(false);
    });
    it( 'Validação(retornando erro) com goTo no primeiro step', function(){
        wizard.validate = function(sucess){
            return false;
        };
        wizard.goTo(1);
        $rootScope.$digest();

        expect($state.current.name).toBe('test.step1');
        expect(wizard.current()).toBe(0);
        expect(wizard.isFirst()).toBe(true);
        expect(wizard.isLast()).toBe(false);
        expect(wizard.isActive(0)).toBe(true);
        expect(wizard.isActive(1)).toBe(false);
    });
    it( 'Validação do primeiro ok, segundo fail com next()', function(){
        wizard.next();
        wizard.validate = function(success){
            return success();
        };
        wizard.next();
        wizard.validate = function(success){
            return false;
        };
        wizard.next();
        $rootScope.$digest();

        expect($state.current.name).toBe('test.step2');
        expect(wizard.current()).toBe(1);
        expect(wizard.isFirst()).toBe(false);
        expect(wizard.isLast()).toBe(false);
        expect(wizard.isActive(0)).toBe(false);
        expect(wizard.isActive(1)).toBe(true);
        expect(wizard.isActive(2)).toBe(false);
    });
    it( 'Validação do primeiro(ok), segundo fail com goTo()', function(){
        wizard.validate = function(success){
            return success();
        };
        var state = $state.get('test.step2');
        state.onEnter = function(){
            wizard.validate = function(success){
                return false;
            };
        };

        wizard.goTo(2);
        $rootScope.$digest();
        expect($state.current.name).toBe('test.step2');
        expect(wizard.current()).toBe(1);
        expect(wizard.isFirst()).toBe(false);
        expect(wizard.isLast()).toBe(false);
        expect(wizard.isActive(0)).toBe(false);
        expect(wizard.isActive(1)).toBe(true);
        expect(wizard.isActive(2)).toBe(false);
    });
})