import React from 'react';

export default (props) => {
    return (
        <div onClick={props.hideModal} className={props.showSplash ? "splashShadow display-block" : "splashShadow display-none"}>
            <div className="teal-text text-lighten-5 center-align splashBody" id="splashText">
                <h2 className="teal-text text-lighten-2">Welcome to Munee Loggr!</h2>
                <p className="splashInstructions ">Munee Loggr allows you to track income and expenses.</p>
                <p className="splashInstructions">Please note that this is a DEMO app</p>
                <p className="splashInstructions red-text text-darken-1">Please note that entries older than 2 hours are DELETED</p>
                <p className="splashInstructions teal-text text-lighten-2">Click anywhere to close</p>
            </div>
        </div>
    )
}