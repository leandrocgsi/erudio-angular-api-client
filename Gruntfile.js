var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function(grunt) {

 // Load Grunt tasks declared in the package.json file
 require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 grunt.loadNpmTasks('grunt-contrib-uglify');

 var appConfig = {
   app: require('./bower.json').appPath || 'app',
   dist: 'dist'
};

 // Configure Grunt
 grunt.initConfig({

   // Project settings
   yeoman: appConfig,

   // grunt-express will serve the files from the folders listed in `bases`
   // on specified `port` and `hostname`
   express: {
     all: {
       options: {
         port: 9000,
         hostname: "0.0.0.0",
         bases: ['./app/'], // Replace with the directory you want the files served from
                             // Make sure you don't use `.` or `..` in the path as Express
                             // is likely to return 403 Forbidden responses if you do
                             // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
         livereload: true
       }
     }
   },

   // grunt-watch will monitor the projects files
   watch: {
     all: {
       // Replace with whatever file you want to trigger the update from
       // Either as a String for a single entry
       // or an Array of String for multiple entries
       // You can use globing patterns like `css/**/*.css`
       // See https://github.com/gruntjs/grunt-contrib-watch#files
       files: ['**/*.js, **/*.html', '**/*.css'],
       options: {
         livereload: true
       }
     }
   },

   copy: {
     dist: {
       files: [{
         expand: true,
         dot: true,
         cwd: '<%= yeoman.app %>',
         dest: '<%= yeoman.dist %>',
         src: [ '**', 'bower_components/**/*.js']
       }]
    },
   erudio: {
     files: [{
         expand: true,
         mangle: false,
         src: ['**/*.js', "!bower_components/**"],
         dest: '<%= yeoman.dist %>',
         cwd: '<%= yeoman.app %>'
     }]
   }
   },

   // grunt-open will open your browser at the project's URL
   open: {
     all: {
       // Gets the port from the connect configuration
       path: 'http://localhost:<%= express.all.options.port%>'
     }
   },

    // Test settings
   karma: {
     unit: {
       configFile: 'test/karma.conf.js'
     }
   },

   //e2e
   protractor: {
     options: {
       noColor: false,
       args: { }
     },
     e2e: {
       options: {
         configFile: "e2e/protractor.conf.js",
         // Stops Grunt process if a test fails
         keepAlive: false,
         //debug: true
       }
     }
   },

   htmlmin: {
     dist: {
       options: {
         collapseWhitespace: false,
         conservativeCollapse: false,
         collapseBooleanAttributes: false,
         removeCommentsFromCDATA: false
       },
       files: [{
         expand: true,
         cwd: '<%= yeoman.dist %>',
         src: ['config/**/*.html','directives/**/*.html','filters/**/*.html','interceptors/**/*.html','modules/**/*.html','services/**/*.html','*.html'],
         dest: '<%= yeoman.dist %>'
       }]
     }
   },

   processhtml: {
     options: {
       process: true
     },
     dist: {
       files: {
         'dist/index.html': ['dist/index.html']
       }
     }
   },

   cssmin: {
     dist: {
       files: [{
         expand: true,
         cwd: '<%= yeoman.dist %>',
         src: 'assets/**/*.css',
         dest: '<%= yeoman.dist %>'
       }]
     }
   },
   connect: {
       server: {
           options: {
               port: 9000,
               hostname: 'localhost',
               base: '<%= distFolder %>',
               livereload: 35729,
               open: true,
               middleware: function(connect, options) {
                   return [
                       serveStatic('dist'),
                       require('grunt-connect-proxy/lib/utils').proxyRequest
                   ];
               }
           },
           proxies: [
               {
                   context: '/erudio',
                   host: 'localhost',
                   port: 8080,
                   https: false,
                   changeOrigin: false
               }
           ]
       }
   },

   uglify: {
     build: {
       files: [{
           expand: true,
           mangle: false,
           src: ['**/*.js', "!bower_components/**"],
           dest: '<%= yeoman.dist %>',
           cwd: '<%= yeoman.app %>'
       }]
     }
 },

 concat: {
   options: {
     separator: ';',
   },
   dist: {
     src: require('wiredep')().js,
     dest: 'dist/bower_components/vendor.js',
   },
 }


 });


 grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
   grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
   grunt.task.run(['serve:' + target]);
 });
 // Creates the `server` task
 grunt.registerTask('serve', [
   'express',
   'open',
   'configureProxies:server',
   'watch',

 ]);

 grunt.registerTask('build',[
   'copy:dist',
   'copy:erudio',
   'processhtml:dist',
   'htmlmin',
   'cssmin',
   //'uglify:build',
   //'concat:dist'
 ]);

 grunt.registerTask('default', [
   'build'
   //'test'
 ]);

 grunt.registerTask('test', [
   //'clean:server',
   //'concurrent:test',
   //'autoprefixer',
   //'connect:test',
   'karma'
 ]);

 grunt.registerTask('e2e', [
   'protractor:e2e'
 ]);
};
