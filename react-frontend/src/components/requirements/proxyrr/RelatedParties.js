import React, { Component } from 'react';
import { connect } from "react-redux";
import { getSectionStatuses } from '../../../util/getSectionStatuses';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import EntityType from '../../../util/EntityType';
import sectionCompleteStatus from '../../../util/sectionCompleteStatus';


class RelatedParties extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.entitTypes = new EntityType();
        this.state = this.caseStructure.getStructure();
        this.entites = this.entitTypes.getEntities();
    }

    fillData() { 
        let thisRef = this;
        this.caseData = this.props.case;   
        this.caseService.naics((data)=>{
            thisRef.naicsCodes = data;
            thisRef.codelist = [];
            thisRef.setState({ naics: data });
            for(let d of data){
                let nacsDropdownTitle =  d.code  + " - " + d.title
                thisRef.codelist[d.code] = { label: nacsDropdownTitle, value: d.code };
            }
            thisRef.setState({ codeList: thisRef.codelist });
           
        })
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
            case "rp-parties":
                this.props.case.requirement.proxyRR.relatedParties.anyForeignParties = (event.target.value === "true")?true:false; 
                break;
            case "rp-comments":
                this.props.case.requirement.proxyRR.relatedParties.comments = event.target.value;
                break;
            case "rp-correction-required":
                this.props.case.requirement.proxyRR.relatedParties.raCorrectionRequired = event.target.checked;
                break;
            case "rp-complete":
                this.props.case.requirement.proxyRR.relatedParties.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        const {ecmId, requirement} = this.props.case;
        this.handleFormDataRouting(event, name);
        //leaving this in for a select multple example
        this.setState({[name]: event.target.value});

        if(name === "rp-complete"){
            const isComplete = sectionCompleteStatus(ecmId, requirement.proxyRR);
            let newStatus = getSectionStatuses(requirement);
            newStatus.proxyRR = isComplete;
            this.props.onSectionStatusFill(newStatus);
        }

        this.updateData(this.props.case);
        
    }

    tabRow(){
        if(this.state.naics instanceof Array){
  
          return this.state.naics.map(function(object, i){
              return  <option id={'naics-' + object.code} key={i} value={[object.code]} >{object.code} - {object.title}</option>;
          })
        }
      }

    render() {  
        const { 
            complete,
            anyForeignParties,
            raCorrectionRequired,
            comments
        } = this.props.case.requirement.proxyRR.relatedParties;

        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(complete){
            componentClass += " complete";
        }
        return (
                    <div className={"proxyrr " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e, 'rp-complete')} checked={complete ? 'checked':''} />  Related Parties
                        </label>
                        <div className="form-group">
                            <label htmlFor="customerState">Are any of the entity's princapals, beneficial oweners, or gurantors permanent residents of a different country then whe the entity's products/service accunts are booked?</label>
                            <select onChange={(e) => this.updateForm(e, 'rp-parties')} className="form-control" defaultValue={false} value={anyForeignParties}>
                                <option value={true} >Yes</option>
                                <option value={false} >No</option>
                            </select>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'rp-correction-required')} type="checkbox" checked={raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'rp-comments')} className="form-control" rows="3" placeholder="" value={comments}></textarea>
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
)(RelatedParties);