import React, { Component } from 'react';
import { connect } from "react-redux";
import { getSectionStatuses } from '../../../util/getSectionStatuses';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import EntityType from '../../../util/EntityType';
import Location from '../../../util/Location';
import sectionCompleteStatus from '../../../util/sectionCompleteStatus';


class LegalFormation extends Component {
    
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
        const {ecmId, requirement} = this.props.case;
        this.handleFormDataRouting(event, name);
        if(name === "lf-correction-required" || name === "lf-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }

        if(name === "lf-complete"){
            const isComplete = sectionCompleteStatus(ecmId, requirement.proxyRR);
            let newStatus = getSectionStatuses(requirement);
            newStatus.proxyRR = isComplete;
            this.props.onSectionStatusFill(newStatus);
        }

        this.updateData(this.props.case);
    }
  
    render() {  
        const { 
            complete,
            countryOfRegistration,
            raCorrectionRequired,
            comments
        } = this.props.case.requirement.proxyRR.legalFormation;
       
        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(complete){
            componentClass += " complete";
        }
        let countries = this.countries;
        return (

                    <div className={"proxyrr " + componentClass}>
                        <label>
                            <input onChange={(e) => this.updateForm(e, 'lf-complete')} type="checkbox" checked={complete ? 'checked':''} />  Legal Formation
                        </label>
                        <div className="form-group">
                            <label>Country of Registration</label>
                            <select onChange={(e) => this.updateForm(e, 'lf-country-registration')} className="form-control" value={countryOfRegistration}>
                                <option value="0">Select a Country</option>
                                {countries.map((country, index) =>

                                    <option key={index} value={country} >{country}</option>
                                )}
                            </select>
                        </div>
                       
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'lf-correction-required')} type="checkbox" checked={raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'lf-comments')} className="form-control" rows="3" placeholder="" value={comments}></textarea>
                        </div>
                    </div>               
        );
    }
}

const mapStateToProps = state => {
    return {
      statuses: state.sectionStatuses,
    };
  };

const mapDispatchToProps = dispatch => { 
    return {
        onSectionStatusFill: (statuses) => dispatch({type:"STATUS_UPDATE", value: statuses})
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LegalFormation);
