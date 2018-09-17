import React, { Component } from 'react';
import db from '../hoc/db';
import ExpenseInput from './expense_input';
import ExpenseItems from './expense_items';
import Splash from './splash';

class ExpenseLog extends Component {
    constructor(props){
        super(props);
        this.state = {
            showForm: false,
            changeBtn: false,
            insertError: '',
            showSplash: true
        }
        this.addForm = this.addForm.bind(this);
    }

    hideModal = () => {
        this.setState({
            showSplash: false
        });
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
            });
        }
    } 

    //Show input form component
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

    //Checks the length on inputs
    lengthCheck = (event) => {
        if(event.target.innerText.length > 19){
            console.log(event.target.innerText.length);
            event.preventDefault();
            return false;
        };
    }

    keyPresses = (event) =>{
        this.enterKey(event);
        this.lengthCheck(event);
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

            const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
            const placeRegex = /[a-zA-Z0-9\s]{3,20}/gm;
            const descriptionRegex = /[a-zA-Z0-9\s]{3,35}/gm;
            const regexAmount = /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/;

            //If the amount includes a dollar sign, take it out and convert to a number
            if(newAmount.includes("$")){
                var newNumber = newAmount.substr(1);
                newAmount = parseFloat(newNumber);
            }
            newAmount = parseFloat(newAmount);

            //If the amount doesn't have any or enough decimals, add them in
            if(newAmount.toFixed(0) || newAmount.toFixed(1)){
                newAmount = newAmount.toFixed(2);
            }

            if(!regexAmount.test(newAmount)){
                this.setState({
                    insertError: 'Enter a dollar amount'
                });
            } 

            if (!dateRegex.test(newDate)){
                this.setState({
                    insertError: 'Enter a date with the format mm/dd/yyyy'
                });
            } 

            if (!placeRegex.test(newPlace)){
                this.setState({
                    insertError: 'Enter a location between 3 and 20 characters'
                });
            } 
            if (!descriptionRegex.test(newDescription)){
                this.setState({
                    insertError: 'Enter a description'
                });
            } 

            element.getElementsByTagName("td")[3].textContent = "$" + newAmount;

            if (dateRegex.test(newDate) && regexAmount.test(newAmount) && newPlace !== "" && newDescription !== ""){

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
                    newDate,
                    newPlace,
                    newDescription,
                    newAmount,
                    key
                )

                this.setState({
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
        const { changeBtn, showForm, insertError, showSplash} = this.state;
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
                    <ExpenseItems keyPresses={(e)=>{this.keyPresses(e)}} lineBalance={lineBalance} changeBtn={changeBtn} entriesArray={this.props.log} editInput={()=>{this.editInput()}} key={entry.id} entry={entry} runningTotal={runningTotal} deleteItem={(e)=>{this.props.deleteItem(e)}} handleChangeUpdateBtn={(e)=>{this.handleChangeUpdateBtn(e)}}/>
                )
            });

        //Changes icon for the input form
        if (showForm){
            formSymbol = "close";
        } else {
            formSymbol = "add";
        }

        return (
            <div>

                <Splash showSplash={showSplash} hideModal={this.hideModal} />

                <h4 className="center responsive-table">Income and Expenses</h4>
                <h5 className="center-align red-text text-darken-1">{insertError}</h5>
                <table id="borderStructure" className="center highlight">
                    <thead className="green lighten-5">
                        <tr>
                            <th className="col s2 m1 center-align">Date</th>
                            <th className="col s2 m2 center-align editLocation">Location</th>
                            <th className="col m3 hide-on-small-only center-align ">Description</th>
                            <th className="col s2 m1 center-align">Amount</th>
                            <th className="col m1 hide-on-small-only center-align ">Balance</th>
                            <th className="col s2 m1 center-align">Delete</th>
                            <th className="col s2 m1 center-align">Update</th>
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