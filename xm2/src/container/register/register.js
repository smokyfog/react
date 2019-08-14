import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'


@connect(
  state => state.user,
  { register }
)
@imoocForm
class Register extends React.Component{
  constructor(props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)  // 第一种方式（性能好）
  }
  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }
  handleRegister() {
    this.props.register(this.props.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    const redirect = this.props.redirectTo
    return (
      <div>
        { console.log(this.props.redirectTo) }
        { redirect && redirect !== './login' ?<Redirect to={ this.props.redirectTo } />: null }
        <Logo></Logo>
        <List>
          { this.props.msg? <p className='error-msg'>{this.props.msg}</p>: '' }
          <InputItem 
            onChange={v => this.props.handleChange('user', v)}    
          >用户名</InputItem> {/* 第二种方式（更简单）*/}
          <WhiteSpace />
          <InputItem
            onChange={v => this.props.handleChange('pwd', v)}
            type='password'
          >密码</InputItem>
          <WhiteSpace />
          <InputItem
            onChange={v => this.props.handleChange('repeatpwd', v)}
            type='password'
          >确认密码</InputItem>
          <WhiteSpace />
          <RadioItem
            checked={ this.props.state.type === 'genius' }
            onChange={() => this.props.handleChange('type', 'genius')}
          >牛人
          </RadioItem>
          <WhiteSpace />
          <RadioItem
            checked={ this.props.state.type === 'boss' }
            onChange={() => this.props.handleChange('type', 'boss')}
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