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
        const { showForm } = this.state;
       
        const logElements = this.props.log.map( entry => {
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
                        Balance
                    </td>
                    <td>
                        <button className="btn-floating waves-effect waves-light red" onClick={this.props.deleteItem} itemnumber={entry.id}><i id="clickBehind" className="material-icons">delete</i></button>
                    </td>
                    <td>
                        <button className="btn-floating waves-effect waves-light blue lighten-3" onClick={this.props.updateItem} itemnumber={entry.id}><i id="clickBehind" className="material-icons">update</i></button>
                    </td>
                </tr>
            )
        });
        if(!showForm){
            return (
                <div>
                <h1 className="center responsive-table">Munee Log</h1>
                <table className="striped center">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Balance</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logElements}
                    </tbody>
                </table>
                <div onClick={this.addForm.bind(this)} id="btnAddForm" className="btn-floating green right pulse"><i className="material-icons">add</i></div>
            </div>
            );
        } else {
            return (
                <div>
                <h1 className="center">Munee Log</h1>
                <table className="striped center">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Balance</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logElements}
                    </tbody>
                </table>
                <div onClick={this.addForm.bind(this)} id="btnAddForm" className="btn-floating green right pulse"><i className="material-icons">close</i></div>
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