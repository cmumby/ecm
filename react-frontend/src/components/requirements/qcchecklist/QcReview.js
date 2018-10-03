import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';


export default class QcReview extends Component {
    
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
            case "qcr-spellingAndLanguage":
                this.props.case.requirement.qcChecklist.qcReview.spellingAndLanguage = (event.target.value === "true")?true:false; 
                break;
            case "qcr-reasonableness":
                this.props.case.requirement.qcChecklist.qcReview.reasonableness = (event.target.value === "true")?true:false;
                break;
            case "qcr-documentation":
                this.props.case.requirement.qcChecklist.qcReview.documentation = (event.target.value === "true")?true:false;
                break;
            case "qcr-completeSarf":
                this.props.case.requirement.qcChecklist.qcReview.completeSarf = (event.target.value === "true")?true:false;
                break;
            case "qcr-completeFields":
                this.props.case.requirement.qcChecklist.qcReview.completeFields = (event.target.value === "true")?true:false;
                break;
           
            case "qcr-comments":
                this.props.case.requirement.qcChecklist.qcReview.comments = event.target.value;
                break;
            case "qcr-correction-required":
                this.props.case.requirement.qcChecklist.qcReview.raCorrectionRequired = event.target.checked;
                break;
            case "qcr-complete":
                this.props.case.requirement.qcChecklist.qcReview.complete = event.target.checked;
                break;
            default:
                return false;

        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "qcr-complete" || name === "qcr-isPep"){
            this.setState({[name]: event.target.checked});
        } else {
            this.setState({[name]: event.target.value});
        }
        
    }

    addReport(event){
        event.preventDefault();
        let newInvestagationId = {
            investagationId: ""
        };
        this.props.case.requirement.qcChecklist.qcReview.investagationIds.push(newInvestagationId);
        this.setState(this.state);
    }
    removeReport(event, key){ 
        event.preventDefault();
        this.props.case.requirement.qcChecklist.qcReview.investagationIds.splice(key,1);
        this.setState(this.state);
    }
  

    render() {  
        var componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.qcChecklist.qcReview.complete){
            componentClass += " complete";
        }
        
        return (

                   
                    <div className={"qc-checklist " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'qcr-complete')} checked={this.props.case.requirement.qcChecklist.qcReview.complete ? 'checked':''} /> Screening (Customer)
                        </label>
                        
                        <div className="form-group">
                            <label>Spelling and Language</label>
                            <select onChange={(e) => this.updateForm(e, 'qcr-spellingAndLanguage')} className="form-control" value={this.props.case.requirement.qcChecklist.qcReview.spellingAndLanguage}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        

                        <div className="form-group">
                            <label>Reasonableness of Reponses</label>
                            <select onChange={(e) => this.updateForm(e, 'qcr-reasonableness')} className="form-control" value={this.props.case.requirement.qcChecklist.qcReview.reasonableness}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                       

                         <div className="form-group">
                            <label>Supporting Documentation</label>
                            <select onChange={(e) => this.updateForm(e, 'qcr-negativeNewsScreening')} className="form-control" value={this.props.case.requirement.qcChecklist.qcReview.negativeNewsScreening}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>

                       

                        <div className="form-group">
                            <label>If required, was a SARF from completed for the customer? </label>
                            <select onChange={(e) => this.updateForm(e, 'qcr-completeSarf')} className="form-control" value={this.props.case.requirement.qcChecklist.qcReview.completeSarf}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>

                         <div className="form-group">
                            <label>Are the designated fields accurate and/or complete (as applicable)?</label>
                            <select onChange={(e) => this.updateForm(e, 'qcr-completeFields')} className="form-control" value={this.props.case.requirement.qcChecklist.qcReview.completeFields}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        
                        
                        <div className="form-group">
                            <label>QC Additional Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'qcr-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.qcChecklist.qcReview.comments}></textarea>
                        </div>
                    </div>               
            
        );
    }
}
