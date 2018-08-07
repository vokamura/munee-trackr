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

    updateItem = (e) => {
            console.log(this.props.log);
        }

    render(){
        const { date, location, description, debitcredit, noDate, noAmount } = this.state;
        return(
            <form style={{marginTop: 20}} className="row" onSubmit={this.handleSubmit}>
                <div className="col s6 offset-s3">
                    <h5>Please enter your income or expense details</h5>
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
                    <label>Debit or Credit (Use "-" for credit)</label>
                    <input
                        required
                        type= "number"
                        value={debitcredit}
                        onChange={ e => this.setState({ 
                            debitcredit: e.target.value 
                    })}/>
                    <div className="red-text">{noAmount}</div>
                    <button onClick={this.handleSubmit} className="waves-effect waves-light btn right">
                        Submit
                    <i className="material-icons right">send</i>
                </button>
                </div>
                
            </form>
        )
    }
}

export default ExpenseInput;