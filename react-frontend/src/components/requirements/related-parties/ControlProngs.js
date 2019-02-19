import React, { Component } from 'react';
import { connect } from "react-redux";
import { getSectionStatuses } from '../../../util/getSectionStatuses';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import Location from '../../../util/Location';
import sectionCompleteStatus from '../../../util/sectionCompleteStatus';


class ControlProngs extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.locations = new Location();
        this.state = this.caseStructure.getStructure();
        this.usStates = this.locations.getStates();
        this.countries = this.locations.getCountries();
    }

    fillData() { 
        this.caseData = this.props.case;
    }

    tabRow() {
        let usStates = this.usStates; 
        let countries = this.countries;
        if (this.props.case.requirement.proxyRR.physicalAddress instanceof Array) {
        
            let thisRef = this;
           
            return this.props.case.requirement.relatedParties.controlProngs.beneficialOwners.map(function (object, i) { 
                return <div key={i} className="box-body" >
                        <h3>Beneficial Owners / Shareholders / Members / Control Prongs # {i + 1 }</h3>
                        <hr/>
                            {(i > 0)?
                                (<p className="pull-right">
                                <button onClick={(e) => {thisRef.removeAuthorizedPerson(e,i)}}  className="btn btn-danger btn-sm ad-click-event">
                                    Remove this Beneficial Owner
                                </button>
                            </p>)
                            :
                                ""
                            }
                            
                    <div className="form-group">
                            <label htmlFor="cipNotice">Is the Related Party / Authorized Person an individual? </label>
                            <select onChange={(e) => thisRef.updateForm(e, 'boc-individual',i)} className="form-control" value={object.isIndividual}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                    </div>
                   
                    <div className="form-group">
                        <label htmlFor="boc-firstName">First Name</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'boc-firstName', i)} type="text" className="form-control" id="physicalAddress-firstLine" placeholder="Exactly as Written on Supporting Documentaion" value={object.firstName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="boc-middleName">Middle Name</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'boc-middleName', i)} type="text" className="form-control" id="physicalAddress-firstLine" placeholder="Exactly as Written on Supporting Documentaion"  value={object.middleName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="boc-lastName">Last Name</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'boc-lastName', i)} type="text" className="form-control" id="physicalAddress-firstLine" placeholder="Exactly as Written on Supporting Documentaion"  value={object.lastName} />
                    </div>
                    <div className="form-group">
                            <label>Occupation </label>
                            <select onChange={(e) => thisRef.updateForm(e, 'boc-occupation', i)} className="form-control" value={object.occupation}>
                                <option value="Proprietor, Professional, Managerial">Proprietor, Professional, Managerial</option>
                                <option value="other" >Other</option>
                            </select>
                    </div>
                    <div className="form-group">
                            <label>WCIS Related Party Type </label>
                            <select onChange={(e) => thisRef.updateForm(e, 'boc-wcisRelatedPartyType', i)} className="form-control" value={object.wcisRelatedPartyType}>
                                <option value="Benefical Owner">Benefical Owner</option>
                                <option value="other" >Other</option>
                            </select>
                    </div>
                    <p>WCIS ID: {object.wcisId}</p>        
                    <div className="form-group">
                        <label>Address Line 1</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'boc-firsLine', i)} type="text" className="form-control" placeholder={(i === 0 )?"No P.O Boxes In First Address" :"Add P.O Boxes here"} value={object.firstLine} />
                    </div>
                    <div className="form-group">
                        <label>Address Line 2</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'boc-secondLine', i)} type="text" className="form-control" value={object.secondLine} />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'boc-city', i)} type="text" className="form-control" placeholder="Exactly As it is Written in Attached Document, Misspellings and all." value={object.city} />
                    </div>
                    <div className="form-group">
                        <label>State/Province</label>
                        <select onChange={(e) => thisRef.updateForm(e, 'boc-state', i)} className="form-control" value={object.state}>
                            <option value="0">Select a State</option>
                            {usStates.map((state, index) =>

                                <option key={index} value={state} >{state}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <select onChange={(e) => thisRef.updateForm(e, 'boc-country' ,i)} className="form-control" value={object.country} disabled>
                            <option value="0">Select a Country</option>
                            {countries.map((country, index) =>

                                <option key={index} value={country} >{country}</option>
                            )}
                        </select>
                        <p className="help-block">Countries Limited to the United States in the Alpha Build</p>
                    </div>
                    <div className="form-group">
                        <label>Date Of Birth</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'boc-dateOfBirth', i )} type="text" className="form-control" value={object.dateOfBirth} />
                    </div>
                    <div className="form-group">
                            <label>Tax ID or Government ID Number </label>
                            <select onChange={(e) => thisRef.updateForm(e, 'boc-idType', i)}  className="form-control" value={object.idType}>
                                <option value="Tax Identification Number">Tax Identification Number</option>
                                <option value="Government Identification Number" >Government Identification Number</option>
                            </select>  
                    </div>
                    <div className="form-group">
                        <label>Tax ID / Government ID Number</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'boc-tin', i)} type="text" className="form-control" placeholder="Do not include dashes." value={object.tin} />
                    </div>
                    <div className="form-group">
                        <label>Tax Identification Numbe (TIN) Type</label>
                        <select onChange={(e) => thisRef.updateForm(e, 'boc-tinType', i)} className="form-control" value={object.tinType}>
                            <option value="Social Security Number (SSN)" >Social Security Number (SSN)</option>
                            <option value="Employer Identification Number (EIN)">Employer Identification Number (EIN)</option>
                            <option value="Individual Taxpayer Identification Number (ITIN)">Individual Taxpayer Identification Number (ITIN)</option>
                            <option value="Taxpayer Identification Number for Pending U.S. Adoptions (ATIN)">Taxpayer Identification Number for Pending U.S. Adoptions (ATIN)</option>
                            <option value="Preparer Taxpayer Identification Number (PTIN)">Preparer Taxpayer Identification Number (PTIN)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Country of Issuance</label>
                        <select onChange={(e) => thisRef.updateForm(e, 'boc-countryOfIssuance' ,i)} className="form-control" value={object.countryOfIssuance} >
                            <option value="0">Select a Country</option>
                            {countries.map((country, index) =>

                                <option key={index} value={country} >{country}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Expiration Date</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'boc-expirationDate', i)} type="text" className="form-control" value={object.expirationDate} />
                    </div>
                    <div className="form-group">
                        <label>Domicile</label>
                        <select onChange={(e) => thisRef.updateForm(e, 'boc-countryOfCitizenship' ,i)} className="form-control" value={object.domicile} >
                            <option value="0">Select a Country</option>
                            {countries.map((country, index) =>

                                <option key={index} value={country} >{country}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Country of Citizenship</label>
                        <select onChange={(e) => thisRef.updateForm(e, 'boc-countryOfCitizenship' ,i)} className="form-control" value={object.countryOfCitizenship} >
                            <option value="0">Select a Country</option>
                            {countries.map((country, index) =>

                                <option key={index} value={country} >{country}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                            <label>Legal Entity Type of the Related Party</label>
                            <select onChange={(e) => thisRef.updateForm(e, 'boc-legalEntityType', i)}  className="form-control" value={object.legalEntityType}>
                                <option value="INDIVIDUALS">INDIVIDUALS</option>
                                <option value="Other" >Other</option>
                            </select>  
                    </div>
                    <div className="form-group">
                            <label>Organization Type / Sub-Type of the Related Party</label>
                            <select onChange={(e) => thisRef.updateForm(e, 'boc-organizationType', i)}  className="form-control" value={object.organizationType}>
                                <option value="Individuals ~ Individuals">Individuals ~ Individuals</option>
                                <option value="Other" >Other</option>
                            </select>  
                    </div>
                    <div className="form-group">
                            <label>Relationship Type of the Related Party</label>
                            <select onChange={(e) => thisRef.updateForm(e, 'boc-relationshipType', i)}  className="form-control" value={object.relationshipType}>
                                <option value="Beneficial Owner">Beneficial Owner</option>
                                <option value="Authorized Person" >Authorized Person</option>
                                <option value="Control Prong" >Control Prong</option>
                            </select>  
                    </div>
                    <div className="form-group">
                            <label>Beneficial Owner Type</label>
                            <select onChange={(e) => thisRef.updateForm(e, 'boc-beneficialOwnerType', i)}  className="form-control" value={object.beneficialOwnerType}>
                                <option value="Control & Ownership">Control & Ownership</option>
                                <option value="Control" >Control</option>
                                <option value="Ownership" >Ownership</option>
                            </select>  
                    </div>
                    <div className="form-group">
                        <label>State of Registration (Entities Only)</label>
                        <select onChange={(e) => thisRef.updateForm(e, 'boc-stateOfRegistration', i)} id="customerState" className="form-control" value={object.stateOfRegistration}>
                            <option value="0">Select a State</option>
                            {usStates.map((state, index) =>

                                <option key={index} value={state} >{state}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                            <label>CDDI Task Request (Related Party)</label>
                            <select onChange={(e) => thisRef.updateForm(e, 'boc-cddiTaskRequest', i)}  className="form-control" value={object.cddiTaskRequest}>
                                <option value="None">None</option>
                                <option value="Screening" >Screening</option>
                                <option value="Verification" >Verification</option>
                                <option value="Screening & Verification" >Screening & Verification</option>
                            </select>  
                    </div>
                    <div className=" form-group checkbox">
                        <label>
                            <input onChange={(e) => thisRef.updateForm(e, 'boc-isPep', i)} type="checkbox" defaultChecked={object.isPep } /> Is PEP?
                        </label>
                    </div>
                    
                    <div className="checkbox">
                        <label>
                            <input onChange={(e) => thisRef.updateForm(e, 'boc-correction-required', i)} type="checkbox" defaultChecked={object.raCorrectionRequired } /> Analyst Correction Required
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Comments</label>
                        <textarea onChange={(e) => thisRef.updateForm(e, 'boc-comments', i)} className="form-control" rows="3" placeholder="" value={object.comments}></textarea>
                    </div>
                </div>
            })
        }
    }

    
    updateData(data) {
        this.caseService.update(data, this.props.case.ecmId, (data) => {});
    }

    componentWillMount() {
        this.fillData();
    }

    //Routes the changed information to the right poperty
    handleFormDataRouting(event, name, index){
        switch (name) { 
            case "boc-non-ubo":
                this.props.case.requirement.relatedParties.controlProngs.anyNonUlimitmadeBo = (event.target.value === "true")?true:false;
                break;
            case "boc-individual":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].isIndividual = (event.target.value === "true")?true:false;
                break;
            case "boc-firstName":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].firstName = event.target.value;
                break;
            case "boc-middleName":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].middleName = event.target.value;
                break;
            case "boc-lastName":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].lastName = event.target.value;
                break;
            case "boc-occupation":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].occupation = event.target.value;
                break;
            case "boc-wcisRelatedPartyType":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].wcisRelatedPartyType = event.target.value;
                break;
            case "boc-firsLine":
               this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].firstLine = event.target.value;
                break;
            case "boc-secondLine":
               this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].secondLine = event.target.value;
                break;
            case "boc-city":
               this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].city = event.target.value;
                break;
            case "boc-state":
               this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].state = event.target.value;
                break;
            case "boc-country":
               this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].country = event.target.value;
                break;
            case "boc-postalCode":
               this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].postalCode = event.target.value;
                break;
            case "boc-dateOfBirth":
            this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].dateOfBirth = event.target.value;
                break;
            case "boc-idType":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].idType = event.target.value;
                break;
            case "boc-tin":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].tin = event.target.value;
                break;
            case "boc-tinType":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].tinType = event.target.value;
                break;
            case "boc-countryOfIssuance":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].countryOfIssuance = event.target.value;
                break;
            case "boc-expirationDate":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].expirationDate = event.target.value;
                break;
            case "boc-domicile":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].domicile = event.target.value;
                break;
            case "boc-countryOfCitizenship":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].countryOfCitizenship = event.target.value;
                break;
            case "boc-legalEntityType":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].legalEntityType = event.target.value;
                break;
            case "boc-organizationType":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].organizationType = event.target.value;
                break;
            case "boc-relationshipType":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].relationshipType = event.target.value;
                break;
            case "boc-beneficialOwnerType":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].beneficialOwnerType = event.target.value;
                break;
            case "boc-stateOfRegistration":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].stateOfRegistration = event.target.value;
                break;
            case "boc-cddiTaskRequest":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].cddiTaskRequest = event.target.value;
                break;
            case "boc-comments":
               this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].comments = event.target.value;
                break;
            case "boc-isPep":
                this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].isPep = event.target.checked;
                 break;
            case "boc-correction-required":
               this.props.case.requirement.relatedParties.controlProngs.beneficialOwners[index].raCorrectionRequired = event.target.checked;
                break;
            case "boc-complete":
                this.props.case.requirement.relatedParties.controlProngs.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name, index) => {
        const {ecmId, requirement} = this.props.case;
        this.handleFormDataRouting(event, name, index);
        if(name === "boc-complete" || name === "boc-isPep"){
            this.setState({[name]: event.target.checked});
        } else {
            this.setState({[name]: event.target.value});
        }

        if(name === "boc-complete"){
            const isComplete = sectionCompleteStatus(ecmId, requirement.relatedParties);
            let newStatus = getSectionStatuses(requirement);
            newStatus.relatedParties = isComplete;
            this.props.onSectionStatusFill(newStatus);
        }

        this.updateData(this.props.case);
        
    }
    
    addAuthorizedPerson(event){
        event.preventDefault();
        let newAuthorizedPerson = {
            "comments": "",
            "raCorrectionRequired": false,
            "isPep": false,
            "stateOfRegistration": "",
            "beneficialOwnerType": "",
            "relationshipType": "",
            "organizationType": "",
            "legalEntityType": "",
            "countryOfCitizenship": "",
            "domicile": "United States",
            "expirationDate": "",
            "countryOfIssuance": "United States",
            "tinType": "",
            "tin": "",
            "idType": "",
            "dateOfBirth": "",
            "postalCode": "",
            "country": "",
            "state": "",
            "city": "",
            "secondLine": "",
            "firstLine": "",
            "wcisId": null,
            "wcisRelatedPartyType": "",
            "occupation": "",
            "lastName": "",
            "middleName": "",
            "firstName": "",
            "isIndividual": true
        };
        this.props.case.requirement.relatedParties.controlProngs.beneficialOwners.push(newAuthorizedPerson);
        this.setState(this.state);
    }

    removeAuthorizedPerson(event, key){ 
        event.preventDefault();
        this.props.case.requirement.relatedParties.controlProngs.beneficialOwners.splice(key,1);
        this.setState(this.state);
    }

    render() {
        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.relatedParties.controlProngs.complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"related-parties " + componentClass}>
                        <label> 
                            <input onChange={(e) => this.updateForm(e, 'boc-complete', 0)} type="checkbox" checked={this.props.case.requirement.relatedParties.controlProngs.complete ? 'checked' : ''} /> Beneficial Owners / Shareholders / Members / Control Prongs
                        </label>
                        <div className="form-group">
                            <p>Add any Beneficial Owner that holds more than teh CDD standards required threshold based on risk rating/geographic localion and/or a Control Prong for the customer </p>
                        </div>
                        
                        {this.tabRow()}
                       
                        <div className="checkbox">
                            <p className="pull-right">
                                <button onClick={(e) => {this.addAuthorizedPerson(e)}}  className="btn btn-success btn-sm ad-click-event">
                                    Add Another Beneficial Owner
                                </button>
                            </p>
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

const mapDispatchToProps = dispatch => { 
    return {
        onSectionStatusFill: (statuses) => dispatch({type:"STATUS_UPDATE", value: statuses})
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ControlProngs);