describe( 'Login page', function(){
    var baseUrl = 'http://localhost:9000/';

    it('should login successfully', function() {
        browser.get('#/public/login');

        element( by.model('user.name') ).sendKeys( 'usuario' );
        element( by.model('user.password') ).sendKeys( 'secret' );
        element( by.css('[data-ng-click="loginCtrl.testeAlerta()"]') ).click();

        //console.log(browser.getCurrentUrl());
        expect(browser.getCurrentUrl()).toBe(baseUrl+"#/private/home");
    });

    it('should NOT login successfully', function() {
        browser.get('#/public/login');

        element( by.model('user.name') ).sendKeys( 'usuario' );
        element( by.model('user.password') ).sendKeys( 'algumacoisanaosecreta' );
        element( by.css('[data-ng-click="loginCtrl.testeAlerta()"]') ).click();
        expect(browser.getCurrentUrl()).toBe(baseUrl+"#/public/login");

        var alert = element(by.css('md-toast'));
        browser.wait(function(){
            return browser.isElementPresent(alert);
        });
        var alertText = element(by.css('md-toast span'));
        expect(alertText.getText()).toBe('Use password: "secret"');   
    });
})