const { io } = require('../index')
const Bands = require('../models/bands')
const Band = require('../models/band')

const bands = new Bands()

bands.addBand(new Band('Queen'))
bands.addBand(new Band('Bon Jovi'))
bands.addBand(new Band('Heroes del Silencio'))
bands.addBand(new Band('Metallica'))

console.log(bands)

//* Mensajes de sockets
io.on('connection', (client) => {
  console.log('Cliente conectado')

  client.emit('active-bands', bands.getBands())

  client.on('disconnect', (data) => {
    console.log('Cliente desconectado')
  })

  client.on('mensaje', (payload) => {
    console.log(payload)
    io.emit('mensaje', { admin: 'Nuevo mensaje' })
  })

  client.on('emitir-mensaje', (payload) => {
    //* Emite a todos los clientes conectados
    // io.emit('nuevo-mensaje', payload)

    //* Emite a todos los clientes conectados excepto al que lo emitió
    console.log(payload)
    client.broadcast.emit('nuevo-mensaje-flutter', payload)
  })

  client.on('vote-band', (payload) => {
    console.log(payload)

    bands.voteBand(payload.id)
    io.emit('active-bands', bands.getBands())
  })

  client.on('add-band', (payload) => {
    const newBand = new Band(payload.name)
    bands.addBand(newBand)
    io.emit('active-bands', bands.getBands())
  })

  client.on('delete-band', (payload) => {
    bands.deleteBand(payload.id)
    io.emit('active-bands', bands.getBands())
  })
})
