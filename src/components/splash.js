import React from 'react';

export default (props) => {
    return (
        <div onClick={props.hideModal} className={props.showSplash ? "modalSplash display-block" : "modalSplash display-none"}>
            <div className="teal-text text-lighten-5 center-align" id="splashText">
                <h2 className="teal-text text-lighten-2">Welcome to Munee Trackr!</h2>
                <p className="splashInstructions ">Munee Trackr allows you to track income and expenses.</p>
                <p className="splashInstructions">Please note that this is a demo app</p>
                <p className="splashInstructions">Please note that data will be periodically wiped from the database</p>
                <p className="splashInstructions teal-text text-lighten-2">Click anywhere in this box to close</p>
            </div>
        </div>
    )
}