import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateExpenseLog } from '../actions';
import firebase from '../firebase';

export default (WrappedComponent) => {
    class Db extends Component {
        // componentDidMount(){
        //     firebase.collection('expense-log').onSnapshot(this.props.updateExpenseLog);
        // };
        
        dbRef = firebase.collection('expense-log');

        componentDidMount(){
            this.dbRef.orderBy('location').onSnapshot(this.props.updateExpenseLog);
        };
       
        sendLog = (date, loc, desc, drcr) => {
            // console.log('From DB HOC:', loc, desc, drcr);
            const newEntry = {
                date: date,
                location: loc,
                description: desc,
                debitcredit: drcr
            }

            this.dbRef.add(newEntry);
        }

        render(){
            return <WrappedComponent {...this.props} sendLog={this.sendLog}/>
        }
    }

    function mapStateToProps(state){
        // console.log('Map State to Props', state);
        return {
            log: state.expense.log
        }
    }

    return connect(mapStateToProps, { updateExpenseLog })(Db);
}