import React from 'react';
import db from '../hoc/db';

const ExpenseLog = props => {
    console.log('Expense log props: ', props.log);

    const logElements = props.log.map( msg => {
        if(msg.debitcredit % 2 === 0) {
            msg.debitcredit = msg.debitcredit.toFixed(2);
        }
        return (
            <li key={msg.id} className="collection-item row">
                <div className="col s2">
                    {msg.date}
                </div>
                <div className="col s3">
                    <b>{msg.location}</b>
                </div>
                <div className="col s4">
                    {msg.description}
                </div>
                <div className="col s3">
                    ${msg.debitcredit}
                </div>
            </li>
        )
    });

    return(
        <div>
            <h1 className="center">Munee Log</h1>
            <ul className="collection">
                {logElements}
            </ul>
        </div>
    )
}

export default db(ExpenseLog);