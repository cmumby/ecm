import React, { Component } from 'react';
import { connect } from "react-redux";
import { getSectionStatuses } from '../../../util/getSectionStatuses';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import sectionCompleteStatus from '../../../util/sectionCompleteStatus';


class QcReview extends Component {
    
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
            case "qcr-complete":
                this.props.case.requirement.qcChecklist.qcReview.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        const {ecmId, requirement} = this.props.case;
        this.handleFormDataRouting(event, name);
        if(name === "qcr-complete" || name === "qcr-isPep"){
            this.setState({[name]: event.target.checked});
        } else {
            this.setState({[name]: event.target.value});
        }

        if(name === "qcr-complete"){
            const isComplete = sectionCompleteStatus(ecmId, requirement.qcChecklist);
            let newStatus = getSectionStatuses(requirement);
            newStatus.qcChecklist = isComplete;
            this.props.onSectionStatusFill(newStatus);
        }

        this.updateData(this.props.case);
    }
  
    render() {
        const {
            complete,
            spellingAndLanguage,
            reasonableness,
            documentation,
            completeSarf,
            completeFields,
            comments
        } = this.props.case.requirement.qcChecklist.qcReview;

        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"qc-checklist " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'qcr-complete')} checked={complete ? 'checked':''} /> QC Review
                        </label>
                        
                        <div className="form-group">
                            <label>Spelling and Language</label>
                            <select onChange={(e) => this.updateForm(e, 'qcr-spellingAndLanguage')} className="form-control" value={spellingAndLanguage}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label>Reasonableness of Reponses</label>
                            <select onChange={(e) => this.updateForm(e, 'qcr-reasonableness')} className="form-control" value={reasonableness}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                       
                         <div className="form-group">
                            <label>Supporting Documentation</label>
                            <select onChange={(e) => this.updateForm(e, 'qcr-documentation')} className="form-control" value={documentation}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>If required, was a SARF from completed for the customer? </label>
                            <select onChange={(e) => this.updateForm(e, 'qcr-completeSarf')} className="form-control" value={completeSarf}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>

                         <div className="form-group">
                            <label>Are the designated fields accurate and/or complete (as applicable)?</label>
                            <select onChange={(e) => this.updateForm(e, 'qcr-completeFields')} className="form-control" value={completeFields}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label>QC Additional Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'qcr-comments')} className="form-control" rows="3" placeholder="" value={comments}></textarea>
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
)(QcReview);