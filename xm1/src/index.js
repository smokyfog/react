import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { 
  BrowserRouter,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import { counter } from './index.redux'
import App from './App';

// compose把多个中间件连接在一块
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  window.devToolsExtension? window.devToolsExtension(): f=>f  // 使用redux-devtools
))
function Erying() {
  return <h2>二营</h2>
}
function Qibinglian() {
  return <h2>骑兵连</h2>
}
class Test1 extends React.Component{
  render() {
    console.log(this.props)
    return <h2>{this.props.match.params.location}</h2>
  }
}
ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <div>
        <ul>
          <li><Link to='/'>一营</Link></li>
          <li><Link to='/erying'>二营</Link></li>
          <li><Link to='/qibinglian'>骑兵连</Link></li>
          <li><Link to='/dongtai/qibinglian'>动态骑兵连</Link></li>   
          <li><Link to='/dongtai/qibing'>动态骑兵</Link></li>
        </ul>
        <Switch>  {/*只渲染命中的第一个Route*/}
          <Route path='/' exact component={App}></Route>
          <Route path='/erying' component={Erying}></Route>
          <Route path='/qibinglian' component={Qibinglian}></Route>
          <Route path='/dongtai/:location' component={Test1}></Route>   {/* 动态路由 */}
          <Route path='/:location' component={Test1}></Route>
          <Redirect to='/qibinglian'></Redirect>   {/* 默认加载的路由 */}
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
