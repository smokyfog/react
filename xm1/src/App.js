// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react'
import { connect } from 'react-redux'
import { addGun, removeGun, addGunAsync } from './index.redux'

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
// connect 的四个参数  
const mapStatetoProps = (state)=>{
  return {num:state}
}
const actionCreators = { addGun, removeGun, addGunAsync }

// 装饰器 connect负责从外部获取组件需要的参数
App = connect(mapStatetoProps, actionCreators)(App)
export default App