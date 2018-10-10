import React from 'react';

export default (props) => {
        let amount = parseFloat(props.entry.debitcredit);
        if(amount.toFixed(0) || amount.toFixed(1)){
            amount = amount.toFixed(2);
        }
        //If the number doesn't have a $, then add a $ to the number
        if(!amount.includes("$")){
            amount = "$" + amount;
        }
    
        //Adds decimals in for line item balances
        let lineamount = parseFloat(props.lineBalance);
        if(lineamount.toFixed(0) || lineamount.toFixed(1)){
            lineamount = lineamount.toFixed(2);
        }
    
        return (
            <tr key={props.entry.id} id={props.entry.id}>
                <td className="updated center-align tooLong" id="editDate"  onKeyPress={(e) => props.keyPresses(e)} onChange={props.editInput} onBlur={props.editInput}>
                    {props.entry.date}
                </td>
                <td className="updated tooLong center-align hide-on-small-only" id="editLocation"  onKeyPress={(e) => props.keyPresses(e)} onChange={props.editInput} onBlur={props.editInput}>
                    {props.entry.location}
                </td>
                <td className="updated tooLong center-align hide-on-small-only" id="editDescription" onKeyPress={(e) => props.keyPresses(e)} onChange={props.editInput} onBlur={props.editInput}>
                    {props.entry.description}
                </td>
                <td className="updated tooLong" id="editAmount"  onKeyPress={(e) => props.keyPresses(e)} onChange={props.editInput} onBlur={props.editInput}>
                    {amount}
                </td> 
    
                <td id="lineAmount" className="">
                    ${lineamount}
                </td>
                <td className="center-align hide-on-small-only" id="hideButtons">
                    <button 
                        className="btn-floating waves-effect waves-light red cancelDelete" 
                        // onClick={props.deleteItem} itemnumber={props.entry.id}>
                        onClick={props.handleDelete} itemnumber={props.entry.id}>
                            <i id="clickBehind" className="material-icons toggleDelete">delete</i>
                    </button>
                    <button className={props.changeBtn ? "btn-floating waves-effect waves-light green update" : "btn-floating waves-effect waves-light light-blue update"} 
                        onClick={props.handleChangeUpdateBtn} itemnumber={props.entry.id}>
                            <i id="clickBehind" className="material-icons submit toggleEditSubmit">edit</i>
                    </button>
                </td>
                <td className="center-align hide-on-med-and-up" id="moreColumn">
                    <button className="btn-floating waves-effect waves-light purple darken-1" 
                        onClick={props.showMore} 
                        itemnumber={props.entry.id}>
                            <i id="clickBehind" className="material-icons submit toggleEditMore">add_circle_outline</i>
                    </button>
                </td>
            </tr>
        )
}