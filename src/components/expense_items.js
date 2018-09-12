import React from 'react';

export default (props) => {

    //If the number doesn't have a $, then add a $ to the number
    if(!props.entry.debitcredit.includes("$")){
        props.entry.debitcredit = "$" + props.entry.debitcredit;
        console.log(props.entry.debitcredit);
    }

    let amount = parseFloat(props.entry.debitcredit);
    if(amount.toFixed(0) || amount.toFixed(1)){
        amount = amount.toFixed(2);
    }

    //Adds decimals in for line item balances
    let lineamount = parseFloat(props.lineBalance);
    if(lineamount.toFixed(0) || lineamount.toFixed(1)){
        lineamount = lineamount.toFixed(2);
    }

    return (
        <tr key={props.entry.id} id={props.entry.id}>
            <td className="updated" id="editDate" onKeyPress={(e) => props.enterKey(e)} onChange={props.editInput} onBlur={props.editInput}>
                {props.entry.date}
            </td>
            <td className="updated" id="editLocation" onKeyPress={(e) => props.enterKey(e)} onChange={props.editInput} onBlur={props.editInput}>
                {props.entry.location}
            </td>
            <td className="updated" id="editDescription" onKeyPress={(e) => props.enterKey(e)} onChange={props.editInput} onBlur={props.editInput}>
                {props.entry.description}
            </td>
            <td className="updated" id="editAmount" onKeyPress={(e) => props.enterKey(e)} onChange={props.editInput} onBlur={props.editInput}>
                {props.entry.debitcredit}
                {/* {amount} */}
            </td> 

            <td id="lineAmount">
                ${lineamount}
            </td>
            <td>
                <button 
                    className="btn-floating waves-effect waves-light red" 
                    onClick={props.deleteItem} itemnumber={props.entry.id}>
                        <i id="clickBehind" className="material-icons toggleDelete">delete</i>
                </button>
            </td>
            <td>
                <button className={props.changeBtn ? "btn-floating waves-effect waves-light green update" : "btn-floating waves-effect waves-light light-blue update"} 
                    onClick={props.handleChangeUpdateBtn} 
                    itemnumber={props.entry.id}>
                        <i id="clickBehind" className="material-icons submit toggleEditSubmit">edit</i>
                </button>
            </td>
        </tr>
    )
}