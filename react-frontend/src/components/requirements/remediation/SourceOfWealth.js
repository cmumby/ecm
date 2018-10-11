import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';


export default class SourceOfWealth extends Component {
    
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
            case "sw-source":
                this.props.case.requirement.remediation.sourceOfWealth.wealthSource = event.target.value;
                break;
            case "sw-comments":
                this.props.case.requirement.remediation.sourceOfWealth.comments = event.target.value;
                break;
            case "sw-correction-required":
                this.props.case.requirement.remediation.sourceOfWealth.raCorrectionRequired = event.target.checked;
                break;
            case "sw-complete":
                this.props.case.requirement.remediation.sourceOfWealth.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "vf-correction-required" || "vf-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
    }
  
    render() {  
        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.remediation.sourceOfWealth.complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"remediation " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'sw-complete')} checked={this.props.case.requirement.remediation.sourceOfWealth.complete ? 'checked':''} /> Source of Wealth (Entity)
                        </label>
                        <div className="form-group">
                            <label htmlFor="orgType">Organization Type / Sub Type of the Customer</label>
                            <select onChange={(e) => this.updateForm(e, 'sw-source')} id="orgType" className="form-control" value={this.props.case.requirement.remediation.sourceOfWealth.wealthSource}>
                                <option value="Operating Revenue">Operating Revenue</option>
                                <option value="Other" >Other</option>
                            </select>
                        </div>
            
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'sw-correction-required')} type="checkbox" checked={this.props.case.requirement.remediation.sourceOfWealth.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'sw-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.remediation.sourceOfWealth.comments}></textarea>
                        </div>
                    </div>               
        );
    }
}