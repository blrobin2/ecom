require('string-format-js')
const amqp = require('amqplib')

const { expect } = require('chai')

class MessageListener {
  constructor() {
    this.messages = []
  }

  processMessage(msg) {
    this.messages.push(msg.content.toString())
  }

  receievesAMessage(message) {
   return new Promise((resolve, reject) => {
      // Wait 5 seconds, checking every half second to see if join has occurred
      const waitForJoin = setInterval(() => {
        if (this.messages.includes(message)) {
          clearInterval(waitForJoin)
          resolve(true)
        }
      }, 500)

      setTimeout(() => {
        clearInterval(waitForJoin)
        resolve(false)
      }, 5000)
    }).then(hasJoined => {
      expect(hasJoined).to.be.true
    })
  }
}

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
    this.messageListener = new MessageListener
  }

  async join() {
    try {
      const { conn, ch, ex } = await this._createExchange() 
      await ch.publish(ex, 'auction.joined', Buffer.from('JOINED'))
    } catch (e) {
      throw new Error('Broken: ' + e.message)
      console.trace(e)
    }
  }

  async startSellingItem() {
    try {
      const { conn, ch, ex } = await this._createExchange() 
      const q = await ch.assertQueue('')
      await ch.bindQueue(q.queue, ex, '')

      ch.consume(q.queue, msg => {
        this.messageListener.processMessage(msg)
      }, { noAck: true})
    } catch (e) {
      throw new Error('Broken: ' + e.message)
      console.trace(e)
    }
  }

  async announceClosed() {
    try {
      const { conn, ch, ex } = await this._createExchange() 
      await ch.publish(ex, 'auction.closed', Buffer.from('CLOSED'))
    } catch (e) {
      throw new Error('Broken: ' + e.message)
      console.trace(e)
    }
  }

  async hasReceivedJoinRequestFromSniper() {
    const hasJoined = await this.messageListener.receievesAMessage('JOINED')
    return hasJoined
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

  async stop() {
    const { conn, ch } = await this._createExchange() 
    await ch.close(() => conn.close())
  }

  get itemId() {
    return this._itemId
  }
}