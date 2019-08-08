import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
@withRouter // 注意若想在此获取router的相关信息,需要引入react-router4的withRouter并进行包裹
class AuthRoute extends React.Component{
  async componentDidMount() {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return null
    }
    // 获取用户信息
    let res = await axios.get('/user/info')
    if (res.status === 200) {
      if (res.data.code === 0) {
        // 有登陆信息
        
      } else {
        // 无登陆信息
        // 注意若想在此获取router的相关信息,需要引入react-router4的withRouter并进行包裹
        this.props.history.push('/login')
      }
    }
  }
  render() {
    return null
  }
}

export default AuthRoute