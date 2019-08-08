 const app = require('express')()
 const mongoose = require('mongoose')
 const http = require('http')
 // 链接mongodb
 const DB_URL = 'mongodb://129.28.187.206:27017/boss'
 mongoose.connect(DB_URL)
 mongoose.connection.on('connected', function() {
     console.log('mongo connect success !')
 })
 const User = mongoose.model('user', new mongoose.Schema({
     user: { type: String, require: true },
     age: { type: Number, require: true }
 }))

 // 新增数据
//  User.create({
//      user: 'xiaohua',
//      age: 12
//  }, function(err, doc) {
//     if (!err) {
//         console.log(doc)
//     } else {
//         console.log(err)
//     }
//  })
 // 新建app
//  User.remove({ age: 18 }, function(err, doc) {
//      console.log(doc)
//  })
//  User.update({ 'user': 'xiaoming' }, { '$set': { age: 26 } }, function(err, doc){
//     console.log(doc)
//  })

app.get('/', function(req, res) {
    res.send('<h1>Hello world</h1>')
})
app.get('/data', function(req, res){
    User.findOne({'user': 'xiaoming'}, function(err, doc) {
        res.json(doc)
    })
})
app.get('/delete', function(req, res) {
    res.json({
        code: 0
    })
})

http.createServer(app).listen(3002);