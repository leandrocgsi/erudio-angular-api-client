angular.module('erudioApp.service').service('I18nService', [ '$translate', function($translate){
    var self = this;

    self.languages = {
        'pt-BR': {
           label: 'Português',
           descricao: 'Alterar idioma para Português'
        },
        'en-US': {
            label: 'English',
            descricao: 'Change language to English'
        },
        'es-ES': {
            label: 'Spanish',
            descricao: 'Cambie el idioma al Español'
        }
    };

    self.languageSelected = '';


    self.verificaLanguageSelected = function(){
        self.languageSelected = $translate.preferredLanguage();
    }
    self.verificaLanguageSelected();

    self.getLanguages = function(){
        return self.languages;
    }
    self.mudarLanguage = function(novoLanguage){
        $translate.use(novoLanguage).then(function(data){
            $translate.refresh();
            self.languageSelected = novoLanguage;      
        });        
    };
    self.languageAtual = function(){
        return self.languageSelected;
    };
}]);