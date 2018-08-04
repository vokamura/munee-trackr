import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../assets/css/app.css';
import { Route } from 'react-router-dom';
import Home from './home';
import ExpenseLog from './expense_log';

const App = () => (
    <div>
        <div className="container">
            <Route exact path="/" component={Home}/>
            <Route path="/expense-log" component={ExpenseLog}/>
        </div>
    </div>
);

export default App;
