import React, { Component } from 'react';

class ExpenseInput extends Component {
    state = { 
        date: '',
        location: '',
        description: '',
        debitcredit: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Log to send: ' + this.state.location + this.state.description + this.state.debitcredit);

        this.props.send(
            this.state.date,
            this.state.location,
            this.state.description,
            this.state.debitcredit
        );

        this.setState({ 
            date: '',
            location: '',
            description: '',
            debitcredit: ''
        });
    }

    render(){
        const { date, location, description, debitcredit } = this.state;
        return(
            <form className="row" onSubmit={this.handleSubmit}>
                <div className="col s8 offset-s2">
                <label>Date</label>
                    <input
                        type= "text"
                        value={date}
                        onChange={ e => this.setState({ 
                            date: e.target.value,
                    })}/>
                    <label>Location</label>
                    <input
                        type= "text"
                        value={location}
                        onChange={ e => this.setState({ 
                            location: e.target.value,
                    })}/>
                    <label>Add Description</label>
                    <input 
                        type="text" 
                        value={description} 
                        onChange={ e => this.setState({ 
                            description: e.target.value,
                    })}/>
                    <label>Debit or Credit</label>
                    <input
                        type= "number"
                        value={debitcredit}
                        onChange={ e => this.setState({ 
                            debitcredit: e.target.value 
                    })}/>
                </div>
                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}

export default ExpenseInput;