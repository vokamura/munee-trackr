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
                <p>Date: {itemID.date}</p>
                <p>Location: {itemID.location}</p>
                <p>Description: {itemID.description}</p>
                <p>Amount ${itemID.debitcredit}</p>
            </div>
        </div>
    )
}