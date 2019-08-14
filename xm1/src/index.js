import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { 
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

// import { counter } from './index.redux'
import reducers from './reducer'
import Auth from './Auth'
import Dashboard from './Dashboard'
import Demo from './demo'
import './config'
import 'antd-mobile/dist/antd-mobile.css'

ReactDOM.render(<Demo></Demo>, document.getElementById('root'))

// // compose把多个中间件连接在一块
// const store = createStore(reducers, compose(
//   applyMiddleware(thunk),
//   window.devToolsExtension? window.devToolsExtension(): f=>f  // 使用redux-devtools
// ))
// console.log(store.getState())
// ReactDOM.render(
//   (<Provider store={ store }>
//     <BrowserRouter>
//         <Switch>  {/*只渲染命中的第一个Route*/}
//           <Route path='/login' exact component={Auth}></Route>
//           <Route path='/dashboard' component={Dashboard}></Route>
//           <Redirect to='/dashboard'></Redirect>
//         </Switch>
//     </BrowserRouter>
//   </Provider>),
//   document.getElementById('root')
// );
