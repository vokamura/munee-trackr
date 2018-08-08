import React from 'react';
import { Link } from 'react-router-dom';

const Nav = props => {
    return (
        <nav className="teal lighten-1">
            <div className="nav-wrapper">
                <Link style={{paddingLeft: '3%'}}to="/" className="brand-logo left">Munee Trackr</Link>
                <ul className="right nav-mobile">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li >
                        <Link to="/expense-log">Munee Log</Link>
                    </li>
                    <li >
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
    
export default Nav;