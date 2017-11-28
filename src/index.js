require('./css/static.less')
require('./css/common.less')
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import changePosApp from './js/reducers'
import {render} from 'react-dom'
import Main from './pages/main.js'

var store = createStore(changePosApp)
render(
    <Provider store= {store}>
        <Main/>
    </Provider>,
    document.getElementById('app')
)