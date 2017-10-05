module.exports = class AuctionSniperDriver {
  constructor(browser, timeoutMillis) {
    this.browser = browser
    this.page = this.browser.page.main()
    this.page.navigate()
      .waitForElementVisible('@sniperStatus', timeoutMillis)
  }

  showSniperStatus(statusText) {
    this.page
      .expect.element('@sniperStatus').text.to.equal(statusText)
  }

  dispose() {
    this.browser.end()
  }
}