import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Route} from 'react-router-dom';
import './asserts/css/base.css';

import './plugins/axios';
import {BrowserRouter} from 'react-router-dom';

import store from './store';
import {Provider} from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route component={App} />
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
);

serviceWorker.unregister();
