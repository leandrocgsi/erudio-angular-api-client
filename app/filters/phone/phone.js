angular.module('erudioApp').filter('phone', function () {
    return function (input) {
        var str = input + '';
        var noveDigitos;
        
        if(str.length >= 11){
            noveDigitos = /(\d{2})(\d{5})(\d{4})/;
            str = str.replace(noveDigitos,'($1) $2-$3');
            return str;
        }else if(str.length === 10){
            oitoDigitos = /(\d{2})(\d{4})(\d{4})/;
            str = str.replace(oitoDigitos,'($1) $2-$3');
            return str;
        }else{
            str = str.replace(/\D/g, '');
            str = str.replace(/^(\d{1})/, '($1');
            str = str.replace(/^(\(\d{2})/, '$1) ');
            str = str.replace(/^(\(\d{2}\))\s(\d{4})/, '$1 $2-');
            str = str.replace(/^(\(\d{2}\))\s(\d{4})(\d{4)/, '$1 $2-$3'); 
        }
        return str;
    };
});