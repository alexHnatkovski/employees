import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/';
import configureStore from './store/configureStore';
import {fetchEmployees} from './actions/employee.actions';

const store = configureStore();
store.dispatch(fetchEmployees());

const rootEl = document.querySelector('.root')

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootEl
);