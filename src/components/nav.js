import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import About from './about';

class Nav extends Component {
    constructor(props){
        super(props);
        this.state ={
            showAbout: false
        }
    }

    addAbout(){
        const {showAbout} = this.state;
        console.log("about clicked");
        if (!showAbout){
            this.setState({
                showAbout: true
            });
        } else {
            this.setState({
                showAbout: false
            });
        }
    } 

    hideAbout = () => {
        const {showAbout} = this.state;
        console.log("closed clicked");
        this.setState({
            showAbout: false
        });
    }

    insertAbout() {
        const {showAbout} = this.state;
        if(showAbout){
            return <About showAbout={this.props.showAbout} hideAbout={this.hideAbout.bind(this)} />
        } 
    }

    render(){
        return (
            <nav className="green darken-3">
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left">Munee Loggr</Link>
                    <ul className="right nav-mobile">
                        <li >
                            <Link to="/">Home</Link>
                        </li>
                        <li >
                            {/* <Link to="/about">About</Link> */}
                            <a onClick={this.addAbout.bind(this)}>About</a>
                        </li>
                    </ul>
                </div>
                {this.insertAbout()}
            </nav>
        )

    }
}
    
export default Nav;

