import React from 'react';
import { Link } from 'react-router-dom';

const Nav = props => {
    return (
        <nav className="green darken-3">
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo left">Munee Loggr</Link>
                <ul className="right nav-mobile">
                    <li >
                        <Link to="/">Home</Link>
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