module.exports = {
  beforeEach: browser => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 500)
  },
  'it loads': browser => {
    browser
      .assert.visible('h1')
      .assert.title('Hello')
  },
  after: browser => {
    browser.end()
  }
}