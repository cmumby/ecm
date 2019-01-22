import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';


export default class CustomerDetails extends Component {
    
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
            case "cd-orgtype":
                this.props.case.requirement.remediation.customerDetails.organizationType = event.target.value;
                break;
            case "cd-comments":
                this.props.case.requirement.remediation.customerDetails.comments = event.target.value;
                break;
            case "cd-correction-required":
                this.props.case.requirement.remediation.customerDetails.raCorrectionRequired = event.target.checked;
                break;
            case "cd-complete":
                this.props.case.requirement.remediation.customerDetails.complete = event.target.checked;
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
        const{
            complete,
            organizationType,
            raCorrectionRequired, 
            comments
        } = this.props.case.requirement.remediation.customerDetails;

        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.remediation.customerDetails.complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"remediation " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'cd-complete')} checked={complete ? 'checked':''} /> Customer Details (Entity)
                        </label>
                        <div className="form-group">
                            <label htmlFor="orgType">Organization Type / Sub Type of the Customer</label>
                            <select onChange={(e) => this.updateForm(e, 'cd-orgtype')} id="orgType" className="form-control" value={organizationType}>
                                <option value="Limited Liability Company and Corporations ~ Corporation">Limited Liability Company and Corporations ~ Corporation</option>
                                <option value="Limited Liability Company and Corporations ~ LLC" >Limited Liability Company and Corporations ~ LLC</option>
                                <option value="Limited Liability Partnership and Limited Partnership ~ LLP">Limited Liability Partnership and Limited Partnership ~ LLP</option>
                                <option value="Limited Liability Partnership and Limited Partnership ~ LP">Limited Liability Partnership and Limited Partnership ~ LP</option>
                                <option value="Non Profit Originizatiions ~ Charity">Non Profit Originizatiions ~ Charity</option>
                            </select>
                        </div>
            
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'cd-correction-required')} type="checkbox" checked={raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'cd-comments')} className="form-control" rows="3" placeholder="" value={comments}></textarea>
                        </div>
                    </div>               
        );
    }
}