import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import EntityType from '../../../util/EntityType';
import Location from '../../../util/Location';


export default class LegalFormationRemediation extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.entitTypes = new EntityType();
        this.locations = new Location();
        this.state = this.caseStructure.getStructure();
        this.entites = this.entitTypes.getEntities();
        this.usStates = this.locations.getStates();
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
            case "lfs-state-registration":
                this.props.case.requirement.remediation.legalFormation.stateOfRegistration = event.target.value;
                break;
            case "lfs-comments":
                this.props.case.requirement.remediation.legalFormation.comments = event.target.value;
                break;
            case "lfs-correction-required":
                this.props.case.requirement.remediation.legalFormation.raCorrectionRequired = event.target.checked;
                break;
            case "lfs-complete":
                this.props.case.requirement.remediation.legalFormation.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "lfs-correction-required" || name === "lfs-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
        
    }
  
    render() {  

        const{
            complete,
            stateOfRegistration,
            raCorrectionRequired, 
            comments
        } = this.props.case.requirement.remediation.legalFormation;
        
        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(complete){
            componentClass += " complete";
        }
        let usStates = this.usStates;
        return (
                    <div className={"remediation " + componentClass}>
                        <label>
                            <input onChange={(e) => this.updateForm(e, 'lfs-complete')} type="checkbox" checked={complete ? 'checked':''} />  Legal Formation
                        </label>
                        <div className="form-group">
                            <label htmlFor="city">State of Registration</label>
                    
                            <select onChange={(e) => this.updateForm(e, 'lfs-state-registration')} id="customerState" className="form-control" value={stateOfRegistration}>
                                <option value="0">Select a State</option>
                                {usStates.map((state, index) =>

                                    <option key={index} value={state} >{state}</option>
                                )}
                            </select>
                        </div>
                       
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'lfs-correction-required')} type="checkbox" checked={raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'lfs-comments')} className="form-control" rows="3" placeholder="" value={comments}></textarea>
                        </div>
                    </div>               
        );
    }
}