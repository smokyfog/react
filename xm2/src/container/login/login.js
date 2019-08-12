import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import immocFrom from '../../component/imooc-form/imooc-form'

// function hello() {
//   console.log('hello world')
// }
// function WrapperHello(fn) {
//   return function() {
//     console.log('before say hello')
//     fn()
//     console.log('after say hello')
//   }
// }
// hello = WrapperHello(hello)
// hello()

// 属性代理
// function WrapperHello(Comp) {
//   class WaroComp extends React.Component{
//     render() {
//       return (
//         <div>
//           <p>这是HOC高阶组件特有元素</p>
//           <Comp {...this.props}></Comp>
//         </div>
//       )
//     }
//   }
//   return WaroComp
// }
// @WrapperHello
// class Hello extends React.Component{
//   render() {
//     return (
//       <h2>hello HOC</h2>
//     )
//   }
// }


// 反向继承
// function WrapperHello(Comp) {
//   class WrapComp extends Comp {
//     componentDidMount() {
//      console.log('高阶组件新增的生命周期，加载完成') 
//     }
//     render() {
//       return <Comp></Comp>
//     }
//   }
//   return WrapComp
// }
// @WrapperHello
// class Hello extends React.Component{
//   render() {
//     return (
//       <h2>hello HOC</h2>
//     )
//   }
// }

@connect(
  state => state.user,
  { login }
)
@immocFrom
class Login extends React.Component{
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.register = this.register.bind(this)
  }
  register() {
    this.props.history.push('/register')
  }
  handleLogin() {
    this.props.login(this.props.state)
  }
  render() {
    return (
      <div>
        { this.props.redirectTo&&this.props.redirectTo!=='/login'?<Redirect to={ this.props.redirectTo } />: null }
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem
              onChange={v => this.props.handleChange('user', v)}
            >用户名</InputItem>
            <WhiteSpace />
            <InputItem
              onChange={v => this.props.handleChange('pwd', v)}
              type='password'
            >密码</InputItem>
          </List>
          <Button onClick={ this.handleLogin } type='primary'>登陆</Button>
          <WhiteSpace />
          <Button onClick={ this.register } type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login