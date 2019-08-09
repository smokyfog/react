const mongoose = require('mongoose')
// 链接mongodb
const DB_URL = 'mongodb://129.28.187.206:27017/boss'
mongoose.connect(DB_URL, {useNewUrlParser: true})

const models = {
  user: {
    'user': { type: String, require: true },
    'pwd': { type: String, require: true },
    'type': { type: String, require: true },
    'avatar': { type: String }, // 头像
    'desc': { type: String },  // 个人简介/职位简介
    'title': { type: String },  // 职位名称
    // 如果是boss则还有两个字段
    'company': { type: String },  // 公司 
    'money': { type: String } // 薪资
  },
  chat: {
    
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}