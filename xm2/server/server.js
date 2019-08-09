const app = require('express')()
const userRoute = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const utils = require('utility')

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRoute)

app.listen(3002, function() {
  console.log('node server listen 3002...')
})