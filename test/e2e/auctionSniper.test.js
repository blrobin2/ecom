const ApplicationRunner = require('./helpers/ApplicationRunner')
const FakeAuctionServer = require('./helpers/FakeAuctionServer')
let application;
let auction;

const exec = require('child_process').exec

module.exports = {
  before: browser => {
    application = new ApplicationRunner(browser)
    auction = new FakeAuctionServer('item-54321')
  },
  'it can join auction until it closes': browser => {
    browser
      .perform((client, done) => {
        auction.startSellingItem().then(() => done ())
      })
      .perform((client, done) => {
        application.startBiddingIn(auction).then(() => done())
      })
      .perform((client, done) => {
        auction.hasReceivedJoinRequestFromSniper().then(() => done(false))
      })
      .perform((client, done) => {
        auction.announceClosed().then(() => done())
      })
      .perform((client, done) => {
        application.showSniperHasLostAuction()
        done()
      }).end()
  },
  after: browser => {
    auction.stop()
    application.stop()
    // LOOK AT THIS SHIT. REALLY?
    exec('kill $(lsof -ti tcp:4444)')
    process.exit()
  }
}