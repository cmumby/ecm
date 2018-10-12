import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import Location from '../../../util/Location';


export default class Sarf extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.locations = new Location();
        this.state = this.caseStructure.getStructure();
        this.countries = this.locations.getCountries();
    }

    fillData() { 
        this.caseData = this.props.case;     
    }

    updateData(data) {
        this.caseService.update(data, this.props.case.ecmId, (data) => {});
    }

    componentWillMount() {
        this.fillData();
    }

    componentDidUpdate(prevProps, prevState, snapshot){ 
        let updatedCase = prevState.case;
        this.updateData(this.props.case);
       if (updatedCase.requirement.hasOwnProperty('cip')){
       } else {
         return false;
       }
    }

    //Routes the changed information to the right poperty
    handleFormDataRouting(event, name){
        switch (name) { 
            case "srf-handlesSouthwestTrucks":
                this.props.case.requirement.transportationSarf.sarf.handlesSouthwestTrucks = (event.target.value === "true")?true:false; 
                break;
            case "srf-highRiskTransportation":
                this.props.case.requirement.transportationSarf.sarf.highRiskTransportation = (event.target.value === "true")?true:false; 
                break;
            case "srf-countryOfCitizenship":
                this.props.case.requirement.transportationSarf.sarf.countryOfCitizenship = event.target.value; 
                break;
            case "srf-comments":
                this.props.case.requirement.transportationSarf.sarf.comments = event.target.value;
                break;
            case "srf-correction-required":
                this.props.case.requirement.transportationSarf.sarf.raCorrectionRequired = event.target.checked;
                break;
            case "srf-complete":
                this.props.case.requirement.transportationSarf.sarf.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "srf-correction-required" || "srf-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
    }

    render() { 
        let countries = this.countries; 
        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.transportationSarf.sarf.complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"transportation-sarf " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'srf-complete')} checked={this.props.case.requirement.transportationSarf.sarf.complete ? 'checked':''} /> Transportation SARF
                        </label>
                        <div className="form-group">
                            <label>For trucks and Trailers only, is the equipment located or travelling in a Southwest border state for 25% or greater of its mileage (CA, AZ, NM, or TX)</label>
                            <select onChange={(e) => this.updateForm(e, 'srf-handlesSouthwestTrucks')}  className="form-control" value={this.props.case.requirement.transportationSarf.sarf.handlesSouthwestTrucks}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label>For all Transportation will the equipment be traveling to a High Risk Country</label>
                            <select onChange={(e) => this.updateForm(e, 'srf-evidenceOfFiling')} className="form-control" value={this.props.case.requirement.transportationSarf.sarf.highRiskTransportation}>
                            <option value="na">&nbsp;</option>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>For individuals only, what is the individual's country of citizenship</label>
                            <select onChange={(e) => this.updateForm(e, 'srf-countryOfCitizenship')} className="form-control" value={this.props.case.requirement.transportationSarf.sarf.countryOfCitizenship} >
                                <option value="0">Select a Country</option>
                                {countries.map((country, index) =>

                                    <option key={index} value={country} >{country}</option>
                                )}
                            </select>
                        </div>
                        
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'srf-correction-required')} type="checkbox" checked={this.props.case.requirement.transportationSarf.sarf.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'srf-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.transportationSarf.sarf.comments}></textarea>
                        </div>
                    </div>               
        );
    }
}
