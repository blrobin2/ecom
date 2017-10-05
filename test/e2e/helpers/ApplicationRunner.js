const AuctionSniperDriver = require( './AuctionSniperDriver')

const STATUS_JOINING = 'Joined'
const STATUS_LOST = 'Lost'

module.exports = class ApplicationRunner {
  static get SNIPER_ID() {
    return 'guest'
  }
  static get SNIPER_PASSWORD() {
    return 'guest'
  }

  constructor(browser) {
    this.browser = browser
    this._driver = null
  }

  async startBiddingIn(auction) {
    this._driver = new AuctionSniperDriver(this.browser, 1000)
    this.browser.perform((browser, done) => {
      auction.join().then(() => done())
    })
    this._driver.showSniperStatus(STATUS_JOINING)
  }

  showSniperHasLostAuction() {
    this._driver.showSniperStatus(STATUS_LOST)
  }

  stop() {
    if (this._driver !== null) {
      this._driver.dispose()
    }
  }
}