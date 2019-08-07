import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from './Auth.redux'

// 有两个reducers 每个reducers都有一个state
// 合并reducer
@connect(
  state=>state.auth,
  { login }
)
class Auth extends React.Component{
  render() {
    return (
      <div>
        { this.props.isAuth? <Redirect to='/dashboard'></Redirect>: null }
        <h2>你没有权限， 需要登陆才能查看</h2>
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}

export default Auth