import React, { Component } from 'react';
import { connect } from "react-redux";
import { getSectionStatuses } from '../../../util/getSectionStatuses';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import EntityType from '../../../util/EntityType';
import Select from 'react-select';
import sectionCompleteStatus from '../../../util/sectionCompleteStatus';


 class NatureOfBusiness extends Component {
    
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
            case "nc-naics":
                this.props.case.requirement.proxyRR.natureOfBusiness.naics = event.target.value;
                break;
            case "nc-filter":
                this.props.case.requirement.proxyRR.natureOfBusiness.naics = event.value;
                break;
            case "nc-comments":
                this.props.case.requirement.proxyRR.natureOfBusiness.comments = event.target.value;
                break;
            case "nc-correction-required":
                this.props.case.requirement.proxyRR.natureOfBusiness.raCorrectionRequired = event.target.checked;
                break;
            case "nc-complete":
                this.props.case.requirement.proxyRR.natureOfBusiness.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    getNaicsTitle(naics){
        let defaultNaicsTitle = "Type the proper code or search from the dropdown for the correct NAICS...";
        for(let nc in this.codelist){
            if(this.codelist[nc].value === naics){
                this.codelist[nc].selected = true;
                return this.codelist[nc].label;
            }
        }
        return defaultNaicsTitle;
    }

    updateForm = (event, name) => {
        const {ecmId, requirement} = this.props.case;
        this.handleFormDataRouting(event, name);
        //leaving this in for a select multple example
        if(name === "nc-naics"){
            let options = event.target.options;
            let value = [];
            for (let i = 0, l = options.length; i < l; i++) {
              if (options[i].selected) {
                value.push(options[i].value);
              }
            }
           this.setState({[name]: value}); 
        } else if("nc-filter"){
            this.setState({"naicsValue": event});
        } else{
            this.setState({[name]: event.target.value});
        }

        if(name === "nc-complete"){
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
            naics, 
            raCorrectionRequired, 
            comments
        } = this.props.case.requirement.proxyRR.natureOfBusiness;

        const { codeList } = this.state;

        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(complete){
            componentClass += " complete";
        }
        return (
                    <div className={"proxyrr " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e, 'nc-complete')} checked={complete ? 'checked':''} />  Nature of Business
                        </label>
                        <div className="form-group">
                            <label htmlFor="naics-filter">Nature of the Customer's Business / NAICS Code</label>
                            <Select className="requirement-filter" name="naicsFilter" onChange={(e) => this.updateForm(e, 'nc-filter')} options={codeList}  value={{label: this.getNaicsTitle(naics)} } />
                            
                        </div>
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'nc-correction-required')} type="checkbox" checked={raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'nc-comments')} className="form-control" rows="3" placeholder="" value={comments}></textarea>
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
)(NatureOfBusiness);