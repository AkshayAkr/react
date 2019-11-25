import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import dataReducer from './reducers/rootReducer'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const store = createStore(dataReducer);

ReactDOM.render(<Provider store = {store}><Router>
<App /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
