import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import EntityType from '../../../util/EntityType';


export default class CustomerStructure extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.entitTypes = new EntityType();
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
            case "cs-public":
                this.props.case.requirement.remediation.customerStructure.isPubliclyTraded = event.target.value;
                break;
            case "cs-comments":
                this.props.case.requirement.remediation.customerStructure.comments = event.target.value;
                break;
            case "cs-correction-required":
                this.props.case.requirement.remediation.customerStructure.raCorrectionRequired = event.target.checked;
                break;
            case "cs-complete":
                this.props.case.requirement.remediation.customerStructure.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "cs-correction-required" || name === "cs-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        } 
    }
  
    render() {  
        const{
            complete,
            isPubliclyTraded,
            raCorrectionRequired, 
            comments
        } = this.props.case.requirement.remediation.customerStructure;
        
        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(complete){
            componentClass += " complete";
        }

        return (
                    <div className={"remediation " + componentClass}>
                        <label>
                            <input onChange={(e) => this.updateForm(e, 'cs-complete')} type="checkbox" checked={complete ? 'checked':''} />  Customer Structure
                        </label>
                        <div className="form-group">
                            <label>Is the customer a publicly traded company?</label>
                            <select onChange={(e) => this.updateForm(e, 'cs-public')} className="form-control" value={isPubliclyTraded}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                       
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'cs-correction-required')} type="checkbox" checked={raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'cs-comments')} className="form-control" rows="3" placeholder="" value={comments}></textarea>
                        </div>
                    </div>               
        );
    }
}