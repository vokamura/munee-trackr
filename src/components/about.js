import React from 'react';
import githublogo from '../assets/images/githublogo.png';
import linkedinlogo from '../assets/images/linkedinlogo.png';
import portfoliologo from '../assets/images/portfoliologo.jpg';

export default (props) => {
    return(
        <div onClick={props.hideAbout} className={props.showAbout ? "modalShadow display-none" : "modalShadow display-block"}>
            <div className="aboutBody center">
                <h4 className="teal-text text-lighten-2">About Munee Loggr</h4>

                    <p>Munee Loggr allows you to track income and expenses.</p>
                    
                    <p>It's a content management system, that performs create, read, update, and delete (CRUD) functions.</p>

                    <p>Created by Vikki Okamura to help users track personal expenses.  Developed using ReactJS, Redux, Materialize, and Firebase. </p> 
                    
                    <p> This project was made as Vikki has a background in accounting and loves money.</p>


                    <div className="logoContainer">
                    <a href="https://github.com/vokamura" target="_blank">
                        <img className="logoImage" src={githublogo}/>
                        {/* <p className="text-center">Vikki's Github</p> */}
                    </a>
                    <a href="https://www.linkedin.com/in/vikki-okamura/" target="_blank">
                        <img className="logoImage" src={linkedinlogo}/>
                        {/* <p className="text-center">Vikki's LinkedIn</p> */}
                    </a>
                        <a href="http://www.vikkiokamura.com" target="_blank">
                            <img className="logoImage" src={portfoliologo} />
                            {/* <p className="text-center">Vikki's Portfolio</p> */}
                        </a>
                    </div>

                    <p className="splashInstructions teal-text text-lighten-2">Click anywhere in this box to close</p>

            </div>
        </div>
    )
}