import React, { Component } from 'react';
import { connect } from "react-redux";
import { getSectionStatuses } from '../../../util/getSectionStatuses';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import sectionCompleteStatus from '../../../util/sectionCompleteStatus';


class SourceOfFunds extends Component {
    
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
            case "sf-description":
                this.props.case.requirement.remediation.sourceOfFunds.wealthSource = event.target.value;
                break;
            case "sf-comments":
                this.props.case.requirement.remediation.sourceOfFunds.comments = event.target.value;
                break;
            case "sf-correction-required":
                this.props.case.requirement.remediation.sourceOfFunds.raCorrectionRequired = event.target.checked;
                break;
            case "sf-complete":
                this.props.case.requirement.remediation.sourceOfFunds.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        const {ecmId, requirement} = this.props.case;
        this.handleFormDataRouting(event, name);
        if(name === "sf-correction-required" || "sf-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }

        if(name === "sf-complete"){
            const isComplete = sectionCompleteStatus(ecmId, requirement.remediation);
            let newStatus = getSectionStatuses(requirement);
            newStatus.remediation = isComplete;
            this.props.onSectionStatusFill(newStatus);
        }

        this.updateData(this.props.case);
        
    }
  
    render() {
        const{
            complete,
            wealthSource,
            raCorrectionRequired, 
            comments
        } = this.props.case.requirement.remediation.sourceOfFunds;

        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"remediation " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'sf-complete')} checked={complete ? 'checked':''} /> Source of Funds
                        </label>
                        <div className="form-group">
                            <label>Source of Funds of the Initial Deposit</label>
                            <textarea onChange={(e) => this.updateForm(e, 'sf-description')} className="form-control" rows="3" placeholder="" value={wealthSource}></textarea>
                        </div>
            
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'sf-correction-required')} type="checkbox" checked={raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'sf-comments')} className="form-control" rows="3" placeholder="" value={comments}></textarea>
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
)(SourceOfFunds);
