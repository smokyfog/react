import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { 
  BrowserRouter,
  Route,
} from 'react-router-dom'

import reducers from './reducer'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import AuthRoute from './component/authroute/authroute'
import './config'
import './index.css'
import 'antd-mobile/dist/antd-mobile.css'


// compose把多个中间件连接在一块
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension? window.devToolsExtension(): f=>f  // 使用redux-devtools
))

ReactDOM.render(
  (<Provider store={ store }>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Route path='/bossinfo' component={ BossInfo }></Route>
        <Route path='/login' component={ Login }></Route>
        <Route path='/register' component={ Register }></Route>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
);
