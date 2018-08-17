import React, { Component } from 'react';
import db from '../hoc/db';
import ExpenseInput from './expense_input';
import ExpenseItems from './expense_items';

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
        const rows = document.getElementsByTagName('tr');
        
        if(!changeBtn){
            e.target.getElementsByClassName('toggleEditSubmit')[0].innerText = "done";

            this.setState({
                changeBtn: true
            });

            for (var i=0; i < rows.length-1; i++){
                if (document.getElementsByClassName('update')[i].children[0].innerHTML === "edit"){
                    document.getElementsByClassName('update')[i].disabled = true;
                } 
            }

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

            this.setState({
                date: '',
                location: '',
                description: '',
                debitcredit: ''
            })

            this.props.updateItemOff(e);

            for (var i=0; i < rows.length-1; i++){
                if (document.getElementsByClassName('update')[i].children[0].innerHTML === "edit"){
                    document.getElementsByClassName('update')[i].disabled = false;
                } 
            }
        }
    }

    render(){
        const { changeBtn} = this.state;

        let array = this.props.log;
        var runningTotal = array.reduce(function(sum, amount){
            let parsedNum = parseFloat(amount.debitcredit);
            return sum+parsedNum;
        }, 0);

        const logElements = 
        this.props.log.map( entry => {
            return (
                <ExpenseItems changeBtn={changeBtn} editInput={()=>{this.editInput()}} key={entry.id} entry={entry} runningTotal={runningTotal} deleteItem={(e)=>{this.props.deleteItem(e)}} handleChangeUpdateBtn={(e)=>{this.handleChangeUpdateBtn(e)}}/>
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