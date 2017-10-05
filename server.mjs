import express from 'express'
import http from 'http'
import socketIo from 'socket.io'
import amqp from 'amqplib'
import child_process from 'child_process'

const app = express()
app.set('port', process.env.PORT || 8080)
const server = http.createServer(app)
const io = socketIo.listen(server)

const AMPQ_HOSTNAME = process.env.CLOUDAMQP_URL || "amqp://localhost"
const connection = amqp.connect(AMPQ_HOSTNAME)

app.use(express.static('public'))

const applicationEvents = ['auction.joined', 'auction.closed']

io.on('connection', async socket => {
  const { conn, ch, ex } = await _createExchange('auction-item-54321')
  const q = await ch.assertQueue('')
  for (let event in applicationEvents) {
    await ch.bindQueue(q.queue, ex, event)
  }
  //await ch.publish(ex, 'auction.join', '')

  ch.consume(q.queue, msg => {
    socket.emit(msg.fields.routingKey, msg.content.toString())
  }, { noAck: true})
})

async function _createExchange(exchangeName) {
  const conn = await connection
  const ch = await conn.createChannel()
  const ex = exchangeName
  await ch.assertExchange(ex, 'fanout', {
    durable: false
  })

  return {conn, ch, ex}
}

app.get('/available-items', (req, res) => {
  let available;
  child_process.exec('rabbitmqctl list_queues', (err, stdout, stderr) => {
    available = stdout.split("\n")
    res.send(JSON.stringify(available.splice(1)))
  })
})

server.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})