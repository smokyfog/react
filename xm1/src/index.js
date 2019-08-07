import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { counter } from './index.redux'

// compose把多个中间件连接在一块
const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension? window.devToolsExtension(): f=>f  // 使用redux-devtools
))

ReactDOM.render(
    <Provider store={ store }>
        <App /> 
    </Provider>,
    document.getElementById('root')
);
