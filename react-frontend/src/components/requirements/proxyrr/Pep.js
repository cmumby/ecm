import React, { Component } from 'react';
import { connect } from "react-redux";
import { getSectionStatuses } from '../../../util/getSectionStatuses';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import EntityType from '../../../util/EntityType';
import sectionCompleteStatus from '../../../util/sectionCompleteStatus';


class Pep extends Component {
    
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
            case "pe-pep":
                this.props.case.requirement.proxyRR.pep.isPep = event.target.value;
                break;
            case "pe-comments":
                this.props.case.requirement.proxyRR.pep.comments = event.target.value;
                break;
            case "pe-correction-required":
                this.props.case.requirement.proxyRR.pep.raCorrectionRequired = event.target.checked;
                break;
            case "pe-complete":
                this.props.case.requirement.proxyRR.pep.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        const {ecmId, requirement} = this.props.case;
        this.handleFormDataRouting(event, name);
        this.setState({[name]: event.target.value});
        if(name === "pe-complete"){
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
          });
        }
    }
  
    render() {  
        const {
            complete,
            isPep, 
            raCorrectionRequired, 
            comments
        }  = this.props.case.requirement.proxyRR.pep;

        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(complete){
            componentClass += " complete";
        }
        return (
                    <div className={"proxyrr " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e, 'pe-complete')} checked={complete ? 'checked':''} /> PEP
                        </label>
                        <div className="form-group">
                            <label htmlFor="customerState">Is the Customer Classified as a PEP?</label>
                            <select onChange={(e) => this.updateForm(e, 'pe-pep')} className="form-control" defaultValue={false} value={isPep}>
                                <option value={true} >Yes</option>
                                <option value={false} >No</option>
                            </select>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'pe-correction-required')} type="checkbox" checked={raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'pe-comments')} className="form-control" rows="3" placeholder="" value={comments}></textarea>
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
)(Pep);