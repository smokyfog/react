const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')
const _filter = { 'pwd': 0, '__v': 0 }

// 用户列表
Router.get('/list', function(req, res) {
  User.find({}, function(err, doc) {
    return res.json(doc)
  })
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