import React, {Component} from 'react';
import About from './about';

class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            showAbout: false
        }
    }

    addAbout(){
        const {showAbout} = this.state;
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

    reload(){
        location.reload();
    }

    render(){
        return (
            <nav className="green darken-3">
                <div className="nav-wrapper">
                    <h3 className="brand-logo left reload" onClick={this.reload}>Munee Logger</h3>
                    <ul className="right nav-mobile">
                        <li >
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

