import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';


export default class ProhibitedCustomers extends Component {
    
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
            case "pc-md":
                this.props.case.requirement.remediation.prohibitedCustomers.isMarijunaDistributor = event.target.value;
                break;
            case "pc-customerHasWarrents":
                this.props.case.requirement.remediation.prohibitedCustomers.customerHasWarrents = event.target.value;
                break;
            case "pc-isNonUsMexicanCdc":
                this.props.case.requirement.remediation.prohibitedCustomers.isNonUsMexicanCdc = event.target.value;
                break;
            case "pc-isUsOwnsMexicanCdc":
                this.props.case.requirement.remediation.prohibitedCustomers.isUsOwnsMexicanCdc = event.target.value;
                break;
            case "pc-isShellBank":
                this.props.case.requirement.remediation.prohibitedCustomers.isShellBank = event.target.value;
                break;
            case "pc-isVirtualCurrencyExchange":
                this.props.case.requirement.remediation.prohibitedCustomers.isVirtualCurrencyExchange = event.target.value;
                break;
            case "pc-isThroughAccount":
                this.props.case.requirement.remediation.prohibitedCustomers.isThroughAccount = event.target.value;
                break;
            case "pc-isThirdPartyCheckCasher":
                this.props.case.requirement.remediation.prohibitedCustomers.isThirdPartyCheckCasher = event.target.value;
                break;
            case "pc-isPuipidTransactor":
                this.props.case.requirement.remediation.prohibitedCustomers.isPuipidTransactor = event.target.value;
                break;
            case "pc-isInternationalCurrencyShipper":
                this.props.case.requirement.remediation.prohibitedCustomers.isInternationalCurrencyShipper = event.target.value;
                break;
            case "pc-comments":
                this.props.case.requirement.remediation.prohibitedCustomers.comments = event.target.value;
                break;
            case "pc-correction-required":
                this.props.case.requirement.remediation.prohibitedCustomers.raCorrectionRequired = event.target.checked;
                break;
            case "pc-complete":
                this.props.case.requirement.remediation.prohibitedCustomers.complete = event.target.checked;
                break;
            default:
                return false;

        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "pc-correction-required" || "pc-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
        
    }
  

    render() {  
        var componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.remediation.prohibitedCustomers.complete){
            componentClass += " complete";
        }
        
        return (

                   
                    <div className={"remediation " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'pc-complete')} checked={this.props.case.requirement.remediation.prohibitedCustomers.complete ? 'checked':''} /> Prohibited Customers
                        </label>
                        
                        <div className="form-group">
                            <label htmlFor="pcMd">Does the customer or any of it's related parties engage in Marijuna dispenseries including producers or distributors (Medical and Recreational)?</label>
                            <select onChange={(e) => this.updateForm(e, 'pc-md')} id="pcMd" className="form-control" value={this.props.case.requirement.remediation.prohibitedCustomers.isMarijunaDistributor}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerHasWarrents">Does the customer or any of it's related parties include ownership currently evidenced by, or with the ability to issue ownership shares in bearer form or bearer warrents?</label>
                            <select onChange={(e) => this.updateForm(e, 'pc-customerHasWarrents')} id="customerHasWarrents" className="form-control" value={this.props.case.requirement.remediation.prohibitedCustomers.customerHasWarrents}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="isNonUsMexicanCdc">Is the customer or any of it's related parties a non US MSB or Mexican CDC?</label>
                            <select onChange={(e) => this.updateForm(e, 'pc-isNonUsMexicanCdc')} id="isNonUsMexicanCdc" className="form-control" value={this.props.case.requirement.remediation.prohibitedCustomers.isNonUsMexicanCdc}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="isUsOwnsMexicanCdc">Is the customer or any of it's related parties a US MSB that includes 25% or more ownership by Mexican CDC's</label>
                            <select onChange={(e) => this.updateForm(e, 'pc-isUsOwnsMexicanCdc')} id="isUsOwnsMexicanCdc" className="form-control" value={this.props.case.requirement.remediation.prohibitedCustomers.isUsOwnsMexicanCdc}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="isShellBank">Is the customer or any of it's related parties a non US shell bank?</label>
                            <select onChange={(e) => this.updateForm(e, 'pc-isShellBank')} id="isShellBank" className="form-control" value={this.props.case.requirement.remediation.prohibitedCustomers.isShellBank}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="isVirtualCurrencyExchange">Is the Customer or any of its related parties a Virtual Currency Exchanger?</label>
                            <select onChange={(e) => this.updateForm(e, 'pc-isVirtualCurrencyExchange')} id="isVirtualCurrencyExchange" className="form-control" value={this.props.case.requirement.remediation.prohibitedCustomers.isVirtualCurrencyExchange}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="isThroughAccount">Does the customer or any of its related parties intend to engange in payable through accounts with the bank?</label>
                            <select onChange={(e) => this.updateForm(e, 'pc-isThroughAccount')} id="isThroughAccount" className="form-control" value={this.props.case.requirement.remediation.prohibitedCustomers.isThroughAccount}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="isThirdPartyCheckCasher">Does the customer or any of its related parties intend to engange in third party cheack clearing with the bank?</label>
                            <select onChange={(e) => this.updateForm(e, 'pc-isThirdPartyCheckCasher')} id="isThirdPartyCheckCasher" className="form-control" value={this.props.case.requirement.remediation.prohibitedCustomers.isThirdPartyCheckCasher}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="isPuipidTransactor">Does the customer or any of its related parties intend to engange in Inbound Payable Upon Proper Identification (PUPID) Transactions?</label>
                            <select onChange={(e) => this.updateForm(e, 'pc-isPuipidTransactor')} id="isPuipidTransactor" className="form-control" value={this.props.case.requirement.remediation.prohibitedCustomers.isPuipidTransactor}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="isInternationalCurrencyShipper">International bulk shipments of currency (bulk cash services)</label>
                            <select onChange={(e) => this.updateForm(e, 'pc-isInternationalCurrencyShipper')} id="isInternationalCurrencyShipper" className="form-control" value={this.props.case.requirement.remediation.prohibitedCustomers.isInternationalCurrencyShipper}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        
                        
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'pc-correction-required')} type="checkbox" checked={this.props.case.requirement.remediation.prohibitedCustomers.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'pc-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.remediation.prohibitedCustomers.comments}></textarea>
                        </div>
                    </div>               
            
        );
    }
}
