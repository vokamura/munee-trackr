import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateExpenseLog } from '../actions';
import firebase from '../firebase';

export default (WrappedComponent) => {
    class Db extends Component {

        dbRef = firebase.collection('expense-log');

        componentDidMount(){
            this.dbRef.orderBy('date').onSnapshot(this.props.updateExpenseLog);
        };
       
        sendLog = (date, loc, desc, drcr) => {
            const newEntry = {
                date: date,
                location: loc,
                description: desc,
                debitcredit: drcr
            }
            this.dbRef.add(newEntry);
        }

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
            this.dbRef.doc(`${itemRow}`).delete();
        }

        updateItemOn = (e) => {
            const itemRow = e.target.getAttribute('itemnumber');
            let element = document.getElementById(`${itemRow}`);
            for (let i = 0; i <4; i++){
                element.getElementsByTagName('td')[i].setAttribute("contenteditable", "");     
            }
        }

        updateItemOff = (e) => {
            const itemRow = e.target.getAttribute('itemnumber');
            let element = document.getElementById(`${itemRow}`);
            for (let i = 0; i <4; i++){
                element.getElementsByTagName('td')[i].setAttribute("contenteditable", false);     
            }
        }

        render(){
            return <WrappedComponent {...this.props} sendData={this.sendData} updateLog={this.updateLog} sendLog={this.sendLog} deleteItem={this.deleteItem} updateItemOn={this.updateItemOn} updateItemOff={this.updateItemOff}/>
        }
    }

    function mapStateToProps(state){
        return {
            log: state.expense.log
        }
    }

    return connect(mapStateToProps, { updateExpenseLog })(Db);
}