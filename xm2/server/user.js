const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utils = require('utility')
const _filter = { 'pwd': 0, '__v': 0 }

// 用户列表
Router.get('/list', function(req, res) {
  const { type } = req.query
  User.find({ type }, function(err, doc) {
    return res.json({code: 0, data: doc})
  })
})

// 消息列表
Router.get('/getmsglist', (req, res) => {
  const user  = req.cookies.userid
  User.find({}, function(err, userdoc) {
    let users = {}
    userdoc.forEach(v => {
      users[v._id] = { name: v.user, avatar: v.avatar }
    })
    Chat.find({'$or': [{from: user}, {to: user}]}, function(err,doc) {
      if(!err) {
        return res.json({code: 0, msgs: doc, users: users})
      }
    })
  })
  // {'$or':[{ from: user, to: user }]}
})

// 登录功能
Router.post('/login', (req, res) => {
  const { user, pwd } = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function(err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户名不存在或者密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({ code: 0, data: doc })
  })
})

// 注册
Router.post('/register', function(req, res) {
  const { user, pwd, type } = req.body
  User.findOne({ user }, (err, doc)=>{
    if(doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }
    // User.create({user, pwd: md5Pwd(pwd), type}, function(err, doc) {
    //   if (err) {
    //     return res.json({code: 1, msg: '注册失败!'})
    //   }
    //   return res.json({code: 0, msg: '注册成功!'})
    // })
    const userModel = new User({ user, pwd: md5Pwd(pwd), type })
    userModel.save((err, doc) => {
      if (err) {
        return res.json({ code: 1, msg: '注册失败' })
      } else {
        const { user, type, _id } = doc
        res.cookie('userid', _id)
        return res.json({ code: 0, data: { user, type, _id } })
      }
    })
  })
})

// 标志为已读
Router.post('/readmsg', function(req, res) {
  const userid = req.cookies.userid
  const { from } = req.body
  Chat.updateMany(
    { from, to: userid }, 
    { '$set': { read: true } },
    { multi: true }, 
    function(err, doc) {
    if(!err) {
      return res.json({ code: 0, num: doc.nModified })
    } else {
      return res.json({ code: 1, msg: '修改失败' })
    }
  })
})

Router.post('/update', function(req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json.dumps({code: 1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({ code: 0, data }) 
  })
})

// 用户信息
Router.get('/info', function(req, res) {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter, function(err, doc) {
    if (err) {
      return res.json({code: 1, msg: '出错了'})
    } else {
      res.json({code: 0, data: doc})
    }
  })
})

// md5 加密
function md5Pwd(pwd) {
  const salt = 'yqzdsa'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router