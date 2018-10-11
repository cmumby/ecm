import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';


export default class GeneralDescriptionOfBusiness extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.state = this.caseStructure.getStructure();
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
            case "db-description":
                this.props.case.requirement.remediation.generalDescriptionOfBusiness.description = event.target.value;
                break;
            case "db-comments":
                this.props.case.requirement.remediation.generalDescriptionOfBusiness.comments = event.target.value;
                break;
            case "db-correction-required":
                this.props.case.requirement.remediation.generalDescriptionOfBusiness.raCorrectionRequired = event.target.checked;
                break;
            case "db-complete":
                this.props.case.requirement.remediation.generalDescriptionOfBusiness.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "db-correction-required" || "db-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }  
    }

    render() {  
        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.remediation.generalDescriptionOfBusiness.complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"remediation " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'db-complete')} checked={this.props.case.requirement.remediation.generalDescriptionOfBusiness.complete ? 'checked':''} /> General Description of the Customers Business
                        </label>
                        <div className="form-group">
                            <label>General Description of the Customers Business</label>
                            <textarea onChange={(e) => this.updateForm(e, 'db-description')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.remediation.generalDescriptionOfBusiness.description}></textarea>
                        </div>
            
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'db-correction-required')} type="checkbox" checked={this.props.case.requirement.remediation.generalDescriptionOfBusiness.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'db-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.remediation.generalDescriptionOfBusiness.comments}></textarea>
                        </div>
                    </div>                
        );
    }
}