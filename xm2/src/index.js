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
import GeniusInfo from './container/geniusinfo/geniusinfo'
import AuthRoute from './component/authroute/authroute'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import './config'
import './index.css'
import 'antd-mobile/dist/antd-mobile.css'
import { Switch } from 'react-router-dom';


// compose把多个中间件连接在一块
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension? window.devToolsExtension(): f=>f  // 使用redux-devtools
))
// boss genius me msg 4个页面
ReactDOM.render(
  (<Provider store={ store }>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path='/bossinfo' component={ BossInfo }></Route>
          <Route path='/geniusinfo' component={ GeniusInfo }></Route>
          <Route path='/login' component={ Login }></Route>
          <Route path='/register' component={ Register }></Route>
          <Route path='/chat/:user' component={ Chat }></Route>
          <Route component={ Dashboard }></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
);
