const socket = io()

export function init() {
  const sniperStatus = document.getElementById('sniperStatus')
  socket.on('auction.joined', msg => {
    sniperStatus.innerHTML = 'Joined'
  })
  socket.on('auction.closed', msg => {
    sniperStatus.innerHTML = 'Lost'
  })
}