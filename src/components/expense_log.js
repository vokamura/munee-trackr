import React, { Component } from 'react';
import db from '../hoc/db';
import ExpenseInput from './expense_input';

class ExpenseLog extends Component {
    constructor(props){
        super(props);
        this.state = {
            showForm: false,
            changeBtn: false,
            date: '',
            location: '',
            description: '',
            debitcredit: ''
        }
        this.addForm = this.addForm.bind(this);
        this.editInput = this.editInput.bind(this);
        this.handleChangeUpdateBtn = this.handleChangeUpdateBtn.bind(this);
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

    insertForm() {
        const {showForm} = this.state;
        if(showForm){
            return <ExpenseInput send={this.props.sendLog} showForm={this.state.showForm}/>
        } 
    }

    editInput = () => {
        const editDate = document.getElementById('editDate').innerHTML;
        const editLocation = document.getElementById('editLocation').innerHTML;
        const editDescription = document.getElementById('editDescription').innerHTML;
        const editAmount = document.getElementById('editAmount').innerHTML;

        this.setState({
            date: editDate,
            location: editLocation,
            description: editDescription,
            debitcredit: editAmount
        });
    }

    handleChangeUpdateBtn = (e) => {
        const {changeBtn} = this.state;

        if(!changeBtn){
            e.target.getElementsByClassName('toggleEditSubmit')[0].innerText = "done";

            this.setState({
                changeBtn: true
            });
            this.props.updateItemOn(e);
            
        } else {
            e.target.getElementsByClassName('toggleEditSubmit')[0].innerText = "edit";
            let key = e.target.getAttribute('itemnumber');

            this.setState({
                changeBtn: false,
                key: key
            });

            this.props.sendData(
                this.state.date,
                this.state.location,
                this.state.description,
                this.state.debitcredit,
                key
            )
            this.props.updateItemOff(e);
        }
    }

    render(){
        const { changeBtn} = this.state;
        console.log(this.state);        

        let array = this.props.log;
        var runningTotal = array.reduce(function(sum, amount){
            let parsedNum = parseFloat(amount.debitcredit);
            return sum+parsedNum;
        }, 0);

        const logElements = 
        this.props.log.map( entry => {
            // let amount = parseFloat(entry.debitcredit);
            // if(amount.toFixed(0) || amount.toFixed(1)){
            //     amount = "$" + amount.toFixed(2);
            // }
        
            return (
                <tr key={entry.id} id={entry.id}>
                    <td className="updated" id="editDate" onChange={this.editInput} onBlur={this.editInput}>
                        {entry.date}
                    </td>
                    <td className="updated" id="editLocation" onChange={this.editInput} onBlur={this.editInput}>
                        {entry.location}
                    </td>
                    <td className="updated" id="editDescription" onChange={this.editInput} onBlur={this.editInput}>
                        {entry.description}
                    </td>
                    <td className="updated" id="editAmount" onChange={this.editInput} onBlur={this.editInput}>
                        {/* {amount} */}
                        {entry.debitcredit}
                    </td> 

                    <td>
                        ${runningTotal}
                    </td>
                    <td>
                        <button 
                            className="btn-floating waves-effect waves-light red" 
                            onClick={this.props.deleteItem} itemnumber={entry.id}>
                                <i id="clickBehind" className="material-icons">delete</i>
                        </button>
                    </td>
                    <td>
                        <button className={changeBtn ? "btn-floating waves-effect waves-light green lighten-3" : "btn-floating waves-effect waves-light blue lighten-3"} 
                            onClick={this.handleChangeUpdateBtn} itemnumber={entry.id}>
                                <i id="clickBehind" className="material-icons submit toggleEditSubmit">edit</i>
                        </button>
                    </td>
                </tr>
            )
        });

        return (
            <div>
                <h1 className="center responsive-table">Munee Log</h1>
                <table className="striped center">
                    <thead>
                        <tr>
                            <th className="col s1">Date</th>
                            <th className="col s2">Location</th>
                            <th className="col s3">Description</th>
                            <th className="col s1">Amount</th>
                            <th className="col s1">Balance</th>
                            <th className="col s1">Delete</th>
                            <th className="col s1">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logElements}
                    </tbody>
                </table>
                <h5 className="center card-panel">
                    Total Balance: ${runningTotal}
                </h5>
                <div onClick={this.addForm} id="btnAddForm" className="btn-floating green right pulse"><i className="material-icons">add</i></div>
                {this.insertForm()}
        </div>
        );
    }
}

export default db(ExpenseLog);