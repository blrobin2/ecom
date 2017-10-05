const fs = require('fs')
const {promisify} = require('util')
const stat = promisify(fs.stat)

const BINPATH = './node_modules/nightwatch/bin/'

module.exports = {
  src_folders: ['./test/e2e'],
  page_objects_path: './test/e2e/pages',
  selenium: {
    start_process: true,
    server_path: `${BINPATH}selenium.jar`,
    host: "127.0.0.1",
    port: 4444,
    cli_args: {
      "webdriver.chrome.driver": `${BINPATH}chromedriver`
    }
  },
  test_settings: {
    default: {
      screenshots: {
        enabled: false,
        path: ""
      },
      // globals: {
      //   waitForConditionTimeout: 5000
      // },
      desiredCapabilities: {
        browserName: "chrome",
      },
      exclude: ['./test/e2e/helpers/*.js']
    },
    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
        javascriptEnabled: true
      }
    }
  }
};

stat(`${BINPATH}selenium.jar`)
  .then(stat => {
    if (!stat || stat.size < 1) {
      throw new Error('Fetch')
    }
  })
  .catch(err => {
    require('selenium-download').ensure(BINPATH, err => {
      if (err) throw new Error(err)
      console.log(`Selenium & Chromedriver downloaded to: ${BINPATH}`)
    })
  })