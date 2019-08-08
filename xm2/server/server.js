const app = require('express')()
const userRoute = require('./user')

// const mongoose = require('mongoose')
// // 链接mongodb
// const DB_URL = 'mongodb://129.28.187.206:27017/boss'
// mongoose.connect(DB_URL)

app.use('/user', userRoute)

app.listen(3002, function() {
  console.log('node server listen 3002...')
})