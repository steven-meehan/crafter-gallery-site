import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
