const { io } = require('../index')

//* Mensajes de sockets
io.on('connection', (client) => {
  console.log('Cliente conectado')

  client.on('disconnect', (data) => {
    console.log('Cliente desconectado')
  })

  client.on('mensaje', (payload) => {
    console.log(payload)
    io.emit('mensaje', { admin: 'Nuevo mensaje' })
  })
})
