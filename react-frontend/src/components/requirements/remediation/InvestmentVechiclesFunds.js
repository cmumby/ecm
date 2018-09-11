import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';


export default class InvestmentVechiclesFunds extends Component {
    
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
        this.caseService.update(data, this.props.case.ecmId, (data) => {
        })
    }

    componentWillMount() {
        this.fillData();
    }

    componentDidUpdate(prevProps, prevState, snapshot){ 
        var updatedCase = prevState.case;
        this.updateData(this.props.case);
       if (updatedCase.requirement.hasOwnProperty('cip')){
       } else {
         return false;
       }

    }

    //Routes the changed information to the right poperty
    handleFormDataRouting(event, name){
        switch (name) { 
            case "vf-advisor":
                this.props.case.requirement.remediation.investmentVechiclesFunds.isInvestment = event.target.value;
                break;
            case "vf-related-funds":
                this.props.case.requirement.remediation.investmentVechiclesFunds.relatedEntityFunds = event.target.value;
                break;
            case "vf-sec-ria":
                this.props.case.requirement.remediation.investmentVechiclesFunds.secRiaNumber = event.target.value;
                break;
            case "vf-comments":
                this.props.case.requirement.remediation.investmentVechiclesFunds.comments = event.target.value;
                break;
            case "vf-correction-required":
                this.props.case.requirement.remediation.investmentVechiclesFunds.raCorrectionRequired = event.target.checked;
                break;
            case "vf-complete":
                this.props.case.requirement.remediation.investmentVechiclesFunds.complete = event.target.checked;
                break;
            default:
                return false;

        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "vf-correction-required" || "vf-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
        
    }
  

    render() {  
        var componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.remediation.investmentVechiclesFunds.complete){
            componentClass += " complete";
        }
        
        return (

                   
                    <div className={"remediation " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'vf-complete')} checked={this.props.case.requirement.remediation.investmentVechiclesFunds.complete ? 'checked':''} /> Investment Vechicles / Funds
                        </label>
                        <div className="form-group">
                            <label htmlFor="investmentAdvisor">Is the customer an Investment Advisor/Manager?</label>
                            <select onChange={(e) => this.updateForm(e, 'vf-advisor')} id="investmentAdvisor" className="form-control" value={this.props.case.requirement.remediation.investmentVechiclesFunds.isInvestment}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerState">Does the Investment Advisor have any related entity funds?</label>
                            <select onChange={(e) => this.updateForm(e, 'vf-related-funds')} id="customerState" className="form-control" value={this.props.case.requirement.remediation.investmentVechiclesFunds.relatedEntityFunds}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <p>When remediating a fund, the Investment Manager / Advisor is deemed to be the customer. The funds are not the customers but the underlying accounts:</p>
                            <label htmlFor="secRiaNumber">SEC RIA Number</label>
                            <input name="secRiaNumber" onChange={(e) => this.updateForm(e,'vf-sec-ria')} type="text" className="form-control"   value={this.props.case.requirement.remediation.investmentVechiclesFunds.secRiaNumber} />
                        </div>
                        
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'vf-correction-required')} type="checkbox" checked={this.props.case.requirement.remediation.investmentVechiclesFunds.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'vf-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.remediation.investmentVechiclesFunds.comments}></textarea>
                        </div>
                    </div>               
            
        );
    }
}
