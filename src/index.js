import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { configureStore } from './store/store';
const queryString = require('query-string');
const store = configureStore();

const parsed = queryString.parse(window.location.search);
console.log(parsed)

ReactDOM.render(
    <Provider store={store}>
        <App taskName={parsed.taskName}/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
