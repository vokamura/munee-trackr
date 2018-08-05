import React, { Component } from 'react';

class ExpenseInput extends Component {
    state = { 
        date: '',
        location: '',
        description: '',
        debitcredit: '',
        noDate: '',
        noAmount: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(!this.state.date && this.props.showForm){
            this.state.noDate = <div>Please enter a date</div>;
        }

        if(!this.state.debitcredit && this.props.showForm){
            this.state.noAmount = <div>Please enter an amount</div>;
        }

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
        const { date, location, description, debitcredit, noDate, noAmount } = this.state;
        //error is here
        return(
            <form className="row" onSubmit={this.handleSubmit}>
                <div className="col s6 offset-s3">
                <p>Please enter your details</p>
                <label>Date</label>
                <input
                    required
                    type= "text"
                    value={date}
                    onChange={ e => this.setState({ 
                        date: e.target.value,
                })}/>
                <div className="red-text">{noDate}</div>
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
                    required
                    type= "number"
                    value={debitcredit}
                    onChange={ e => this.setState({ 
                        debitcredit: e.target.value 
                })}/>
                <div className="red-text">{noAmount}</div>
                </div>
                <button onClick={this.handleSubmit} className="waves-effect waves-light btn">
                    Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        )
    }
}

export default ExpenseInput;