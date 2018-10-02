import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';


export default class RequiredDocuments extends Component {
    
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
        this.caseService.update(data, this.props.case.ecmId, (data) => {
        })
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
            case "rd-formationDocuments":
                this.props.case.requirement.documentation.requiredDocuments.formationDocuments = (event.target.value === "true")?true:false; 
                break;
            case "rd-evidenceOfFiling":
                this.props.case.requirement.documentation.requiredDocuments.evidenceOfFiling = (event.target.value === "true")?true:false; 
                break;
            case "rd-signedBoForm":
                this.props.case.requirement.documentation.requiredDocuments.signedBoForm = (event.target.value === "true")?true:false; 
                break;
            case "rd-comments":
                this.props.case.requirement.documentation.requiredDocuments.comments = event.target.value;
                break;
            case "rd-correction-required":
                this.props.case.requirement.documentation.requiredDocuments.raCorrectionRequired = event.target.checked;
                break;
            case "rd-complete":
                this.props.case.requirement.documentation.requiredDocuments.complete = event.target.checked;
                break;
            default:
                return false;

        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "rd-correction-required" || "rd-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
        
    }
  

    render() {  
        var componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.remediation.internetGambling.complete){
            componentClass += " complete";
        }
        
        return (

                   
                    <div className={"documentation " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'rd-complete')} checked={this.props.case.requirement.documentation.requiredDocuments.complete ? 'checked':''} /> Documentation
                        </label>
                        <div className="form-group">
                            <label>Formation Document or Evidence of Filing (Certificate of Good Standing, Certificate of Formation, Articles of Incorporation or equivalent evidence of filing)</label>
                            <select onChange={(e) => this.updateForm(e, 'rd-formationDocuments')}  className="form-control" value={this.props.case.requirement.documentation.requiredDocuments.formationDocuments}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label>Formation Document or Evidence of Filing (Memorandum and Articles of Incorporation, Operating Agreement, LLC Agreement or equivalent evidence of filing)</label>
                            <select onChange={(e) => this.updateForm(e, 'rd-evidenceOfFiling')} id="internetGambling" className="form-control" value={this.props.case.requirement.documentation.requiredDocuments.evidenceOfFiling}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Signed Beneficial Ownership Form (including an individual with significant responsiblity to control, manage, or direct a legal entity customer, including an executive officer or senior manger)</label>
                            <select onChange={(e) => this.updateForm(e, 'rd-signedBoForm')} className="form-control" value={this.props.case.requirement.documentation.requiredDocuments.signedBoForm}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'rd-correction-required')} type="checkbox" checked={this.props.case.requirement.documentation.requiredDocuments.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'rd-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.documentation.requiredDocuments.comments}></textarea>
                        </div>
                    </div>               
            
        );
    }
}
