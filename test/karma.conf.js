module.exports = function(config){
  config.set({

    basePath : '../app/',

    files : [
        "bower_components/angular/angular.js",
        "bower_components/angular-animate/angular-animate.js",
        "bower_components/angular-aria/angular-aria.js",
        "bower_components/angular-cookies/angular-cookies.js",
        "bower_components/angular-messages/angular-messages.js",
        "bower_components/angular-resource/angular-resource.js",
        "bower_components/angular-sanitize/angular-sanitize.js",
        "bower_components/angular-touch/angular-touch.js",
        "bower_components/angular-highlightjs/build/angular-highlightjs.js",
        "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
        "bower_components/ng-table/dist/ng-table.min.js",
        "bower_components/ngMask/dist/ngMask.js",
        "bower_components/angular-input-masks/angular-input-masks-standalone.min.js",
        "bower_components/angular-translate/angular-translate.min.js",
        "bower_components/angular-translate-loader-url/angular-translate-loader-url.min.js",
        "bower_components/angular-translate-loader-partial/angular-translate-loader-partial.min.js",
        "bower_components/angular-ui-router/release/angular-ui-router.min.js",
        "bower_components/oclazyload/dist/ocLazyLoad.min.js",
        "bower_components/ui-router-extras/release/modular/ct-ui-router-extras.core.js",
        "bower_components/ui-router-extras/release/modular/ct-ui-router-extras.statevis.js",
        "bower_components/ui-router-extras/release/modular/ct-ui-router-extras.previous.js",
        "bower_components/ui-router-extras/release/modular/ct-ui-router-extras.transition.js",
        "bower_components/ui-router-extras/release/modular/ct-ui-router-extras.sticky.js",
        "bower_components/angular-breadcrumb/release/angular-breadcrumb.js",
        "bower_components/lodash/lodash.js",
        "bower_components/restangular/dist/restangular.min.js",


        'bower_components/angular-mocks/angular-mocks.js',


        { pattern: 'config/config.js', watched: true, included: true, served: true},

        { pattern: 'modules/alerts/*.js', watched: true, included: true, served: true},
        { pattern: 'modules/alerts/**/*.js', watched: true, included: true, served: true},

        { pattern: 'interceptors/*.js', watched: true, included: true, served: true},

        { pattern: 'modules/menu/*.js', watched: true, included: true, served: true},
        { pattern: 'modules/menu/**/*.js', watched: true, included: true, served: true},

        { pattern: 'modules/private/main/*.js', watched: true, included: true, served: true },
        { pattern: 'modules/private/main/**/*.js', watched: true, included: true, served: true },



        { pattern: 'modules/private/*.js', watched: true, included: true, served: true },
        { pattern: 'modules/private/**/*.js', watched: true, included: true, served: true },



        { pattern: 'filters/**/*.js', watched: true, included: true, served: true},

        { pattern: 'directives/**/*.js', watched: true, included: true, served: true},

        { pattern: 'services/wizard/**.*js', watched: true, included: true, served: true},

        'app.js',

        { pattern: '../test/**/*.js', watched: true, included: true, served: true},
    ],

    autoWatch : true,

    frameworks: [
        'jasmine',
        'jasmine-matchers'
    ],

    //browsers : ['Chrome', 'PhantomJS'],
    browsers : ['PhantomJS'],

    singleRun: true,

    plugins : [
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-jasmine',
        'karma-jasmine-matchers',
        'karma-phantomjs-launcher'
        //'karma-junit-reporter'
    ],

    junitReporter : {
        outputFile: 'test_out/unit.xml',
        suite: 'unit'
    },

    proxies: {
        '/modules/': '/base/modules/',
        '/filters/': '/base/filters/',
        '/directives/': '/base/directives/',
        '/services/': '/base/services/'
    }

  });
};
