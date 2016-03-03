angular.module('erudioApp').factory('WizardControll', ['$state', function($state){
    return function($wizard){
        var self = angular.extend(this,angular.copy($wizard));
        self.currenSize = 0;        

        self.current = function(){
            var cur = -1;
            angular.forEach( self.steps, function(state, key){
                if( state.status.indexOf('active') != -1 ){
                    cur = key;
                }
            });

            if(cur != -1 ){
                self.updateSize(cur);
            }
            return cur;
            //return self.currentIndex >= 0 ? self.currentIndex : -1;
        }
        self.updateSize = function(currentStep){
            self.currentSize = currentStep/(self.size()-1)*100;
        }
        self.isValid = function(success){
            var current = self.current();

            if( current != -1 && self.steps[current].validate && typeof(self.validate) == 'function' ){
                return self.validate(success);                
            }
            return success();
        }
        self.goNext = function(callback){
            if( !self.isLast() ){
                var current = self.current();            

                if( current != -1 ){
                    self.desactivate(current);
                    self.complete(current);                 
                }

                self.activate(++current);
                if( self.isDisabled(current) ){
                    self.enable(current);
                } 
                $state.go( self.steps[current].name, $state.params ).then( function(){
                    if( callback ){
                        callback();
                    }
                });             
            }
        }
        self.goPrevious = function(callback){
            if( !self.isFirst() ){
                var current = self.current();

                self.desactivate(current);
                self.uncomplete(current);                   

                self.activate(--current);                   

                $state.go( self.steps[current].name, $state.params ).then( function(){
                    if( callback ){
                        callback();
                    }
                });
            }
        }
        self.next = function(){
            return self.isValid(self.goNext);
        }
        self.previous = function(){
            return self.goPrevious();
        }
        self.goTo = function(stateIndex){
            var current = self.current();

            if( stateIndex > current ){
                return self.isValid( function(){
                    self.goNext( function(){ self.goTo(stateIndex) } );                    
                } );          
            }else if( stateIndex < current ){
                return self.goPrevious( function(){
                    self.goTo(stateIndex);
                });
            }
        }        
        self.isFirst = function(){
            return self.current() == 0;
        }
        self.isLast = function(){
            return self.current() == self.steps.length-1;
        }
        self.isActive = function(stateIndex){
            return self.steps[stateIndex].status.indexOf( 'active' ) != -1;
        }
        self.isComplete = function(stateIndex){
            return self.steps[stateIndex].status.indexOf('complete') != -1;
        }
        self.isDisabled = function(stateIndex){
            return self.steps[stateIndex].status.indexOf('disabled') != -1;
        }
        self.desactivate = function(stateIndex){
            var index = self.steps[stateIndex].status.indexOf('active');
            if( index != -1 ){
                self.steps[stateIndex].status.splice(index, 1);
            }           
        }
        self.activate = function(stateIndex){
            if( self.steps[stateIndex].status.indexOf('active') == -1 ){
                self.steps[stateIndex].status.push('active');
            }           
        }
        self.enable = function(stateIndex){
            var index = self.steps[stateIndex].status.indexOf('disabled');
            if( index != -1 ){
                self.steps[stateIndex].status.splice(index, 1);
            }
        }
        self.disable = function(stateIndex){
            if( self.steps[stateIndex].status.indexOf('disabled') == -1 ){
                self.steps[stateIndex].status.push('disabled');
            }
        }
        self.complete = function(stateIndex){
            if( self.steps[stateIndex].status.indexOf('complete') == -1 ){
                self.steps[stateIndex].status.push('complete');
            }           
        }
        self.uncomplete = function(stateIndex){
            var index = self.steps[stateIndex].status.indexOf('complete');
            if( index != -1 ){
                self.steps[stateIndex].status.splice(index, 1);
            }           
        }
        self.check = function($stateName){
            if( self.current() == -1 ){
                $state.go( self.steps[0].name );
                self.activate(0);
            }else if( $state.is( self.controllState ) ){
                $state.go( self.steps[0].name );
            }           
        }
        self.size = function(){
            return self.steps.length;
        }

        return self;
    };
}]);