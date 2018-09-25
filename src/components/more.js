import React from 'react';

export default (props) => {
    return(
        <div className="moreShadow" onClick={props.hideMore} className={props.showMore ? "moreShadow display-none" : "moreShadow display-block"}>
            <div className="moreBody">
                <h1>Hello</h1>
            </div>
        </div>
    )
}