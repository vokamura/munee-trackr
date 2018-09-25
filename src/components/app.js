import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../assets/css/app.css';
import Nav from './nav';
import ExpenseLog from './expense_log';

const App = () => (
    <div>
        <Nav/>
        <div className="container">
            <ExpenseLog />
        </div>
    </div>
);

export default App;
