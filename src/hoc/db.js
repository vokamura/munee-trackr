import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateExpenseLog } from '../actions';
import firebase from '../firebase';

export default (WrappedComponent) => {
    class Db extends Component {

        dbRef = firebase.collection('expense-log');

        componentDidMount(){
            this.deleteOld();
            this.dbRef.orderBy('date').onSnapshot(this.props.updateExpenseLog);
        };

        //When app is loaded, deletes documents older than 2 hours - might have a bug
        //Take this.deleteOld() from componentDidMount if stops working
        deleteOld(){
            const time = Date.now() -  (2 * 60 * 60 * 1000);
            this.dbRef.orderBy('timestamp').where("timestamp", "<", time)
                .onSnapshot(function(querySnapshot){
                    querySnapshot.forEach(function(doc){
                        firebase.collection('expense-log').doc(`${doc.id}`).delete();
                    })
                })
        };
       
        sendLog = (date, loc, desc, drcr) => {
            const newEntry = {
                date: date,
                location: loc,
                description: desc,
                debitcredit: drcr,
                timestamp: Date.now()
            }
            this.dbRef.add(newEntry);
        };

        sendData = (date, loc, desc, drcr, key) => {
            if (date !== ""){
                this.dbRef.doc(`${key}`).update({date:date});
            }
            if (loc !== ""){
                this.dbRef.doc(`${key}`).update({location: loc});
            }
            if (desc !== ""){
                this.dbRef.doc(`${key}`).update({description: desc});
            }
            if (drcr !== ""){
                this.dbRef.doc(`${key}`).update({debitcredit: drcr});
            }
        }
           
        deleteItem = (e) => {
            const itemRow = e.target.getAttribute('itemnumber');
            if(e.target.innerText === "delete"){
                this.dbRef.doc(`${itemRow}`).delete();
            } else {
                let element = document.getElementById(`${itemRow}`);
                element.getElementsByClassName("toggleDelete")[0].innerText = "delete";
                element.getElementsByClassName("toggleEditSubmit")[0].innerText = "edit";
                this.updateItemOff(e);
                const rows = document.getElementsByTagName('tr');
                //turn off disable for update button, toggle update button back to edit
                for (var i=0; i < rows.length-1; i++){
                    if (document.getElementsByClassName('update')[i].children[0].innerHTML === "edit"){
                        document.getElementsByClassName('update')[i].disabled = false;
                        document.getElementsByClassName('update')[i].classList.remove("green");
                        document.getElementsByClassName("update")[i].classList.add("light-blue");
                    } 
                }
            }
        };

        updateItemOn = (e) => {
            const itemRow = e.target.getAttribute('itemnumber');
            let element = document.getElementById(`${itemRow}`);
            for (let i = 0; i <4; i++){
                element.getElementsByTagName('td')[i].setAttribute("contenteditable", "");
                element.getElementsByTagName('td')[i].classList.add("highlightCells");     
            }
        };

        updateItemOff = (e) => {
            const itemRow = e.target.getAttribute('itemnumber');
            let element = document.getElementById(`${itemRow}`);
            for (let i = 0; i <4; i++){
                element.getElementsByTagName('td')[i].setAttribute("contenteditable", false);    
                element.getElementsByTagName('td')[i].classList.remove("highlightCells");     
 
            }
        };

        render(){
            return <WrappedComponent {...this.props} sendData={this.sendData} updateLog={this.updateLog} sendLog={this.sendLog} deleteItem={this.deleteItem} updateItemOn={this.updateItemOn} updateItemOff={this.updateItemOff}/>
        };
    }

    function mapStateToProps(state){
        return {
            log: state.expense.log
        }
    };

    return connect(mapStateToProps, { updateExpenseLog })(Db);
}