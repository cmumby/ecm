import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import Location from '../../../util/Location';


export default class Case extends Component {
    
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
      //  var thisRef = this;
        this.caseData = this.props.case;
        
    }
    updateData(data) {
        var thisRef = this; console.log("update: ", thisRef);
        this.caseService.update(data, this.props.case.ecmId, (data) => {
           // this.caseData = data;
           // thisRef.setState({ case: data });
        })
    }

    componentWillMount() {
        this.fillData();
    }

    componentDidUpdate(prevProps, prevState, snapshot){ 
        var updatedCase = prevState.case;
        console.log("top:" , prevState.case);
        this.updateData(this.props.case);
       if (updatedCase.requirement.hasOwnProperty('cip')){
            this.updateData(updatedCase);
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
            default:
                return false;

        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        this.setState({[name]: event.target.value});
    }
  

    render() {  console.log("renderb: " , this.props.case)
        
        var usStates = this.usStates;
        var countries = this.countries;

        return (

                   
                    <div className="box-body">
                        <label>
                            <input type="checkbox" checked={this.props.case.requirement.proxyRR.registeredAddress.complete ? 'checked':''} /> Registered / Residential Address
                        </label>
                        <div className="form-group">
                            <label htmlFor="registeredAddress-firstLine">Address Line 1</label>
                            <input onChange={(e) => this.updateForm(e,'ra-firsLine')} type="text" className="form-control" id="registeredAddress-firstLine" placeholder="No P.O Boxes" value={this.props.case.requirement.proxyRR.registeredAddress.firstLine} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="registeredAddress-secondLine">Address Line 2</label>
                            <input onChange={(e) => this.updateForm(e, 'ra-secondLine')} type="text" className="form-control" id="registeredAddress-secondLine" value={this.props.case.requirement.proxyRR.registeredAddress.secondLine}  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input onChange={(e) => this.updateForm(e, 'ra-city')}type="text" className="form-control" id="city" placeholder="Exactly As it is Written in Attached Document, Misspellings and all." value={this.props.case.requirement.proxyRR.registeredAddress.city} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerState">State/Province</label>
                            <select onChange={(e) => this.updateForm(e, 'ra-state')} id="customerState" className="form-control" value={this.props.case.requirement.proxyRR.registeredAddress.state}>
                                <option value="0">Select a State</option>
                            {usStates.map((state,index) =>
                                   
                                    <option key={index} value={state} >{state}</option>
                            )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <select onChange={(e) => this.updateForm(e, 'ra-country')} id="customerState" className="form-control" value={this.props.case.requirement.proxyRR.registeredAddress.country} disabled>
                                <option value="0">Select a Country</option>
                                {countries.map((country, index) =>

                                    <option key={index} value={country} >{country}</option>
                                )}
                            </select>
                            <p className="help-block">Countries Limited to the United States in the Alpha Build</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">Postal Code</label>
                            <input onChange={(e) => this.updateForm(e, 'ra-postalCode')} type="text" className="form-control" id="ra-postal-code" placeholder="For Best Practice, please only use the first 5 digits of the Postal Code" value={this.props.case.requirement.proxyRR.registeredAddress.postalCode} />
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" /> Analyst Correction Required
                            </label>
                        </div>
                        <div class="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'ra-comments')} class="form-control" rows="3" placeholder="" value={this.props.case.requirement.proxyRR.registeredAddress.comments}></textarea>
                        </div>
                    </div>               
            
        );
    }
}
