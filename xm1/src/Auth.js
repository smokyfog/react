import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login, getUserData } from './Auth.redux'

// 有两个reducers 每个reducers都有一个state
// 合并reducer
@connect(
  state=>state.auth,
  { login, getUserData }
)
class Auth extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }
  // componentDidMount() {
  //   this.props.getUserData()
  //   axios.get('/data').then(res => {
  //     if(res.status === 200) {
  //       this.setState({data: res.data})
  //     }
  //   })
  // }
  render() {
    return (
      <div>
        <h2>我的名字是： { this.props.user }, 年龄： {this.props.age}</h2>
        { this.props.isAuth? <Redirect to='/dashboard'></Redirect>: null }
        <h2>你没有权限， 需要登陆才能查看</h2>
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}

export default Auth