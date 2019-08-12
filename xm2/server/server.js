const app = require('express')()
const userRoute = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket) {
  socket.on('sendmsg', function(data){
    console.log(data)
    io.emit('recvmsg', data)
  })
})

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRoute)

server.listen(3002, function() {
  console.log('node server listen 3002...')
})