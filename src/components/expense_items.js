import React, { Component } from 'react';

class ExpenseItems extends Component {
    constructor(props){
        super(props);
    }
    render(){

        let amount = parseFloat(this.props.entry.debitcredit);
        if(amount.toFixed(0) || amount.toFixed(1)){
            amount = amount.toFixed(2);
        }
        //If the number doesn't have a $, then add a $ to the number
        if(!amount.includes("$")){
            amount = "$" + amount;
        }
    
        //Adds decimals in for line item balances
        let lineamount = parseFloat(this.props.lineBalance);
        if(lineamount.toFixed(0) || lineamount.toFixed(1)){
            lineamount = lineamount.toFixed(2);
        }
    
        return (
            <tr key={this.props.entry.id} id={this.props.entry.id}>
                <td className="updated center-align tooLong" id="editDate"  onKeyPress={(e) => this.props.keyPresses(e)} onChange={this.props.editInput} onBlur={this.props.editInput}>
                    {this.props.entry.date}
                </td>
                <td className="updated tooLong center-align hide-on-small-only" id="editLocation"  onKeyPress={(e) => this.props.keyPresses(e)} onChange={this.props.editInput} onBlur={this.props.editInput}>
                    {this.props.entry.location}
                </td>
                <td className="updated tooLong center-align hide-on-small-only" id="editDescription" onKeyPress={(e) => this.props.keyPresses(e)} onChange={this.props.editInput} onBlur={this.props.editInput}>
                    {this.props.entry.description}
                </td>
                <td className="updated tooLong" id="editAmount"  onKeyPress={(e) => this.props.keyPresses(e)} onChange={this.props.editInput} onBlur={this.props.editInput}>
                    {/* {props.entry.debitcredit} */}
                    {amount}
                </td> 
    
                <td id="lineAmount" className="">
                    ${lineamount}
                </td>
                <td className="center-align">
                    <button 
                        className="btn-floating waves-effect waves-light red" 
                        onClick={this.props.deleteItem} itemnumber={this.props.entry.id}>
                            <i id="clickBehind" className="material-icons toggleDelete">delete</i>
                    </button>
                    <button className={this.props.changeBtn ? "btn-floating waves-effect waves-light green update" : "btn-floating waves-effect waves-light light-blue update"} 
                        onClick={this.props.handleChangeUpdateBtn} 
                        itemnumber={this.props.entry.id}>
                            <i id="clickBehind" className="material-icons submit toggleEditSubmit">edit</i>
                    </button>
                </td>
                <td className="center-align hide-on-med-and-up">
                    <button className="btn-floating waves-effect waves-light purple darken-1" 
                        // onClick={more} 
                        itemnumber={this.props.entry.id}>
                            <i id="clickBehind" className="material-icons submit toggleEditSubmit">add_circle_outline</i>
                    </button>
                </td>
            </tr>
        )
    }
}

export default ExpenseItems;