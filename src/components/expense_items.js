import React from 'react';

export default (props) => {
    let amount = parseFloat(props.entry.runningTotal);
        if(amount.toFixed(0) || amount.toFixed(1)){
            amount = amount.toFixed(2);
        }

    return (
        <tr key={props.entry.id} id={props.entry.id}>
            <td className="updated" id="editDate" onChange={props.editInput} onBlur={props.editInput}>
                {props.entry.date}
            </td>
            <td className="updated" id="editLocation" onChange={props.editInput} onBlur={props.editInput}>
                {props.entry.location}
            </td>
            <td className="updated" id="editDescription" onChange={props.editInput} onBlur={props.editInput}>
                {props.entry.description}
            </td>
            <td className="updated" id="editAmount" onChange={props.editInput} onBlur={props.editInput}>
                {props.entry.debitcredit}
                {/* ${amount} */}
            </td> 

            <td>
                ${props.runningTotal}
            </td>
            <td>
                <button 
                    className="btn-floating waves-effect waves-light red" 
                    onClick={props.deleteItem} itemnumber={props.entry.id}>
                        <i id="clickBehind" className="material-icons">delete</i>
                </button>
            </td>
            <td>
                <button className={props.changeBtn ? "btn-floating waves-effect waves-light green lighten-3 update" : "btn-floating waves-effect waves-light blue lighten-3 update"} 
                    onClick={props.handleChangeUpdateBtn} 
                    itemnumber={props.entry.id}>
                        <i id="clickBehind" className="material-icons submit toggleEditSubmit">edit</i>
                </button>
            </td>
        </tr>
    )
}