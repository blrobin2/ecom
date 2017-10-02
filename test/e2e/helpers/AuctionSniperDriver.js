//const mainPage = require('./mainPage')

module.exports = class AuctionSniperDriver {
  constructor(browser, timeoutMillis) {
    this.browser = browser
    this.browser.page.main().navigate()
      .waitForElementVisible('body', timeoutMillis)
  }

  showSniperStatus(statusText) {
    this.browser
      .assert.visible('h1')
      .assert.title('Hello')
  }

  dispose() {
    this.browser.end()
  }
}