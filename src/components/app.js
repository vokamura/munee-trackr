import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../assets/css/app.css';
import { Route } from 'react-router-dom';
import Nav from './nav';
import ExpenseLog from './expense_log';
import About from './about';

const App = () => (
    <div>
        <Nav/>
        <div className="container">
            <Route exact path="/" component={ExpenseLog}/>
            <Route path="/about" component={About}/>
        </div>
    </div>
);

export default App;
