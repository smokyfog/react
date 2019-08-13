import React from 'react'
import { connect } from 'react-redux'

@connect(
  state => state
)
class Msg extends React.Component{
  render() {
    // 按照聊天用户分组，根据chatid
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || 
    })
    return (
      <div>消息页</div>
    )
  }
} 

export default Msg
