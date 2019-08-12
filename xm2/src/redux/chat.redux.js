import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:3002')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg: [],
    unread: 0
}


export function chat(state=initState, action) {
  console.log(state,action)
  switch(action.type) {
    case MSG_LIST:
      return { ...state, chatmsg: action.payload, unread: action.payload.filter(v=>!v.read).length }
    case MSG_RECV:
      return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1 }
    // case MSG_READ:
    default:
      return state
  }
}


function msgList(msgs) {
  return { type: MSG_LIST, payload: msgs }
}
function msgRecv(msg) {
  console.log(msg)
  return { type: MSG_RECV, payload: msg }
}


export function recvMsg() {
  return dispatch => {
    socket.on('recvmsg', function(data) {
      console.log(data )
      dispatch(msgRecv(data))
    })
  }
}


// 发送聊天信息
export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendmsg', {from, to, msg})
  }
}

// 获取信息列表
export function getMsglist() {
  return async dispatch => {
    let res = await axios.get('/user/getmsglist')
    if(res.status === 200 && res.data.code === 0) {
      dispatch(msgList(res.data.msgs))
    }
  }
}