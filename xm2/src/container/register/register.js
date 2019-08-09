import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'


@connect(
  state => state.user,
  { register }
)
class Register extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius' //或者叫boss
    }
    this.handleRegister = this.handleRegister.bind(this)  // 第一种方式（性能好）
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  handleRegister() {
    console.log(this.state)
    this.props.register(this.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        { this.props.redirectTo?<Redirect to={ this.props.redirectTo } />: null }
        <Logo></Logo>
        <List>
          { this.props.msg? <p className='error-msg'>{this.props.msg}</p>: '' }
          <InputItem 
            onChange={v => this.handleChange('user', v)}    
          >用户名</InputItem> {/* 第二种方式（更简单）*/}
          <WhiteSpace />
          <InputItem
            onChange={v => this.handleChange('pwd', v)}
            type='password'
          >密码</InputItem>
          <WhiteSpace />
          <InputItem
            onChange={v => this.handleChange('repeatpwd', v)}
            type='password'
          >确认密码</InputItem>
          <WhiteSpace />
          <RadioItem
            checked={ this.state.type === 'genius' }
            onChange={() => this.handleChange('type', 'genius')}
          >牛人
          </RadioItem>
          <WhiteSpace />
          <RadioItem
            checked={ this.state.type === 'boss' }
            onChange={() => this.handleChange('type', 'boss')}
          >BOSS
          </RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register