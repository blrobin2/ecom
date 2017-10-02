const ApplicationRunner = require('./helpers/ApplicationRunner')
let application;

module.exports = {
  before: browser => {
    application = new ApplicationRunner(browser)
  },
  'it can join auction until it closes': browser => {
    application.startBiddingIn('test')
  }
}