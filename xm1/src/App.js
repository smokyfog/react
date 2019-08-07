import React from 'react'
import { connect } from 'react-redux'
import { addGun, removeGun, addGunAsync } from './index.redux'
// 使用装饰器
@connect(
  // 你要state什么属性放到props里
  state=>({num:state}),
  // 你要什么方法 放到props里 自动dispatch
  { addGun, removeGun, addGunAsync }
)
class App extends React.Component{
  render() {
      return (
      <div className="App">
        <h3>现在有机枪{ this.props.num }把</h3>
        <button onClick={this.props.addGun}>申请武器</button>
        <button onClick={this.props.removeGun}>上交武器</button>
        <button onClick={this.props.addGunAsync}>拖两天给武器</button>
      </div>
    );
  }
}

// // connect 的四个参数  
// const mapStatetoProps = (state)=>{
//   return {num:state}
// }
// const actionCreators = { addGun, removeGun, addGunAsync }
// // 未使用装饰器connect
// App = connect(mapStatetoProps, actionCreators)(App)

export default App


