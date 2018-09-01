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

            if(newAmount.includes("$")){
                var newNumber = newAmount.substr(1);
                newAmount = parseFloat(newNumber);
            }
            if(!regexAmount.test(newAmount)){
                alert("Enter number only"); 
            } 
            if (!dateRegex.test(newDate)){
                alert("Please enter date");
            } 
            if (!placeRegex.test(newPlace)){
                alert("Please enter a place between 3 and 20 characters");
            } 
            if (!descriptionRegex.test(newDescription)){
                alert("Please enter description between 3 and 20 characters");
            } 

            // && placeRegex.test(newPlace) && descriptionRegex.test(newDescription)

            if (regexAmount.test(newAmount)  && dateRegex.test(newDate)){
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
    }

    render(){
        const { changeBtn, showForm} = this.state;
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
                    <ExpenseItems lineBalance={lineBalance} changeBtn={changeBtn} entriesArray={this.props.log} editInput={()=>{this.editInput()}} key={entry.id} entry={entry} runningTotal={runningTotal} deleteItem={(e)=>{this.props.deleteItem(e)}} handleChangeUpdateBtn={(e)=>{this.handleChangeUpdateBtn(e)}}/>
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
                <table id="borderStructure" className="striped center">
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