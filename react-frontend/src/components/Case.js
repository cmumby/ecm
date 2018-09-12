import React, { Component } from 'react';
import CaseService from './CaseService';
import CaseStructure from './structures/CaseStructure';
import Location from '../util/Location';
import RegisteredAddress from './requirements/proxyrr/RegisteredAddress';
import PhysicalAddress from './requirements/proxyrr/PhysicalAddress';
import LegalEntity from './requirements/proxyrr/LegalEntity';
import LegalFormation from './requirements/proxyrr/LegalFormation';
import NatureOfBusiness from './requirements/proxyrr/NatureOfBusiness';
import MarketServed from './requirements/proxyrr/MarketServed';
import RelatedParties from './requirements/proxyrr/RelatedParties';
import Pep from './requirements/proxyrr/Pep';
import ProductsAndServices from './requirements/proxyrr/ProductsAndServices';
import CustomerName from './requirements/cip/CustomerName';
import TaxOrGovernmentId from './requirements/cip/TaxOrGovernmentId';
import InvestmentVechiclesFunds from './requirements/remediation/InvestmentVechiclesFunds';
import CustomerDetails from './requirements/remediation/CustomerDetails';
import AccountRelationship from './requirements/remediation/AccountRelationship';
import LegalFormationRemediation from'./requirements/remediation/LegalFormationRemediation';

export default class Case extends Component {

    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.locations = new Location();
        this.state = this.caseStructure.getStructure();
        this.usStates = this.locations.getStates();
        this.countries = this.locations.getCountries();
     }

    componentWillMount() {
        this.fillData();
    }

   componentDidUpdate(prevProps, prevState, snapshot){
        var updatedCase = prevState.case;
        if (updatedCase.requirement.hasOwnProperty('cip')){
            this.updateData(updatedCase);
        } else {
            return false;
        }
    }
    

    fillData() { 
        var thisRef = this;
        this.caseService.get(this.props.match.params.ecmId, (data) => {
            this.caseData = data;
            thisRef.setState({ case: data });
        })
    }
    updateData(data) {
       // var thisRef = this;
        this.caseService.update(data, this.props.match.params.ecmId, (data) => {
           // this.caseData = data;
           // thisRef.setState({ case: data });
        })
    }
    

    //Routes the changed information to the right poperty
    handleFormDataRouting(event, name){
        switch (name) {
            case "ra-firsLine":
                alert('???');
                this.caseData.requirement.proxyRR.registeredAddress.firstLine = event.target.value;
                console.log("new??: " );
                break;
            case "ra-secondLine":
                this.caseData.requirement.proxyRR.registeredAddress.secondLine = event.target.value;
                break;
            case "ra-city":
                this.caseData.requirement.proxyRR.registeredAddress.city = event.target.value;
                break;
            case "ra-state":
                this.caseData.requirement.proxyRR.registeredAddress.state = event.target.value;
                break;
            case "ra-country":
                this.caseData.requirement.proxyRR.registeredAddress.country = event.target.value;
                break;
            case "ra-postalCode":
                this.caseData.requirement.proxyRR.registeredAddress.postalCode = event.target.value;
                break;
            default:
                return false;

        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        this.setState({[name]: event.target.value});
    }

    render() {
        
       // var usStates = this.usStates;
       // var countries = this.countries;

        return (
            <div id="form-container" className="box box-solid box-primary">
                <div className="box-header with-border">
                    <h3 className="box-title">Requirements for Case: {this.state.case.name}</h3>
                </div>
                <form name="reqForm">
                    <RegisteredAddress case={this.state.case} color="light" />
                    <PhysicalAddress case={this.state.case} color="dark"/>
                    <LegalEntity case={this.state.case} color="light"/>
                    <LegalFormation case={this.state.case} color="dark"/>
                    <NatureOfBusiness case={this.state.case} color="light"/> 
                    <MarketServed case={this.state.case} color="dark"/> 
                    <RelatedParties case={this.state.case} color="light"/>
                    <Pep case={this.state.case} color="dark"/>
                    <ProductsAndServices case={this.state.case} color="light"/>
                    <CustomerName case={this.state.case} color="light"/>
                    <TaxOrGovernmentId case={this.state.case} color="dark"/>
                    <InvestmentVechiclesFunds case={this.state.case} color="light"/>
                    <CustomerDetails case={this.state.case} color="dark"/>
                    <AccountRelationship case={this.state.case} color="light"/>
                    <LegalFormationRemediation case={this.state.case} color="dark"/>
                    
                   { /* <div className="box-body">
                        <label>
                            <input type="checkbox" checked={this.state.case.requirement.proxyRR.registeredAddress.complete ? 'checked':''} /> Registered / Residential Address
                        </label>
                        <div className="form-group">
                            <label htmlFor="registeredAddress-firstLine">Address Line 1</label>
                            <input onChange={(e) => this.updateForm(e,'ra-firsLine')} type="text" className="form-control" id="registeredAddress-firstLine" placeholder="No P.O Boxes" value={this.state.case.requirement.proxyRR.registeredAddress.firstLine} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="registeredAddress-secondLine">Address Line 2</label>
                            <input onChange={(e) => this.updateForm(e, 'ra-secondLine')} type="text" className="form-control" id="registeredAddress-secondLine" value={this.state.case.requirement.proxyRR.registeredAddress.secondLine}  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input onChange={(e) => this.updateForm(e, 'ra-city')}type="text" className="form-control" id="city" placeholder="Exactly As it is Written in Attached Document, Misspellings and all." value={this.state.case.requirement.proxyRR.registeredAddress.city} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerState">State/Province</label>
                            <select onChange={(e) => this.updateForm(e, 'ra-state')} id="customerState" className="form-control" value={this.state.case.requirement.proxyRR.registeredAddress.state}>
                                <option value="0">Select a State</option>
                            {usStates.map((state,index) =>
                                   
                                    <option key={index} value={state} >{state}</option>
                            )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <select onChange={(e) => this.updateForm(e, 'ra-country')} id="customerState" className="form-control" value={this.state.case.requirement.proxyRR.registeredAddress.country} >
                                <option value="0">Select a Country</option>
                                {countries.map((country, index) =>

                                    <option key={index} value={country} >{country}</option>
                                )}
                            </select>
                            <p className="help-block">Countries Limited to the United States in the Alpha Build</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">Postal Code</label>
                            <input onChange={(e) => this.updateForm(e, 'ra-postalCode')} type="text" className="form-control" id="ra-postal-code" placeholder="For Best Practice, please only use the first 5 digits of the Postal Code" value={this.state.case.requirement.proxyRR.registeredAddress.postalCode} />
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" /> Check me out
                            </label>
                        </div>
                            </div>   */}            
                </form>
            </div>
        );
    }
}
