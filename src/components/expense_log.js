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
            debitcredit: '',
        }
        this.addForm = this.addForm.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.handleChangeUpdateBtn = this.handleChangeUpdateBtn.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
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

    updateInput = (e) => {
        console.log("Oninput");

        const itemRow = e.target.getAttribute('itemnumber');
        let element = document.getElementById(`${itemRow}`);
        if (element.getElementsByClassName('updated')){
            let dateUpdated = element.getElementsByClassName('updated')[0].innerText;
            let locationUpdated = element.getElementsByClassName('updated')[1].innerText;
            let descriptionUpdated = element.getElementsByClassName('updated')[2].innerText;
            let amountUpdated = element.getElementsByClassName('updated')[3].innerText;
            
            this.setState({
                date: dateUpdated,
                location: locationUpdated,
                description: descriptionUpdated,
                debitcredit: amountUpdated,
                key: itemRow
            });
        }
    }

    handleUpdate = (e) => {
        e.preventDefault();
        // const itemRow = e.target.getAttribute('itemnumber');
        // let element = document.getElementById(`${itemRow}`);
        // if (element.getElementsByClassName('updated')){
        //     let dateUpdated = element.getElementsByClassName('updated')[0].innerText;
        //     let locationUpdated = element.getElementsByClassName('updated')[1].innerText;
        //     let descriptionUpdated = element.getElementsByClassName('updated')[2].innerText;
        //     let amountUpdated = element.getElementsByClassName('updated')[3].innerText;
            
        //     this.setState({
        //         date: dateUpdated,
        //         location: locationUpdated,
        //         description: descriptionUpdated,
        //         debitcredit: amountUpdated,
        //         key: itemRow
        //     });

            // this.props.updateLog(
            //     this.state.date,
            //     this.state.location,
            //     this.state.description,
            //     this.state.debitcredit,
            //     this.state.key
            // );
        // }    
        console.log(this.state);   
    }

    handleChangeUpdateBtn = (e) => {
        this.props.updateItem(e);
        const {changeBtn} = this.state;
        if(!changeBtn){
            e.target.getElementsByClassName('toggleEditSubmit')[0].innerText = "done";
            this.setState({
                changeBtn: true
            });
        } else {
            e.target.getElementsByClassName('toggleEditSubmit')[0].innerText = "edit";
            this.setState({
                changeBtn: false
            });
            this.handleUpdate(e);
        }
    }

    render(){
        const { showForm, changeBtn} = this.state;
        // console.log(this.state);
        
        //Get running balance total
        let array = this.props.log;
        var runningTotal = array.reduce(function(sum, amount){
            let parsedNum = parseFloat(amount.debitcredit);
            return sum+parsedNum;
        }, 0);

        //Add decimals to number if none and then render items
        const logElements = this.props.log.map( entry => {
            let amount = parseFloat(entry.debitcredit);
            if(amount.toFixed(0) || amount.toFixed(1)){
                amount = "$" + amount.toFixed(2);
            }
        
            return (
                <tr key={entry.id} id={entry.id}>
                    <td className="updated" onChange={this.updateInput} onBlur={this.updateInput} onInput={this.updateInput}>
                        {entry.date}
                    </td>
                    <td className="updated" onChange={this.updateInput}>
                        {entry.location}
                    </td>
                    <td className="updated" onChange={this.updateInput}>
                        {entry.description}
                    </td>
                    <td className="updated" onChange={this.updateInput}>
                        {amount}
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