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
                            <svg width="60" height="60" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z" fill="#fff"/></svg>
                        </a>
                        
                        <a href="https://www.linkedin.com/in/vikki-okamura/" target="_blank">
                        <img width="60" height="60" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIKICAgICB2aWV3Qm94PSIwIDAgNDggNDgiCiAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDsiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggc3R5bGU9IiBmaWxsOiMwMjg4RDE7IiBkPSJNIDQyIDM3IEMgNDIgMzkuNzYxNzE5IDM5Ljc2MTcxOSA0MiAzNyA0MiBMIDExIDQyIEMgOC4yMzgyODEgNDIgNiAzOS43NjE3MTkgNiAzNyBMIDYgMTEgQyA2IDguMjM4MjgxIDguMjM4MjgxIDYgMTEgNiBMIDM3IDYgQyAzOS43NjE3MTkgNiA0MiA4LjIzODI4MSA0MiAxMSBaICI+PC9wYXRoPjxwYXRoIHN0eWxlPSIgZmlsbDojRkZGRkZGOyIgZD0iTSAxMiAxOSBMIDE3IDE5IEwgMTcgMzYgTCAxMiAzNiBaICI+PC9wYXRoPjxwYXRoIHN0eWxlPSIgZmlsbDojRkZGRkZGOyIgZD0iTSAxNC40ODQzNzUgMTcgTCAxNC40NTcwMzEgMTcgQyAxMi45NjQ4NDQgMTcgMTIgMTUuODg2NzE5IDEyIDE0LjUgQyAxMiAxMy4wNzgxMjUgMTIuOTk2MDk0IDEyIDE0LjUxNTYyNSAxMiBDIDE2LjAzNTE1NiAxMiAxNi45NzI2NTYgMTMuMDc4MTI1IDE3IDE0LjUgQyAxNyAxNS44ODY3MTkgMTYuMDM1MTU2IDE3IDE0LjQ4NDM3NSAxNyBaICI+PC9wYXRoPjxwYXRoIHN0eWxlPSIgZmlsbDojRkZGRkZGOyIgZD0iTSAzNiAzNiBMIDMxIDM2IEwgMzEgMjYuOTAyMzQ0IEMgMzEgMjQuNzAzMTI1IDI5Ljc3MzQzOCAyMy4yMDMxMjUgMjcuODA4NTk0IDIzLjIwMzEyNSBDIDI2LjMwODU5NCAyMy4yMDMxMjUgMjUuNDk2MDk0IDI0LjIxNDg0NCAyNS4xMDE1NjMgMjUuMTkxNDA2IEMgMjQuOTU3MDMxIDI1LjU0Mjk2OSAyNSAyNi41MTE3MTkgMjUgMjcgTCAyNSAzNiBMIDIwIDM2IEwgMjAgMTkgTCAyNSAxOSBMIDI1IDIxLjYxNzE4OCBDIDI1LjcyMjY1NiAyMC41IDI2Ljg1MTU2MyAxOSAyOS43MzgyODEgMTkgQyAzMy4zMTY0MDYgMTkgMzYgMjEuMjUgMzYgMjYuMjczNDM4IFogIj48L3BhdGg+PC9nPjwvc3ZnPg=="/>
                        </a>
                        <a href="http://www.vikkiokamura.com" target="_blank">
                        <img width="60" height="60" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVGhD7ZpNSwJRFIb9dxER/ZQ2teoPVNSiXWS6CJRq3cemoEWgWdmHSFBUFAl9fwgZWs7pvqVozszNmnuGW54HXrjcc2e4j3PP6MLIv6d7JD3RN76xblOwp9r22qd3LJ3pn8lRbO3Migwk8oQ91bbXPrgorm5gC7OpgoiICAciIiJMhCJSeiVaPXEotlOluArGmDMJu0jljSiRq9Lk1tck1VylWltkAHaRTMFxSdSzqWqmYBdZOPQXWVQ1L/bPnyh7+ugK5v1gF1lR/eAlgaDWyk2xTD2jaeoaTrmCedS9YBe5KPqLFFTNFOwiYPfSoanthgDGe2rOJKGIgIcXdfavnI9gbJrQRMrqNXz9/BmMdVjZ7LcloqUj99FaVnOotWJlsx/fOxTNNgRagxrWmIBNBJ92tOkp+GVaydx5PJmfwiaC4+S1ca/gmAWFRQTN3NwT3wVr8ZusjjXNjjeT14Z1wTXA2m/2sBCRjhHxa9ggCb3ZdQ0bJNLsOkSECWl2nYg0ewBEpGNEpNk1kWbXISJMiIiIMCEiuGgwmac5dQMbMjR/8DuRf/M3p79FJPIOs60PSZaZTyoAAAAASUVORK5CYII="/>
                        </a>

                    </div>

                    <p className="splashInstructions teal-text text-lighten-2">Click anywhere to close</p>

            </div>
        </div>
    )
}