import React, { Component } from 'react';
import { connect } from "react-redux";
import { getSectionStatuses } from '../../../util/getSectionStatuses';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import sectionCompleteStatus from '../../../util/sectionCompleteStatus';


class ScreeningCustomer extends Component {
    
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
            case "sc-pepScreening":
                this.props.case.requirement.screening.screeningCustomer.pepScreening = (event.target.value === "true")?true:false; 
                break;
            case "sc-pepComments":
                this.props.case.requirement.screening.screeningCustomer.pepComments = event.target.value;
                break;
            case "sc-bsaHotlistScreening":
                this.props.case.requirement.screening.screeningCustomer.bsaHotlistScreening = (event.target.value === "true")?true:false;
                break;
            case "sc-bsaHotlistComments":
                this.props.case.requirement.screening.screeningCustomer.bsaHotlistComments = event.target.value;
                break;
            case "sc-negativeNewsScreening":
                this.props.case.requirement.screening.screeningCustomer.negativeNewsScreening = (event.target.value === "true")?true:false;
                break;
            case "sc-negativeNewsComments":
                this.props.case.requirement.screening.screeningCustomer.negativeNewsComments = event.target.value;
                break;
            case "sc-comments":
                this.props.case.requirement.screening.screeningCustomer.comments = event.target.value;
                break;
            case "sc-correction-required":
                this.props.case.requirement.screening.screeningCustomer.raCorrectionRequired = event.target.checked;
                break;
            case "sc-complete":
                this.props.case.requirement.screening.screeningCustomer.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        const {ecmId, requirement} = this.props.case;
        this.handleFormDataRouting(event, name);
        if(name === "sc-complete" || name === "sc-isPep"){
            this.setState({[name]: event.target.checked});
        } else {
            this.setState({[name]: event.target.value});
        }

        if(name === "sc-complete"){
            const isComplete = sectionCompleteStatus(ecmId, requirement.screening);
            let newStatus = getSectionStatuses(requirement);
            newStatus.screening = isComplete;
            this.props.onSectionStatusFill(newStatus);
        }

        this.updateData(this.props.case);
    }

    addReport(event){
        event.preventDefault();
        let newInvestagationId = {
            investagationId: ""
        };
        this.props.case.requirement.screening.screeningCustomer.investagationIds.push(newInvestagationId);
        this.setState(this.state);
    }

    removeReport(event, key){ 
        event.preventDefault();
        this.props.case.requirement.screening.screeningCustomer.investagationIds.splice(key,1);
        this.setState(this.state);
    }
  
    render() {  
        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.screening.screeningCustomer.complete){
            componentClass += " complete";
        }
        
        return ( 
                    <div className={"screening " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'sc-complete')} checked={this.props.case.requirement.screening.screeningCustomer.complete ? 'checked':''} /> Screening (Customer)
                        </label>
                        
                        <div className="form-group">
                            <label>Are there any resluts from OFAC/PEP screening?</label>
                            <select onChange={(e) => this.updateForm(e, 'sc-pepScreening')} className="form-control" value={this.props.case.requirement.screening.screeningCustomer.pepScreening}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Please explain all the true hits and false positives</label>
                            <textarea onChange={(e) => this.updateForm(e, 'sc-pepComments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.screening.screeningCustomer.pepComments}></textarea>
                        </div>

                        <div className="form-group">
                            <label>Are there any resluts from BSA Hotlist screening?</label>
                            <select onChange={(e) => this.updateForm(e, 'sc-bsaHotlistScreening')} className="form-control" value={this.props.case.requirement.screening.screeningCustomer.bsaHotlistScreening}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Please explain all the true hits and false positives</label>
                            <textarea onChange={(e) => this.updateForm(e, 'sc-bsaHotlistComments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.screening.screeningCustomer.bsaHotlistComments}></textarea>
                        </div>

                         <div className="form-group">
                            <label>Are there any resluts from Negative News screening?</label>
                            <select onChange={(e) => this.updateForm(e, 'sc-negativeNewsScreening')} className="form-control" value={this.props.case.requirement.screening.screeningCustomer.negativeNewsScreening}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Please explain all the true hits and false positives</label>
                            <textarea onChange={(e) => this.updateForm(e, 'sc-negativeNewsComments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.screening.screeningCustomer.negativeNewsComments}></textarea>
                        </div>
                        
                        
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'sc-correction-required')} type="checkbox" checked={this.props.case.requirement.screening.screeningCustomer.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'sc-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.screening.screeningCustomer.comments}></textarea>
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
)(ScreeningCustomer);