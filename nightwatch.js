module.exports = {
  src_folders: ['./test/e2e'],
  // "selenium" : {
  //   "start_process" : true,
  //   "server_path" : "./bin/selenium-server-standalone.jar",
  //   "log_path" : "",
  //   "host" : "127.0.0.1",
  //   "port" : 4444,
  //   "cli_args" : {
  //     "webdriver.chrome.driver" : "chromedriver"
  //   }
  // },
  "test_settings" : {
    "default" : {
      "launch_url" : "http://localhost",
      "selenium_port"  : 4444,
      "selenium_host"  : "localhost",
      "silent": true,
      "screenshots" : {
        "enabled" : false,
        "path" : ""
      },
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
}