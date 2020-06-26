const express = require('express')
const socketIO = require('socket.io')

const path = require('path')
const PORT = process.env.PORT || 5000

const server = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const io = socketIO(server);

let messages = [];

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)

    socket.emit('previousMessages', messages)

    socket.on('sendMessage', data => {
        if(data.message === "/clear") {
            messages = [];
            socket.broadcast.emit('clearAll');
        } else {
            messages.push(data)
            socket.broadcast.emit('receivedMessage', data)
        }
    })
})
