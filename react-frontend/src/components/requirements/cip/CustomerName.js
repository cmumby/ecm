import React, { Component } from 'react';
import { connect } from "react-redux";
import { getSectionStatuses } from '../../../util/getSectionStatuses';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import Location from '../../../util/Location';
import sectionCompleteStatus from '../../../util/sectionCompleteStatus';


class CustomerName extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.locations = new Location();
        this.state = this.caseStructure.getStructure();
        this.usStates = this.locations.getStates();
        this.countries = this.locations.getCountries();
    }

    fillData() { 
      //  let thisRef = this;
        this.caseData = this.props.case;
        
        
    }
    updateData(data) {
        //let thisRef = this; 
        this.caseService.update(data, this.props.case.ecmId, (data) => {});
    }

    componentWillMount() {
        this.fillData();
    }

    //Routes the changed information to the right poperty
    handleFormDataRouting(event, name){
        switch (name) { 
            case "cn-legalName":
                this.props.case.requirement.cip.customerName.legalName = event.target.value;
                break;
            case "cn-dbaName":
                this.props.case.requirement.cip.customerName.dbaName = event.target.value;
                break;
            case "cn-comments":
                this.props.case.requirement.cip.customerName.comments = event.target.value;
                break;
            case "cn-correction-required":
                this.props.case.requirement.cip.customerName.raCorrectionRequired = event.target.checked;
                break;
            case "cn-complete":
                this.props.case.requirement.cip.customerName.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        const {ecmId, requirement} = this.props.case; 
        this.handleFormDataRouting(event, name);
        if(name === "ra-correction-required" || "ra-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
        
        if(name === "cn-complete"){
            const isComplete = sectionCompleteStatus(ecmId, requirement.cip);
            let newStatus = getSectionStatuses(requirement);
            newStatus.cip = isComplete;
            this.props.onSectionStatusFill(newStatus);
        }

        this.updateData(this.props.case);
    }
  

    render() {  
        const {
            complete,
            legalName,
            dbaName,
            raCorrectionRequired,
            comments

        } = this.props.case.requirement.cip.customerName;

        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(complete){
            componentClass += " complete";
        }

        
        
        return (
                    <div className={"cip " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'cn-complete')} checked={complete ? 'checked':''} /> Customer Name (Entity)
                        </label>
                        <div className="form-group">
                            <label htmlFor="Legal-Name">Customer Legal Name</label>
                            <input name="Legal-Name" onChange={(e) => this.updateForm(e,'cn-legalName')} type="text" className="form-control"  placeholder="Exactly As it is Written on the Supporting Documentaion" value={legalName} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dba-name">DBA Name</label>
                            <input name="dba-name" onChange={(e) => this.updateForm(e, 'cn-dbaName')} type="text" className="form-control"  placeholder="Doing Business As Name from offical supporting documentaion"  value={dbaName}  />
                        </div>
                       
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'cn-correction-required')} type="checkbox" checked={raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'cn-comments')} className="form-control" rows="3" placeholder="" value={comments}></textarea>
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

const mapDispachToProps = dispatch => { 
    return {
        onSectionStatusFill: (statuses) => dispatch({type:"STATUS_UPDATE", value: statuses})
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(CustomerName);