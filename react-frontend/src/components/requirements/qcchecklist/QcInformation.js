import React, { Component } from 'react';
import { connect } from "react-redux";
import { getSectionStatuses } from '../../../util/getSectionStatuses';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import sectionCompleteStatus from '../../../util/sectionCompleteStatus';


class QcInformation extends Component {
    
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
            case "qci-qcName":
                this.props.case.requirement.qcChecklist.qcInformation.qcName = event.target.value;
                break;
            case "qci-dateReceived":
                this.props.case.requirement.qcChecklist.qcInformation.dateReceived = event.target.value;
                break;
            case "qci-firstReview":
                this.props.case.requirement.qcChecklist.qcInformation.firstReview = event.target.checked;
                break;
            case "qci-secondReview":
                this.props.case.requirement.qcChecklist.qcInformation.secondReview = event.target.checked;
                break;
            case "qci-complete":
                this.props.case.requirement.qcChecklist.qcInformation.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        const {ecmId, requirement} = this.props.case;
        this.handleFormDataRouting(event, name);
        if(name === "qci-correction-required" || "qci-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }

        if(name === "qci-complete"){
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
            qcName,
            dateReceived,
            firstReview,
            secondReview
        } = this.props.case.requirement.qcChecklist.qcInformation;

        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"qc-checklist " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'qci-complete')} checked={complete ? 'checked':''} /> QC Information
                        </label>
                        <div className="form-group">
                            <label htmlFor="Legal-Name">QC Name</label>
                            <input name="Legal-Name" onChange={(e) => this.updateForm(e,'qci-qcName')} type="text" className="form-control"  placeholder="Exactly As it is Written on the Supporting Documentaion" value={qcName} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dba-name">Date Received</label>
                            <input name="dba-name" onChange={(e) => this.updateForm(e, 'qci-dateReceived')} type="text" className="form-control"  placeholder="Doing Business As Name from offical supporting documentaion"  value={dateReceived}  />
                        </div>
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'qci-firstReview')} type="checkbox" checked={firstReview ?'checked':''} /> First Review
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'qci-secondReview')} type="checkbox" checked={secondReview ?'checked':''} /> Second Review
                            </label>
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
)(QcInformation);