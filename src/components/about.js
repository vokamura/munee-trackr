import React from 'react';
import githublogo from '../assets/images/githublogo.png';
import linkedinlogo from '../assets/images/linkedinlogo.png';
import portfoliologo from '../assets/images/portfoliologo.jpg';

export default () => {
    return(
        <div>
            <h1 className="center">About Munee Trackr</h1>
            <div className="center">

                <p>Munee Trackr allows you to track income and expenses.</p>
                
                <p>It's a content management system, where users can see what entries have already been made, add new entries, update old entries, and delete entries.</p>

                <p>Munee Trackr was created by Vikki Okamura to help users track personal expenses.  It was developed using ReactJS, Redux, Materialize, and Firebase. </p> 
                
                <p> This project was made as Vikki has a background in accounting and loves money.</p>


                <div className="logoContainer">
                <a href="https://github.com/vokamura" target="_blank">
                    <img className="logoImage" src={githublogo}/>
                    <p className="text-center">Vikki's Github</p>
                </a>
                <a href="https://www.linkedin.com/in/vikki-okamura/" target="_blank">
                    <img className="logoImage" src={linkedinlogo}/>
                    <p className="text-center">Vikki's LinkedIn</p>
                </a>
                    <a href="http://www.vikkiokamura.com" target="_blank">
                        <img className="logoImage" src={portfoliologo} />
                        <p className="text-center">Vikki's Portfolio</p>
                    </a>
                </div>

            </div>
        </div>
    )
}