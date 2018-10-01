import React from 'react';

export default (props) => {
    const targetID = props.targetID;
    let itemID = 0;
    for (var i = 0; i < props.log.length; i++){
        if(props.log[i].id == targetID){
            itemID = props.log[i];
        }
    }
    return(
        <div className="moreShadow" onClick={props.hideMore} className={props.showMore ? "moreShadow display-none" : "moreShadow display-block"}>
            <div className="moreBody center-align">
                {/* Turn this into a table */}
                <h5>Entry Details</h5>
            <table className="moreTable">
                <tr>
                    <td className="moreRow">Date: </td> 
                    <td>
                        <span className="right-align" id="editDate" onKeyPress={(e) => props.keyPresses(e)}  onChange={props.editMoreInput} onBlur={props.editMoreInput}>{itemID.date}</span>
                    </td>
                </tr>
                <tr>
                    <td className="moreRow">Location: </td>
                    <td>
                        <span id="editLocation" onKeyPress={(e) => props.keyPresses(e)}  onChange={props.editMoreInput} onBlur={props.editMoreInput}>{itemID.location}</span>
                    </td>
                </tr>
                <tr>
                    <td className="moreRow">Description: </td>
                    <td>
                        <span id="editDescription" onKeyPress={(e) => props.keyPresses(e)}  onChange={props.editMoreInput} onBlur={props.editMoreInput}>{itemID.description}</span>
                    </td>
                </tr>
                <tr>
                    <td className="moreRow">Amount </td>
                    <td>
                        $<span id="editAmount" onKeyPress={(e) => props.keyPresses(e)}  onChange={props.editMoreInput} onBlur={props.editMoreInput}>{itemID.debitcredit}</span>
                    </td>
                </tr>
            </table>

            <div>
                <button 
                    className="btn-floating waves-effect waves-light red top" 
                    onClick={props.deleteMoreItem} itemnumber={itemID}>
                        <i id="clickBehind" className="material-icons toggleDelete">delete</i>
                </button>
                <button className={props.changeBtn ? "btn-floating waves-effect waves-light green update" : "btn-floating waves-effect waves-light light-blue update"} 
                    onClick={props.updateMoreItem} itemnumber={itemID}>
                        <i id="clickBehind" className="material-icons submit toggleEditSubmit">edit</i>
                </button>
            </div> 

            </div>
        </div>
    )
}