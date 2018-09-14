import React, { Component } from 'react';

class ExpenseInput extends Component {
    state = { 
        date: '',
        location: '',
        description: '',
        debitcredit: '',
        dateError: '',
        locationError: '',
        descriptionError: '',
        amountError: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {date, location, description, debitcredit} = this.state;

        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        const placeRegex = /[a-zA-Z0-9]{3,20}/gm;
        const descriptionRegex = /[a-zA-Z0-9\s]{3,35}/gm;

        this.locationCheck(location);
        this.descriptionCheck(description);
        this.amountCheck(debitcredit);
        this.dateCheck(date);

        if (date === "" || !dateRegex.test(date) || location === "" || !placeRegex.test(location) || description === "" || !descriptionRegex.test(description) || debitcredit === ""){
            return false;
        }

        console.log(this.props);
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

    dateCheck = (date) => {
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (date === "" || !dateRegex.test(date)){
            this.setState({
                dateError:"Please enter a date using mm/dd/yyyy form"
            });
        } else {
            this.setState({
                dateError:""
            });
        }
    }

    locationCheck = (location) => {
        const placeRegex = /[a-zA-Z0-9]{3,20}/gm;
        if (location === "" || !placeRegex.test(location)){
            this.setState({
                locationError:"Please enter a location"
            });
        } else {
            this.setState({
                locationError:""
            });
        }
    }

    descriptionCheck = (description) => {
        const descriptionRegex = /[a-zA-Z0-9\s]{3,35}/gm;
        if (description === "" || !descriptionRegex.test(description)){
            this.setState({
                descriptionError:"Please enter a location"
            });
        } else {
            this.setState({
                descriptionError:""
            });
        }
    }

    amountCheck = (debitcredit) => {


        if (debitcredit === ""){
            this.setState({
                amountError:"Please enter an amount"
            });
        } else {
            this.setState({
                amountError:""
            });
        }
    }

    render(){
        const { date, location, description, debitcredit, dateError, locationError, descriptionError, amountError } = this.state;

        const enterFields = function initialField(){
            if(date === "" || location === "" || description === "" || debitcredit === ""){
                return "** All Fields Below Are Required **"
            }
        }

        return(
            <form id="addForm" className="row"  onSubmit={this.handleSubmit}>
                <div className="col s10 offset-s1">

                    <h5>Please enter your income or expense details</h5>
                    <div className="red-text">{enterFields()}</div>

                    <label className="red-text">{dateError}</label>  
                    <div>
                        <label>Date</label>
                        <input
                            // type= "date"
                            value={date}
                            onChange={ e => this.setState({ 
                                date: e.target.value,
                        })}/>
                    </div>

                    <label className="red-text">{locationError}</label>
                    <div>
                        <label>Location</label>
                        <input
                            type= "text"
                            value={location}
                            onChange={ e => this.setState({ 
                                location: e.target.value,
                        })}/>
                    </div>

                    <label className="red-text">{descriptionError}</label>
                    <div>
                        <label>Add Description</label>
                        <input 
                            type="text" 
                            value={description} 
                            onChange={ e => this.setState({ 
                                description: e.target.value,
                        })}/>
                    </div>

                    <label className="red-text">{amountError}</label>
                    <div>
                        <label>Debit or Credit (Use "-" for credit)</label>
                        <input
                            required
                            type= "number"
                            value={debitcredit}
                            onChange={ e => this.setState({ 
                                debitcredit: e.target.value 
                        })}/>
                    </div>
                   
                    
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