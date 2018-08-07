import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import EntityType from '../../../util/EntityType';
import Location from '../../../util/Location';


export default class LegalFormation extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.entitTypes = new EntityType();
        this.locations = new Location();
        this.state = this.caseStructure.getStructure();
        this.entites = this.entitTypes.getEntities();
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
        var updatedCase = prevState.case;
        this.updateData(this.props.case);
        if (updatedCase.requirement.hasOwnProperty('cip')){
        } else {
            return false;
        }
    }

    //Routes the changed information to the right poperty
    handleFormDataRouting(event, name){
        switch (name) { 
            case "lf-country-registration":
                this.props.case.requirement.proxyRR.legalFormation.countryOfRegistration = event.target.value;
                break;
            
            case "lf-comments":
                this.props.case.requirement.proxyRR.legalFormation.comments = event.target.value;
                break;
            case "lf-correction-required":
                this.props.case.requirement.proxyRR.legalFormation.raCorrectionRequired = event.target.checked;
                break;
            case "lf-complete":
                this.props.case.requirement.proxyRR.legalFormation.complete = event.target.checked;
                break;
            default:
                return false;

        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "lf-correction-required" || name === "lf-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
        
    }
  

    render() {  
        
        var componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.proxyRR.legalFormation.complete){
            componentClass += " complete";
        }
        var countries = this.countries;
        return (

                   
                    <div className={componentClass}>
                        <label>
                            <input onChange={(e) => this.updateForm(e, 'lf-complete')} type="checkbox" checked={this.props.case.requirement.proxyRR.legalFormation.complete ? 'checked':''} />  Legal Formation
                        </label>
                        <div className="form-group">
                            <label htmlFor="city">Country of Registration</label>
                    
                            <select onChange={(e) => this.updateForm(e, 'lf-country-registration')} id="customerState" className="form-control" value={this.props.case.requirement.proxyRR.legalFormation.countryOfRegistration}>
                                <option value="0">Select a Country</option>
                                {countries.map((country, index) =>

                                    <option key={index} value={country} >{country}</option>
                                )}
                            </select>
                        </div>
                       
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'lf-correction-required')} type="checkbox" checked={this.props.case.requirement.proxyRR.legalFormation.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'lf-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.proxyRR.legalFormation.comments}></textarea>
                        </div>
                    </div>               
            
        );
    }
}
