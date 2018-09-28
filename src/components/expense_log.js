import React, { Component } from 'react';
import db from '../hoc/db';
import ExpenseInput from './expense_input';
import ExpenseItems from './expense_items';
import Splash from './splash';
import MoreWindow from './more';
import firebase from '../firebase';

class ExpenseLog extends Component {
    constructor(props){
        super(props);
        this.state = {
            showForm: false,
            changeBtn: false,
            insertError: '',
            showSplash: true,
            showMore: false,
            targetID: ''
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

    hideForm = (e) => {
        e.stopPropagation();
        if (e.target == document.getElementsByClassName("formShadow")[0]) {
            this.setState({
                showForm: false
            });
        }
    }

    //Show input form component
    insertForm() {
        const {showForm} = this.state;
        if(showForm){
            return <ExpenseInput send={this.props.sendLog} hideForm={this.hideForm.bind(this)} showForm={this.state.showForm}/>
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
        if(event.target.innerText.length > 29){
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
        const {changeBtn} = this.state;
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

            const dateRegex = /^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})/;
            const placeRegex = /[a-zA-Z0-9\s]{3,20}/gm;
            const descriptionRegex = /[a-zA-Z0-9\s]{3,30}/gm;
            const regexAmount = /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/;

            //If the amount includes anything except numbers, take it out and convert to a number
            if(newAmount.includes("$")){
                let characterRegex = /[^a-zA-Z0-9-. ]/gm;
                let newNumber = newAmount.replace(characterRegex, "");
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
                    insertError: 'Enter a location between 3 and 30 characters'
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

    showMore(e){
        const showMore = this.state.showMore;
        if(!showMore){
            this.setState({
                showMore: true,
                targetID: e.target.getAttribute("itemnumber")
            });
        } 
    }

    hideMore = (e) =>{
        e.stopPropagation();
        if(!e.target.matches("button")){
            this.setState({
                showMore: false,
                targetID: ''
            });
        }

    }

    deleteMoreItem = (event) => {
        const {targetID} = this.state;
        console.log(this.state);
        console.log(this);
        console.log(event.target.innerText);
        if(event.target.innerText === "delete"){
            //Used vanilla JS to create delete modal and elements in it
            let shadow = document.createElement("div");
            let node = document.createElement("div");
            let pNode = document.createElement("p");
            let textNode = document.createTextNode("Are you sure you want to delete this item?");
            pNode.appendChild(textNode);
            node.appendChild(pNode);
            shadow.appendChild(node);
            node.classList.add("deleteModal");
            shadow.classList.add("deleteShadow");
            document.getElementById("root").appendChild(shadow);

            let deleteButton = document.createElement("button");
            let deleteTextNode = document.createTextNode("Delete");
            deleteButton.appendChild(deleteTextNode);
            node.appendChild(deleteButton);

            let cancelButton = document.createElement("button");
            let cancelTextNode = document.createTextNode("Cancel");
            cancelButton.appendChild(cancelTextNode);
            node.appendChild(cancelButton);

            deleteButton.addEventListener("click", function(){
                firebase.collection('expense-log').doc(`${targetID}`).delete();
                document.getElementById("root").removeChild(shadow);
                this.setState({
                    showMore: false,
                    targetID: ''
                });
            }.bind(this));

            cancelButton.addEventListener("click", function(){
                document.getElementById("root").removeChild(shadow);
            });
        } 
        
    }

    updateMoreItem = (event) => {
        console.log(this.state.targetID);
        console.log(event.target);
        const {targetID} = this.state;
        let element = document.getElementsByClassName("moreBody")[0];
        console.log(element);
        console.log(element.getElementsByClassName("toggleEditSubmit")[0].innerText);

        if(element.getElementsByClassName("toggleEditSubmit")[0].innerText == "edit"){
            for (let i = 0; i <4; i++){
                element.getElementsByTagName("span")[i].setAttribute("contenteditable", "");
                element.getElementsByTagName("span")[i].classList.add("highlightCells");     
            }
            event.target.getElementsByClassName("toggleEditSubmit")[0].innerText = "done";
            element.getElementsByClassName("toggleDelete")[0].innerText = "cancel";

        } else {
            let newDate = element.getElementsByTagName("span")[0].textContent;
            let newPlace = element.getElementsByTagName("span")[1].textContent;
            let newDescription = element.getElementsByTagName("span")[2].textContent;
            let newAmount = element.getElementsByTagName("span")[3].textContent;
            console.log(newDate, newPlace, newDescription, newAmount);

            const dateRegex = /^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})/;
            const placeRegex = /[a-zA-Z0-9\s]{3,20}/gm;
            const descriptionRegex = /[a-zA-Z0-9\s]{3,30}/gm;
            const regexAmount = /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/;

            if(newAmount.includes("$")){
                let characterRegex = /[^a-zA-Z0-9-. ]/gm;
                let newNumber = newAmount.replace(characterRegex, "");
                newAmount = parseFloat(newNumber);
            }

            newAmount = parseFloat(newAmount);

            //If the amount doesn't have any or enough decimals, add them in
            // if(newAmount.toFixed(0) || newAmount.toFixed(1)){
            //     newAmount = newAmount.toFixed(2);
            // }

            // if(!regexAmount.test(newAmount)){
            //     this.setState({
            //         insertError: 'Enter a dollar amount'
            //     });
            // } 

            // if (!dateRegex.test(newDate)){
            //     this.setState({
            //         insertError: 'Enter a date with the format mm/dd/yyyy'
            //     });
            // } 

            // if (!placeRegex.test(newPlace)){
            //     this.setState({
            //         insertError: 'Enter a location between 3 and 30 characters'
            //     });
            // } 
            // if (!descriptionRegex.test(newDescription)){
            //     this.setState({
            //         insertError: 'Enter a description'
            //     });
            // } 

            if (dateRegex.test(newDate) && regexAmount.test(newAmount) && newPlace !== "" && newDescription !== ""){
                //Toggle done button to edit and cancel button to delete
                element.getElementsByClassName("toggleEditSubmit")[0].innerText == "edit"
                element.getElementsByClassName("toggleDelete")[0].innerText = "cancel";
            
                let key = targetID;
            
                this.setState({
                    key: key,
                });

                this.props.sendData(
                    newDate,
                    newPlace,
                    newDescription,
                    newAmount,
                    key
                )

//             this.setState({
//                 insertError: ''
//             })

//             this.props.updateItemOff(e);
            
//             //If a button is editable, it disables all other edit buttons
//             for (var i=0; i < rows.length-1; i++){
//                 if (document.getElementsByClassName('update')[i].children[0].innerHTML === "edit"){
//                     document.getElementsByClassName('update')[i].disabled = false;
//                 } 
//             }
                    if(!e.target.matches("span")){
                        this.setState({
                            showMore: false,
                            // targetID: ''
                        });
                    }

        }


        }

    }

    editMoreInput = () => {
        // if(event.target.matches("span")){
        //     this.setState({
        //         showMore: true,
        //     });
            console.log("hello");
        // }

        // const editDate = document.getElementById('editDate').innerHTML;
        // const editLocation = document.getElementById('editLocation').innerHTML;
        // const editDescription = document.getElementById('editDescription').innerHTML;
        // const editAmount = document.getElementById('editAmount').innerHTML;

        // this.setState({
        //     date: editDate,
        //     location: editLocation,
        //     description: editDescription,
        //     debitcredit: editAmount
        // });
    }
    

    insertMore(){
        const {showMore, targetID} = this.state;
        if(showMore){
            return <MoreWindow 
                    shoreMore={showMore} hideMore={this.hideMore.bind(this)}  
                    deleteMoreItem={this.deleteMoreItem} 
                    updateMoreItem={this.updateMoreItem}
                    editMoreInput={()=>{this.editMoreInput()}} 
                    targetID={targetID} 
                    log={this.props.log}/>
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
                    <ExpenseItems 
                        showMore={(e)=>this.showMore(e)} 
                        keyPresses={(e)=>{this.keyPresses(e)}} 
                        lineBalance={lineBalance} 
                        changeBtn={changeBtn} 
                        entriesArray={this.props.log} 
                        editInput={()=>{this.editInput()}} 
                        key={entry.id} entry={entry} 
                        runningTotal={runningTotal} 
                        deleteItem={(e)=>{this.props.deleteItem(e)}} 
                        handleChangeUpdateBtn={(e)=>{this.handleChangeUpdateBtn(e)}}/>
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
                
                <h4 className="center responsive-table projectTitle">Income and Expenses</h4>
                <h5 className="center-align red-text text-darken-1">{insertError}</h5>
                <table id="borderStructure" className="center highlight">
                    <thead className="green lighten-5">
                        <tr>
                            <th className="col s3 m1 center-align" id="date">Date</th>
                            <th className="col m2 hide-on-small-only center-align editLocation">Location</th>
                            <th className="col m3 hide-on-small-only center-align ">Description</th>
                            <th className="col s2 m1 center-align">Amount</th>
                            <th className="col s2 m1 center-align">Balance</th>
                            <th className="col s1 m1 center-align hide-on-small-only" id="deleteUpdate">Delete/ Update</th>
                            <th className="col hide-on-med-and-up center-align" id="moreColumn">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logElements}
                    </tbody>
                </table>
                <h5 className="center card-panel green lighten-5">
                    Total Balance: ${runningTotal}
                </h5>
                <div onClick={this.addForm} id="btnAddForm" className={showForm ? "btn-floating red darken-1 right pulse" : "btn-floating green darken-1 right pulse"}>
                    <i className="material-icons">{formSymbol}</i>
                </div>
                {this.insertForm()}
                {this.insertMore()}
            </div>
        );
    }
}

export default db(ExpenseLog);