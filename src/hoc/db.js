import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateExpenseLog } from '../actions';
import firebase from '../firebase';

export default (WrappedComponent) => {
    class Db extends Component {

        dbRef = firebase.collection('expense-log');

        componentDidMount(){
            this.dbRef.orderBy('location').onSnapshot(this.props.updateExpenseLog);
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

        updateLog = (date, loc, desc, drcr, key) => {
            const updateEntry = {
                date: date,
                location: loc,
                description: desc,
                debitcredit: drcr
            }

            // this.dbRef.doc(`${key}`).update(updateEntry).then(function(querySnapshot) {
                console.log('This is the key', key);

            // this.dbRef.doc('R2RDCBP7QPkJsliH94ZQ').update(updateEntry).then(function(doc) {
            //         console.log('Data back', doc.data());
            //         console.log("Document successfully updated!");
            // }).catch(function(error) {
            //     console.error("Error updating document: ", error);
            // });
            this.dbRef.doc(`${key}`).get().then(doc => {
                if(!doc.exists){
                    this.dbRef.doc(`${key}`).set(updateEntry);
                } else {
                    this.dbRef.doc(`${key}`).update(updateEntry);
                }
            });
        }

        deleteItem = (e) => {
            const itemRow = e.target.getAttribute('itemnumber');
            this.dbRef.doc(`${itemRow}`).delete();
        }

        updateItem = (e) => {
            const itemRow = e.target.getAttribute('itemnumber');
            let element = document.getElementById(`${itemRow}`);
            for (let i = 0; i <4; i++){
                element.getElementsByTagName('td')[i].setAttribute("contenteditable", "");     
            }
        }

        render(){
            return <WrappedComponent {...this.props} updateLog={this.updateLog} sendLog={this.sendLog} deleteItem={this.deleteItem} updateItem={this.updateItem}/>
        }
    }

    function mapStateToProps(state){
        return {
            log: state.expense.log
        }
    }

    return connect(mapStateToProps, { updateExpenseLog })(Db);
}