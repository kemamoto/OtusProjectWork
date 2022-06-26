const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: './test/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://192.168.0.110/TotalAgility/Forms',
      show:true,
      browser: 'chromium',
      video: true,
      windowSize: "1900x1000",
    }
  },
  include: {
    I: './steps_file.js',
    loginPage: './pages/login.js',
    workqueuePage: './pages/workqueue.js',
    SCNJPage: './pages/SCNJ.js',
    scanSettingsPage: './pages/scanSettings.js',
  
  },
  "plugins": {
    "allure": {}
},
  bootstrap: null,
  mocha: {},
  name: 'ProjectWork'
}