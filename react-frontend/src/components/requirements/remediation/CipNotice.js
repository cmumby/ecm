import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';


export default class CipNotice extends Component {
    
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

    componentDidUpdate(prevProps, prevState, snapshot){ 
        let updatedCase = prevState.case;
        this.updateData(this.props.case);
       if (updatedCase.requirement.hasOwnProperty('cip')){
       } else {
         return false;
       }
    }

    //Routes the changed information to the right poperty
    handleFormDataRouting(event, name){
        switch (name) { 
            case "cn-notice":
                this.props.case.requirement.remediation.cipNotice.noticeProvided = event.target.value;
                break;
            case "cn-comments":
                this.props.case.requirement.remediation.cipNotice.comments = event.target.value;
                break;
            case "cn-correction-required":
                this.props.case.requirement.remediation.cipNotice.raCorrectionRequired = event.target.checked;
                break;
            case "cn-complete":
                this.props.case.requirement.remediation.cipNotice.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "cn-correction-required" || "cn-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        } 
    }
  
    render() {
        const{
            complete,
            noticeProvided,
            raCorrectionRequired, 
            comments
        } = this.props.case.requirement.remediation.cipNotice;

        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"remediation " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'cn-complete')} checked={complete ? 'checked':''} /> CIP Notice
                        </label>
                        <div className="form-group">
                            <label htmlFor="cipNotice">CIP Notice Provided ?</label>
                            <select onChange={(e) => this.updateForm(e, 'cn-notice')} id="cipNotice" className="form-control" value={noticeProvided}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
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
