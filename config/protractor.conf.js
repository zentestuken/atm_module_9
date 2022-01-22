exports.config = {
  // Protractor can directly access Chrome/Firefox drivers
  // without starting Selenium Webdriver server (TURN OFF to use Grid)
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  multiCapabilities: [
    {'browserName': 'chrome',
      'chromeOptions': {
        'excludeSwitches': ['--enable-logging'],
      },
    },
  ],

  // Framework to use.
  framework: 'mocha',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['../test/**/*.spec.js'],

  // Options to be passed to Mocha.
  mochaOpts: {
    reporter: 'mochawesome',
    timeout: 1000000,
  },

  allScriptsTimeout: 50000,
};
