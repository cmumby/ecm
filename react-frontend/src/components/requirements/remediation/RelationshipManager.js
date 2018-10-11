import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';


export default class RelationshipManager extends Component {
    
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
            case "rm-comments":
                this.props.case.requirement.remediation.relationshipManager.comments = event.target.value;
                break;
            case "rm-correction-required":
                this.props.case.requirement.remediation.relationshipManager.raCorrectionRequired = event.target.checked;
                break;
            case "rm-complete":
                this.props.case.requirement.remediation.relationshipManager.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "rm-correction-required" || "rm-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
    }
  

    render() {  
        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.remediation.relationshipManager.complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"remediation " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'rm-complete')} checked={this.props.case.requirement.remediation.relationshipManager.complete ? 'checked':''} /> Relationship Manager
                        </label>
                        <div className="form-group">
                            <p>Relationship Manager: {this.props.case.requirement.remediation.relationshipManager.rm} </p>
                            <p>Office Manager: {this.props.case.requirement.remediation.relationshipManager.om} </p>
                        </div>
                        
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'rm-correction-required')} type="checkbox" checked={this.props.case.requirement.remediation.relationshipManager.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'rm-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.remediation.relationshipManager.comments}></textarea>
                        </div>
                    </div>               
        );
    }
}