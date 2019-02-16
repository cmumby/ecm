import React, { Component } from 'react';
import { connect } from "react-redux";
import { getSectionStatuses } from '../../../util/getSectionStatuses';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import EntityType from '../../../util/EntityType';
import sectionCompleteStatus from '../../../util/sectionCompleteStatus';


class LegalEntity extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.entitTypes = new EntityType();
        this.state = this.caseStructure.getStructure();
        this.entites = this.entitTypes.getEntities();
    }

    fillData() { 
        this.caseData = this.props.case;   
    }

    updateData(data) {
        this.caseService.update(data, this.props.case.ecmId, (data) => {
        });
    }

    componentWillMount() {
        this.fillData();
    }
    
    //Routes the changed information to the right poperty
    handleFormDataRouting(event, name){
        switch (name) { 
            case "le-entity":
                this.props.case.requirement.proxyRR.legalEntity.entityType = event.target.value;
                break;
            
            case "le-comments":
                this.props.case.requirement.proxyRR.legalEntity.comments = event.target.value;
                break;
            case "le-correction-required":
                this.props.case.requirement.proxyRR.legalEntity.raCorrectionRequired = event.target.checked;
                break;
            case "le-complete":
                this.props.case.requirement.proxyRR.legalEntity.complete = event.target.checked;
                break;
            default:
                return false;

        }
    }

    updateForm = (event, name) => {
        const {ecmId, requirement} = this.props.case; 
        this.handleFormDataRouting(event, name);
        if(name === "le-correction-required" || name === "le-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }

        if(name === "le-complete"){
            const isComplete = sectionCompleteStatus(ecmId, requirement.proxyRR);
            let newStatus = getSectionStatuses(requirement);
            newStatus.proxyRR = isComplete;
            this.props.onSectionStatusFill(newStatus);
        }

        this.updateData(this.props.case);
        
    }
  

    render() {  
        const { 
            complete, 
            entityType, 
            raCorrectionRequired, 
            comments 
        } = this.props.case.requirement.proxyRR.legalEntity;

        let entitySelections = this.entites;
        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(complete){
            componentClass += " complete";
        }
        return (

                    <div className={"proxyrr " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e, 'le-complete')} checked={complete ? 'checked':''} />  Legal Entity Type
                        </label>
                        <div className="form-group">
                            <label>What is the Legal Entity Type</label>
                            <select onChange={(e) => this.updateForm(e, 'le-entity')} className="form-control" value={entityType}>
                                <option value="0">Select the proper entity for this customer</option>
                            {entitySelections.map((state,index) =>
                                   
                                    <option key={index} value={state} >{state}</option>
                            )}
                            </select>
                        </div>
                       
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'le-correction-required')} type="checkbox" checked={raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'le-comments')} className="form-control" rows="3" placeholder="" value={comments}></textarea>
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
)(LegalEntity);
