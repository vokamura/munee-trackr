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

        deleteItem = (e) => {
            const itemRow = e.target.getAttribute('itemnumber');
            this.dbRef.doc(`${itemRow}`).delete();
        }

        render(){
            return <WrappedComponent {...this.props} sendLog={this.sendLog} deleteItem={this.deleteItem}/>
        }
    }

    function mapStateToProps(state){
        return {
            log: state.expense.log
        }
    }

    return connect(mapStateToProps, { updateExpenseLog })(Db);
}