import axios from 'axios'
import { getRedirectPath } from '../util'


const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

// reducer
export function user(state = initState, action){
  switch(action.type) {
    case AUTH_SUCCESS:
      return { ...state, msg: '', redirectTo: getRedirectPath(action.payload) }
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg }
    case LOAD_DATA:
      return {...state, ...action.payload}
    default:
      return state
  }
}

function authSuccess(obj) {
  const { pwd, ...data } = obj  // 小技巧 过滤掉pwd字段
  return { type: AUTH_SUCCESS, payload: data }
}
function errorMsg(msg) {
  return { msg, type: ERROR_MSG}
}


// 用户信息
export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo }
}

export function update(data) {
  return async dispatch => {
    let res = await axios.post('/user/update', data)
    if (res.status === 200 && res.data.code === 0) {
      dispatch(authSuccess(res.data.data))
    } else {
      dispatch(errorMsg(res.data.msg))
    }
  }
}

// 登录
export function login({user, pwd}){
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', { user, pwd })
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}


// 注册
export function register({user, pwd, repeatpwd, type}) {
  if (!user||!pwd||!type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd!==repeatpwd) {
    return errorMsg('两次密码输入不一致')
  }
  return dispatch => {
    axios.post('/user/register', { user, pwd, type })
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ user, pwd, type }))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}