import React, { Component } from 'react';
import db from '../hoc/db';
import ExpenseInput from './expense_input';

class ExpenseLog extends Component {
    constructor(props){
        super(props);
        this.state = {
            showForm: false
        }
    }

    addForm(){
        const showForm = this.state.showForm;
        if (!showForm){
            this.setState({
                showForm: true
            });
        } else {
            this.setState({
                showForm: false
            })
        }
    } 

    render(){
        // console.log('Expense log props: ', this.props.log);
        const { showForm } = this.state;
        const logElements = this.props.log.map( entry => {
            // console.log(this.props);
            return (
                <tr key={entry.id}>
                    <td >
                        {entry.date}
                    </td>
                    <td >
                        {entry.location}
                    </td>
                    <td >
                        {entry.description}
                    </td>
                    <td >
                        ${entry.debitcredit}
                    </td>
                    <td>
                        <button onClick={this.props.deleteItem} itemnumber={entry.id}>Delete</button>
                    </td>
                </tr>
            )
        });
        if(!showForm){
            return (
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
                <div onClick={this.addForm.bind(this)} className="fixed-action-btn btn-floating green right"><i className="material-icons">add</i></div>
            </div>
            );
        } else {
            return (
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
                <div onClick={this.addForm.bind(this)} className="fixed-action-btn btn-floating green right "><i className="material-icons">add</i></div>
                <ExpenseInput send={this.props.sendLog} showForm={this.state.showForm}/>
            </div>
            )
        }
        
        // return(
        //     <div>
        //         <h1 className="center">Munee Log</h1>
        //         {/* <ExpenseInput send={props.sendLog}/> */}
        //         <table >
        //             <thead>
        //                 <tr>
        //                     <th>Date</th>
        //                     <th>Location</th>
        //                     <th>Description</th>
        //                     <th>Amount</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {logElements}
        //             </tbody>
        //         </table>
        //         <div onClick={this.addForm} className="btn-floating green right"><i className="material-icons">add</i></div>
        //         {showEntryForm}
        //     </div>
        // )
    }
}

export default db(ExpenseLog);