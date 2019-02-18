import React, { Component } from 'react';
import { connect } from "react-redux";
import { getSectionStatuses } from '../../../util/getSectionStatuses';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import sectionCompleteStatus from '../../../util/sectionCompleteStatus';


class AccountRelationship extends Component {
    
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
            case "ar-purpose":
                this.props.case.requirement.remediation.accountRelationship.accountPurpose = event.target.value;
                break;
            case "ar-relationship-type":
                this.props.case.requirement.remediation.accountRelationship.accountType = event.target.value;
                break;
           
            case "ar-comments":
                this.props.case.requirement.remediation.accountRelationship.comments = event.target.value;
                break;
            case "ar-correction-required":
                this.props.case.requirement.remediation.accountRelationship.raCorrectionRequired = event.target.checked;
                break;
            case "ar-complete":
                this.props.case.requirement.remediation.accountRelationship.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        const {ecmId, requirement} = this.props.case;
        this.handleFormDataRouting(event, name);
        if(name === "ar-correction-required" || "ar-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }

        if(name === "ar-complete"){
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
            accountPurpose,
            accountType,
            raCorrectionRequired, 
            comments
        } = this.props.case.requirement.remediation.accountRelationship;
 
        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"remediation " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'ar-complete')} checked={complete ? 'checked':''} /> Account Relationship
                        </label>
                        <div className="form-group">
                            <label htmlFor="accountPurpose">Nature and Purpose of the Account</label>
                            <select onChange={(e) => this.updateForm(e, 'ar-purpose')} id="accountPurpose" className="form-control" value={accountPurpose}>
                                <option value="Financing (Lending)">Financing (Lending)</option>
                                <option value="Treasury" >Treasury</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="accountRelationshp">Account Relationship Type</label>
                            <select onChange={(e) => this.updateForm(e, 'ar-relationship-type')} id="accountRelationshp" className="form-control" value={accountType}>
                                <option value="Borrower/Account Holder">Borrower/Account Holder</option>
                                <option value="Other" >Other</option>
                            </select>
                        </div>
                        
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'ar-correction-required')} type="checkbox" checked={raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'ar-comments')} className="form-control" rows="3" placeholder="" value={comments}></textarea>
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
)(AccountRelationship);