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
            debitcredit: '',
            insertError: ''
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

    //Prevents enter key from being pressed in the contenteditable divs
    enterKey = (event) => {
        if(event.keyCode == 13 || event.which == 13){
            event.preventDefault();
            return false;
        }
    }

    //Make divs contenteditable and sets state onchange/onblur
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
        const {changeBtn, insertError} = this.state;
        const rows = document.getElementsByTagName('tr');
        
        if(!changeBtn){
            //Change update button to done, and change delete button to cancel
            e.target.getElementsByClassName('toggleEditSubmit')[0].innerText = "done";
            const itemRow = e.target.getAttribute('itemnumber');
            let element = document.getElementById(`${itemRow}`);
            element.getElementsByClassName("toggleDelete")[0].innerText = "cancel";

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
            const itemRow = e.target.getAttribute('itemnumber');
            let element = document.getElementById(`${itemRow}`);

            let newDate = element.getElementsByTagName("td")[0].textContent;
            let newPlace = element.getElementsByTagName("td")[1].textContent;
            let newDescription = element.getElementsByTagName("td")[2].textContent;
            let newAmount = element.getElementsByTagName("td")[3].textContent;
            console.log(newAmount);

            const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
            const placeRegex = /[a-zA-Z0-9\s]{3,20}/gm;
            const descriptionRegex = /[a-zA-Z0-9\s]{3,35}/gm;
            const regexAmount = /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/;

            //If the amount includes a dollar sign, take it out and convert to a number
            if(newAmount.includes("$")){
                var newNumber = newAmount.substr(1);
                newAmount = parseFloat(newNumber);
                console.log(newAmount);
            }

            if(!regexAmount.test(newAmount)){
                this.setState({
                    insertError: 'Enter Numbers Only'
                });
            } 

            if (!dateRegex.test(newDate)){
                this.setState({
                    insertError: 'Please enter a date'
                });
            } 

            if (!placeRegex.test(newPlace)){
                this.setState({
                    insertError: 'Please enter a location'
                });
            } 
            if (!descriptionRegex.test(newDescription)){
                this.setState({
                    insertError: 'Please enter a description'
                });
            } 

            // && placeRegex.test(newPlace) && descriptionRegex.test(newDescription)

            // if (regexAmount.test(newAmount)  && dateRegex.test(newDate)){
            if (regexAmount.test(newAmount)){

                //Toggle done button to edit and cancel button to delete
                e.target.getElementsByClassName('toggleEditSubmit')[0].innerText = "edit";
                const itemRow = e.target.getAttribute('itemnumber');
                let element = document.getElementById(`${itemRow}`);
                element.getElementsByClassName("toggleDelete")[0].innerText = "delete";
                
                let key = e.target.getAttribute('itemnumber');
                
                this.setState({
                    changeBtn: false,
                    key: key,
                });
                
                this.props.sendData(
                    this.state.date,
                    this.state.location,
                    this.state.description,
                    // this.state.debitcredit,
                    newAmount,
                    key
                )
    
                this.setState({
                    date: '',
                    location: '',
                    description: '',
                    debitcredit: '',
                    insertError: ''
                })

                this.props.updateItemOff(e);
                
                //If a button is editable, it disables all other edit buttons
                for (var i=0; i < rows.length-1; i++){
                    if (document.getElementsByClassName('update')[i].children[0].innerHTML === "edit"){
                        document.getElementsByClassName('update')[i].disabled = false;
                    } 
                }
            }
        }
    }

    render(){
        const { changeBtn, showForm, insertError} = this.state;
        var formSymbol = "add";

        //Gets total running balance, turns it into a number, and then adds necessary decimals
        let runningTotal = this.props.log.reduce(function(sum, amount){
            let parsedNum = parseFloat(amount.debitcredit);
            return sum+parsedNum;
        }, 0);
        if(runningTotal.toFixed(0) || runningTotal.toFixed(1)){
            runningTotal = runningTotal.toFixed(2);
        }

        //Adds each entry to the log
        const logElements = 
            this.props.log.map( (entry, index) => {

                //Get line balance totals
                let lineBalance = 0;
                if(index === 0){
                    lineBalance = parseFloat(this.props.log[0].debitcredit);
                } else {
                    for (var i=index; i >=0; i--){
                        lineBalance += parseFloat(this.props.log[i].debitcredit);
                    }
                }

                return (
                    <ExpenseItems enterKey={(e)=>{this.enterKey(e)}} lineBalance={lineBalance} changeBtn={changeBtn} entriesArray={this.props.log} editInput={()=>{this.editInput()}} key={entry.id} entry={entry} runningTotal={runningTotal} deleteItem={(e)=>{this.props.deleteItem(e)}} handleChangeUpdateBtn={(e)=>{this.handleChangeUpdateBtn(e)}}/>
                )
            });
        if (showForm){
            formSymbol = "close";
        } else {
            formSymbol = "add";
        }
        return (
            <div>
                <h3 className="center responsive-table">Income and Expenses</h3>
                <h5 className="center-align red-text text-darken-1">{insertError}</h5>
                <table id="borderStructure" className="striped center">
                    <thead>
                        <tr>
                            <th className="col s1 center-align">Date</th>
                            <th className="col s2 center-align">Location</th>
                            <th className="col s3 center-align">Description</th>
                            <th className="col s1 center-align">Amount</th>
                            <th className="col s1 center-align">Balance</th>
                            <th className="col s1 center-align">Delete</th>
                            <th className="col s1 center-align">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logElements}
                    </tbody>
                </table>
                <h5 className="center card-panel green lighten-5">
                    Total Balance: ${runningTotal}
                </h5>
                <div onClick={this.addForm} id="btnAddForm" className={showForm ? "btn-floating red darken-1 right pulse" : "btn-floating green darken-1 right pulse"}><i className="material-icons">{formSymbol}</i></div>
                {this.insertForm()}
            </div>
        );
    }
}

export default db(ExpenseLog);