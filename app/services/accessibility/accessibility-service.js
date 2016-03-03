angular.module('erudioApp.service').service( 'AccessibilityService', [function(){
    var self = this;

    self.contraste = false;
    self.font = 4;
    self.sizes = {
        0: 92,
        1: 94,
        2: 96,
        3: 98,
        4: 100,
        5: 102,
        6: 104,
        7: 106,
        8: 108
    };
    

    self.toggle = function(){
        self.contraste = !self.contraste;
    };
    self.getContraste = function(){
        return self.contraste;
    };
    self.ajustarFonte = function(tamanho){
        self.font += tamanho;
        if( self.font < 0 ){
            self.font = 0;
        }else if( Object.keys(self.size) && self.font > Object.keys(self.size).length-1 ){
            self.font = Object.keys(self.size).length-1;
        }
    };
    self.setFontSize = function(tamanho){
        self.font = tamanho;
    }
    self.getFontSize = function(){
        return self.sizes[self.font];
    };
    self.getFont = function(){
        return self.font;
    }

    return self;
}]);