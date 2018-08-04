import React from 'react';
import db from '../hoc/db';

const ExpenseLog = props => {
    console.log('Expense log props: ', props.log);

    const logElements = props.log.map( msg => {
        // if(msg.debitcredit % 2 === 0) {
        //     msg.debitcredit = msg.debitcredit.toFixed(2);
        // }
        return (
            <tr key={msg.id}>
                <td >
                    {msg.date}
                </td>
                <td >
                    {msg.location}
                </td>
                <td >
                    {msg.description}
                </td>
                <td >
                    ${msg.debitcredit}
                </td>
            </tr>
        )
    });

    return(
        <div>
            <h1 className="center">Munee Log</h1>
            <table >
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {logElements}
                </tbody>
            </table>
        </div>
    )
}

export default db(ExpenseLog);