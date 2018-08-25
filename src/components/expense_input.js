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
        const {date, location, description, debitcredit} = this.state;
        
        if (date === "" || location === "" || description === "" || debitcredit === ""){
            return false;
        }
      
        this.props.send(
            date,
            location,
            description,
            debitcredit
        );

        this.setState({ 
            date: '',
            location: '',
            description: '',
            debitcredit: ''
        });
    }

    render(){
        const { date, location, description, debitcredit, showForm } = this.state;

        const enterFields = function initialField(){
            if(date === "" || location === "" || description === "" || debitcredit === ""){
                return "** All Fields Below Are Required **"
            }
        }

        const noDate = function dateField(){
            if(date === ""){
                return "Please enter date using mm/dd/yy format"
            }
        }

        const noLocation = function locationField(){
            if(location ===""){
                return "Please enter a location"
            }
        }

        const noDescription = function descriptionField(){
            if(description === ""){
                return "Please enter a description"
            }
        }

        const noAmount = function amountField(){
            if(amount ===""){
                return "Please enter an amount (numbers and 1 decimal point only)"
            }
        }

        return(
            <form style={{marginTop: 20}} className="row" onSubmit={this.handleSubmit}>
                <div className="col s6 offset-s3">

                    <h5>Please enter your income or expense details</h5>
                    <div className="red-text">{enterFields()}</div>

                    <label className="red-text">{noDate()}</label>  
                    <div>
                        <label>Date (Please use mm/dd/yy format)</label>
                        <input
                            type= "text"
                            value={date}
                            onChange={ e => this.setState({ 
                                date: e.target.value,
                        })}/>
                    </div>

                    <label className="red-text">{noLocation()}</label>
                    <div>
                        <label>Location</label>
                        <input
                            type= "text"
                            value={location}
                            onChange={ e => this.setState({ 
                                location: e.target.value,
                        })}/>
                    </div>

                    <label className="red-text">{noDescription()}</label>
                    <div>
                        <label>Add Description</label>
                        <input 
                            type="text" 
                            value={description} 
                            onChange={ e => this.setState({ 
                                description: e.target.value,
                        })}/>
                    </div>

                    <label>Debit or Credit (Use "-" for credit)</label>
                    <input
                        required
                        type= "number"
                        value={debitcredit}
                        onChange={ e => this.setState({ 
                            debitcredit: e.target.value 
                    })}/>
                    {/* <div className="red-text">{noAmount()}</div> */}
                    
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