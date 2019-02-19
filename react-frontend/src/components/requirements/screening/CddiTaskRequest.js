import React, { Component } from 'react';
import { connect } from "react-redux";
import { getSectionStatuses } from '../../../util/getSectionStatuses';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import sectionCompleteStatus from '../../../util/sectionCompleteStatus';


class CddiTaskRequest extends Component {
    
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
            case "cddi-taskRequest":
                this.props.case.requirement.screening.cddiTaskRequest.taskRequest = event.target.value;
                break;
            case "cddi-comments":
                this.props.case.requirement.screening.cddiTaskRequest.comments = event.target.value;
                break;
            case "cddi-correction-required":
                this.props.case.requirement.screening.cddiTaskRequest.raCorrectionRequired = event.target.checked;
                break;
            case "cddi-complete":
                this.props.case.requirement.screening.cddiTaskRequest.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        const {ecmId, requirement} = this.props.case;
        this.handleFormDataRouting(event, name);
        if(name === "cddi-correction-required" || "cddi-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
        
        if(name === "cddi-complete"){
            const isComplete = sectionCompleteStatus(ecmId, requirement.screening);
            let newStatus = getSectionStatuses(requirement);
            newStatus.screening = isComplete;
            this.props.onSectionStatusFill(newStatus);
        }

        this.updateData(this.props.case);
    }
  
    render() {
        const{
            complete,
            taskRequest,
        } = this.props.case.requirement.screening.cddiTaskRequest;

        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.screening.cddiTaskRequest.complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"screening " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'cddi-complete')} checked={complete ? 'checked':''} /> CDDI Task Request
                        </label>
                        
                        <div className="form-group">
                            <label>CDDI Task Request (Customer)</label>
                            <select onChange={(e) => this.updateForm(e, 'cddi-taskRequest')}  className="form-control" value={taskRequest}>
                                <option value="None">None</option>
                                <option value="Screening" >Screening</option>
                                <option value="Verification" >Verification</option>
                                <option value="Screening & Verification" >Screening & Verification</option>
                            </select>  
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
)(CddiTaskRequest);