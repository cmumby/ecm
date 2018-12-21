import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import Location from '../../../util/Location';


export default class RegisteredAddress extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.locations = new Location();
        this.state = this.caseStructure.getStructure();
        this.usStates = this.locations.getStates();
        this.countries = this.locations.getCountries();
    }

    fillData() { 

        this.caseData = this.props.case;  
    }

    updateData(data) {
        this.caseService.update(data, this.props.case.ecmId, (data) => {
        });
    }

    componentWillMount() {
        this.fillData();
    }

    componentDidUpdate(prevProps, prevState, snapshot){ 
        let updatedCase = prevState.case;
        this.updateData(this.props.case);
       if (updatedCase.requirement.hasOwnProperty('cip')){
            //this.updateData(updatedCase);
       } else {
         return false;
       }

    }

    //Routes the changed information to the right poperty
    handleFormDataRouting(event, name){
        switch (name) { 
            case "ra-firsLine":
                this.props.case.requirement.proxyRR.registeredAddress.firstLine = event.target.value;
                break;
            case "ra-secondLine":
                this.props.case.requirement.proxyRR.registeredAddress.secondLine = event.target.value;
                break;
            case "ra-city":
                this.props.case.requirement.proxyRR.registeredAddress.city = event.target.value;
                break;
            case "ra-state":
                this.props.case.requirement.proxyRR.registeredAddress.state = event.target.value;
                break;
            case "ra-country":
                this.props.case.requirement.proxyRR.registeredAddress.country = event.target.value;
                break;
            case "ra-postalCode":
                this.props.case.requirement.proxyRR.registeredAddress.postalCode = event.target.value;
                break;
            case "ra-comments":
                this.props.case.requirement.proxyRR.registeredAddress.comments = event.target.value;
                break;
            case "ra-correction-required":
                this.props.case.requirement.proxyRR.registeredAddress.raCorrectionRequired = event.target.checked;
                break;
            case "ra-complete":
                this.props.case.requirement.proxyRR.registeredAddress.complete = event.target.checked;
                break;
            default:
                return false;

        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "ra-correction-required" || "ra-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
        
    }
  
    render() {  
        
        let usStates = this.usStates;
        let countries = this.countries;
        const { complete, 
                firstLine, 
                secondLine,
                city, 
                state, 
                country, 
                postalCode, 
                raCorrectionRequired, 
                comments } = this.props.case.requirement.proxyRR.registeredAddress;
        
        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.proxyRR.registeredAddress.complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"proxyrr " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'ra-complete')} checked={complete ? 'checked':''} /> Registered / Residential Address
                        </label>
                        <div className="form-group">
                            <label htmlFor="registeredAddress-firstLine">Address Line 1</label>
                            <input onChange={(e) => this.updateForm(e,'ra-firsLine')} type="text" className="form-control" id="registeredAddress-firstLine" placeholder="No P.O Boxes" value={firstLine} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="registeredAddress-secondLine">Address Line 2</label>
                            <input onChange={(e) => this.updateForm(e, 'ra-secondLine')} type="text" className="form-control" id="registeredAddress-secondLine" value={secondLine}  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input onChange={(e) => this.updateForm(e, 'ra-city')}type="text" className="form-control" id="city" placeholder="Exactly As it is Written in Attached Document, Misspellings and all." value={city} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerState">State/Province</label>
                            <select onChange={(e) => this.updateForm(e, 'ra-state')} id="customerState" className="form-control" value={state}>
                                <option value="0">Select a State</option>
                            {usStates.map((state,index) =>
                                   
                                    <option key={index} value={state} >{state}</option>
                            )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <select onChange={(e) => this.updateForm(e, 'ra-country')} id="customerState" className="form-control" value={country} disabled>
                                <option value="0">Select a Country</option>
                                {countries.map((country, index) =>

                                    <option key={index} value={country} >{country}</option>
                                )}
                            </select>
                            <p className="help-block">Countries Limited to the United States in the Alpha Build</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">Postal Code</label>
                            <input onChange={(e) => this.updateForm(e, 'ra-postalCode')} type="text" className="form-control" id="ra-postal-code" placeholder="For Best Practice, please only use the first 5 digits of the Postal Code" value={postalCode} />
                        </div>
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'ra-correction-required')} type="checkbox" checked={raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'ra-comments')} className="form-control" rows="3" placeholder="" value={comments}></textarea>
                        </div>
                    </div>                
        );
    }
}
