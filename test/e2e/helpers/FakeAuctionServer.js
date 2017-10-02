require('string-format-js')
const amqp = require('amqplib')

module.exports = class FakeAuctionServer {
  static get ITEM_ID_AS_LOGIN() {
    return "auction-%s"
  }

  static get AUCTION_RESOURCE() {
    return 'Auction'
  }

  static get AMQP_HOSTNAME() {
    return process.env.CLOUDAMQP_URL || "amqp://localhost"
  }

  static get AUCTION_PASSWORD() {
    return 'guest'
  }

  constructor(itemId) {
    this._itemId = itemId
    this._connection = amqp.connect(FakeAuctionServer.AMQP_HOSTNAME)
    this._currentChat = null
  }

  async startSellingItem() {
    try {
      const { conn, ch, ex } = await this._createExchange() 
      await ch.publish(ex, '', Buffer.from(`Now selling ${this.itemId}`), { persistent: false })
      await ch.close()
      await conn.close()
    } catch (e) {
      throw new Error('Broken: ' + e.message)
      console.trace(e)
    }
  }

  async _createExchange() {
    const conn = await this._connection
    const ch = await conn.createChannel()
    const ex = this._exchangeName
    await ch.assertExchange(ex, 'fanout', {
      durable: false
    })

    return {conn, ch, ex}
  }

  get _exchangeName() {
    return FakeAuctionServer.ITEM_ID_AS_LOGIN.format(this.itemId)
  }

  stop() {

  }

  get itemId() {
    return this._itemId
  }
}