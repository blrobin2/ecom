const ApplicationRunner = require('./helpers/ApplicationRunner')
const FakeAuctionServer = require('./helpers/FakeAuctionServer')
let application;
let auction;

module.exports = {
  before: browser => {
    application = new ApplicationRunner(browser)
    auction = new FakeAuctionServer('item-54321')
  },
  'it can join auction until it closes': async browser => {
    await auction.startSellingItem()
    application.startBiddingIn(auction)
  },
  after: browser => {
    auction.stop()
    application.stop()
  }
}