//const mainPage = require('./mainPage')

module.exports = class AuctionSniperDriver {
  constructor(browser, timeoutMillis) {
    this.browser = browser
    this.page = this.browser.page.main()
    this.page.navigate()
      .waitForElementVisible('body', timeoutMillis)
  }

  showSniperStatus(statusText) {
    this.page
      .assert.title('Hello')
      .assert.visible('@header')
  }

  dispose() {
    this.browser.end()
  }
}