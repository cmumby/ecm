import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';


export default class InternetGambling extends Component {
    
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
            case "ig-gambling":
                this.props.case.requirement.remediation.internetGambling.isInternetGambling = event.target.value;
                break;
            case "ig-comments":
                this.props.case.requirement.remediation.internetGambling.comments = event.target.value;
                break;
            case "ig-correction-required":
                this.props.case.requirement.remediation.internetGambling.raCorrectionRequired = event.target.checked;
                break;
            case "ig-complete":
                this.props.case.requirement.remediation.internetGambling.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "ig-correction-required" || "ig-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
        
    }
  

    render() {  
        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.remediation.internetGambling.complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"remediation " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'ig-complete')} checked={this.props.case.requirement.remediation.internetGambling.complete ? 'checked':''} /> Internet Gambling
                        </label>
                        <div className="form-group">
                            <label htmlFor="internetGambling">Is the entity an Internet Gambling Business?</label>
                            <select onChange={(e) => this.updateForm(e, 'ig-gambling')} id="internetGambling" className="form-control" value={this.props.case.requirement.remediation.internetGambling.isInternetGambling}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        
                        
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'ig-correction-required')} type="checkbox" checked={this.props.case.requirement.remediation.internetGambling.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'ig-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.remediation.internetGambling.comments}></textarea>
                        </div>
                    </div>               
        );
    }
}