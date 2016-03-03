exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    './**/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:9000/',

  seleniumAddress:'http://127.0.0.1:4444/wd/hub',

  framework: 'jasmine',

  plugins: [
  ],

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    showColors: true
  }
};
