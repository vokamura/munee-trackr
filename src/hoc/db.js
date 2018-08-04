import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateExpenseLog } from '../actions';
import firebase from '../firebase';

export default (WrappedComponent) => {
    class Db extends Component {
        componentDidMount(){
            firebase.collection('expense-log').onSnapshot(this.props.updateExpenseLog);
        };
        
    
        // dbRef = firebase.collection('expense-log');

        // componentDidMount(){
        //     this.dbRef.orderBy('description').onSnapshot(this.props.updateExpenseLog);
        // };
       
        render(){
            return <WrappedComponent {...this.props}/>
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