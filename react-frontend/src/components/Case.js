import React, { Component } from 'react';
import CaseService from './CaseService';
import CaseStructure from './structures/CaseStructure';
import Location from '../util/Location';

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

    componentWillMount() {
        this.fillData();
    }

   componentDidUpdate(prevProps, prevState, snapshot){
        var updatedCase = prevState.case;
       if (updatedCase.requirement.hasOwnProperty('cip')){
            this.updateData(updatedCase);
       } else {
         return false;
       }

    }
    

    fillData() {
        var thisRef = this;
        this.caseService.get(this.props.match.params.ecmId, (data) => {
        this.caseData = data;
            thisRef.setState({ case: data });
        })
    }
    updateData(data) {
        var thisRef = this;
        this.caseService.update(data, this.props.match.params.ecmId, (data) => {
           // this.caseData = data;
           // thisRef.setState({ case: data });
        })
    }
    

    handStateLabel() {
        var statusClass = "";
        switch (this.props.obj.status) {
            case "Review In Progress":
                statusClass = "label-info";
                break;
            case 'Review Pending':
                statusClass = "label-warning";
                break;
            case 'Revisions Required':
                statusClass = "label-danger";
                break;
            case 'Requirements Complete':
                statusClass = "label-success";
                break;
            default:
                statusClass = "label-info";
        }
        return statusClass;
    }


    handleDaysSince() {
        const ONE_DAY = 24 * 60 * 60 * 1000;
        let statusTimestap = new Date(this.props.obj.statusTimestamp);
        return Math.round(Math.abs((statusTimestap.getTime() - new Date().getTime()) / (ONE_DAY)));
    }

    updateForm = (event) => {
       
        var data = { case:{} }; //this.caseStructure.getStructure();
        this.caseData.requirement.proxyRR.registeredAddress.firstLine = event.target.value;
        data.case = this.caseData;
        this.setState(data);
    }

    render() {
        
        var usStates = this.usStates;
        var countries = this.countries;

        return (
            <div className="box box-primary">
                <div className="box-header with-border">
                    <h3 className="box-title">Requirements for Case: {this.state.case.name}</h3>
                </div>
                <form>
                    
                    <div className="box-body">
                        <label>
                            <input type="checkbox" checked={this.state.case.requirement.proxyRR.registeredAddress.complete ? 'checked':''} /> Registered / Residential Address
                        </label>
                        <div className="form-group">
                            <label htmlFor="addressLine1">Address Line 1</label>
                            <input onChange={this.updateForm} type="text" className="form-control" id="addressLine1" placeholder="No P.O Boxes" value={this.state.case.requirement.proxyRR.registeredAddress.firstLine} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="addressLine2">Address Line 2</label>
                            <input type="text" className="form-control" id="addressLine2" value={this.state.case.requirement.proxyRR.registeredAddress.secondLine}  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" id="city" placeholder="Exactly As it is Written in Attached Document, Misspellings and all." value={this.state.case.requirement.proxyRR.registeredAddress.city} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerState">State/Province</label>
                            <select id="customerState" className="form-control" value={this.state.case.requirement.proxyRR.registeredAddress.state}>
                                <option value="0">Select a State</option>
                            {usStates.map((state,index) =>
                                   
                                    <option key={index} value={state} >{state}</option>
                            )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <select id="customerState" className="form-control" value={this.state.case.requirement.proxyRR.registeredAddress.country} disabled>
                                <option value="0">Select a Country</option>
                                {countries.map((country, index) =>

                                    <option key={index} value={country} >{country}</option>
                                )}
                            </select>
                            <p className="help-block">Countries Limited to the United States in the Alpha Build</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">Postal Code</label>
                            <input type="text" className="form-control" id="city" placeholder="For Best Practice, please only use the first 5 digits of the Postal Code" value={this.state.case.requirement.proxyRR.registeredAddress.postalCode} />
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" /> Check me out
                            </label>
                        </div>
                    </div>               
                </form>
            </div>
        );
    }
}
