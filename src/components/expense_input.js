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

        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        const placeRegex = /[a-zA-Z0-9]{3,20}/gm;
        const descriptionRegex = /[a-zA-Z0-9\s]{3,35}/gm;

        if (date === "" || !dateRegex.test(date) || location === "" || !placeRegex.test(location) || description === "" || !descriptionRegex.test(description) || debitcredit === ""){
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

        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        const noDate = function dateField(){
            
            if(date === "" || !dateRegex.test(date)){
                return "Please enter date using mm/dd/yyyy format"
            }
        }

        const placeRegex = /[a-zA-Z0-9\s]{3,20}/gm;
        const noLocation = function locationField(){
            if(location ==="" || !placeRegex.test(location)){
                return "Please enter a location between 3 and 20 characters long"
            }
        }

        const descriptionRegex = /[a-zA-Z0-9\s]{3,35}/gm;
        const noDescription = function descriptionField(){
            if(description === "" || !descriptionRegex.test(description)){
                return "Please enter a description between 3 and 35 characters long"
            }
        }

        const noAmount = function amountField(){
            if(amount ===""){
                return "Please enter an amount (numbers and 1 decimal point only)"
            }
        }

        return(
            <form id="addForm" style={{marginTop: 20}} className="row"  onSubmit={this.handleSubmit}>
                <div className="col s6 offset-s3">

                    <h5>Please enter your income or expense details</h5>
                    <div className="red-text">{enterFields()}</div>

                    <label className="red-text">{noDate()}</label>  
                    <div>
                        <label>Date</label>
                        <input
                            type= "date"
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
                    <div>Press red cancel button to close</div>
                </div>
                
            </form>
        )
    }
}

export default ExpenseInput;