import React, { Component } from 'react';

class ExpenseInput extends Component {
   constructor(props){
    super(props);
    this.state = { 
        date: '',
        location: '',
        description: '',
        debitcredit: '',
        dateError: '',
        locationError: '',
        descriptionError: '',
        amountError: ''
    }
    this.dateInput = React.createRef();
    this.focusDateInput = this.focusDateInput.bind(this);
   }

   focusDateInput() {
       this.dateInput.current.focus();
   }

    handleSubmit = (e) => {
        e.preventDefault();
        const {date, location, description, debitcredit} = this.state;

        const dateRegex = /^((0|1)\d{1})\/((0|1|2|3)\d{1})\/((18|19|20)\d{2})/;

        this.locationCheck(location);
        this.descriptionCheck(description);
        this.amountCheck(debitcredit);
        this.dateCheck(date);

        if (date === "" || !dateRegex.test(date) || location === ""  || description === ""  || debitcredit === ""){
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
        this.focusDateInput();
    }

    dateCheck = (date) => {
        const dateRegex = /^((0|1)\d{1})\/((0|1|2|3)\d{1})\/((18|19|20)\d{2})/;
        
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
        const descriptionRegex = /[a-zA-Z0-9\s]{3,30}/gm;
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

    lengthCheck = (event) => {
        if(event.target.value.length > 29){
            event.preventDefault();
            return false;
        };
    }

    render(){
        const { date, location, description, debitcredit, dateError, locationError, descriptionError, amountError } = this.state;

        const enterFields = function initialField(){
            if(date === "" || location === "" || description === "" || debitcredit === ""){
                return "** All Fields Below Are Required **"
            }
        }

        return(
            <div className="formShadow" onClick={this.props.hideForm.bind(this)}>
                <form id="addForm" className="row"  onSubmit={this.handleSubmit}>
                    <div className="col s10 offset-s1">

                        <div className="center-align">Please enter your income or expense details</div>
                        {/* <div className="center-align">Use + for income, and - for expenses</div> */}
                        <div className="red-text center-align">{enterFields()}</div>

                        <label className="red-text">{dateError}</label>  
                        <div>
                            <label>Date</label>
                            <input
                                ref={this.dateInput}
                                // type= "date"
                                placeholder="mm/dd/yyyy"
                                value={date}
                                onChange={ e => this.setState({ 
                                    date: e.target.value,
                            })}/>
                        </div>

                        <label className="red-text">{locationError}</label>
                        <div>
                            <label>Location (3 to 20 characters)</label>
                            <input
                                placeholder="Enter a location"
                                type= "text"
                                value={location}
                                onChange={ e => this.setState({ 
                                    location: e.target.value,
                                })}
                                onKeyPress={this.lengthCheck}
                            />
                        </div>

                        <label className="red-text">{descriptionError}</label>
                        <div>
                            <label>Description (3 to 30 characters)</label>
                            <input 
                                placeholder="Describe your income or purchase"
                                type="text" 
                                value={description} 
                                onChange={ e => this.setState({ 
                                    description: e.target.value,
                                })}
                                onKeyPress={this.lengthCheck}
                            />
                        </div>

                        <label className="red-text">{amountError}</label>
                        <div>
                            <label>Debit or Credit (Use "-" for credit)</label>
                            <input
                                required
                                placeholder="00.00"
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
                        <div className="teal-text text-lighten-2">Click anywhere to close</div>
                    </div>
                
                </form>
            </div>
        )
    }
}

export default ExpenseInput;