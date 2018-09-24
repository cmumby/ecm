import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import Location from '../../../util/Location';


export default class RelatedPartiesAuthorizedPersons extends Component {
    
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
        var usStates = this.usStates; 
        var countries = this.countries;
        if (this.props.case.requirement.proxyRR.physicalAddress instanceof Array && this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.anyNonUlimitmadeBo === true ) {
        
            var thisRef = this;
            //return this.props.case.requirement.proxyRR.physicalAddress.map(function (object, i) 
            return this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons.map(function (object, i) { 
                return <div key={i} className="box-body" >
                        <h3> Related Parties / Authorized Person # {i + 1 }</h3>
                        <hr/>
                            {(i > 0)?
                                (<p className="pull-right">
                                <button onClick={(e) => {thisRef.removeAuthorizedPerson(e,i)}}  className="btn btn-danger btn-sm ad-click-event">
                                    Remove this Related Parties / Authorized Person
                                </button>
                            </p>)
                            :
                                ""
                            }
                            {console.log("no sah", object)}
                    <div className="form-group">
                            <label htmlFor="cipNotice">Is the Related Party / Authorized Person an individual? </label>
                            <select onChange={(e) => thisRef.updateForm(e, 'rpap-individual',i)} className="form-control" value={object.isIndividual}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                    </div>
                   
                    <div className="form-group">
                        <label htmlFor="rpap-firstName">First Name</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'rpap-firstName', i)} type="text" className="form-control" id="physicalAddress-firstLine" placeholder="Exactly as Written on Supporting Documentaion" value={object.firstName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rpap-middleName">Middle Name</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'rpap-middleName', i)} type="text" className="form-control" id="physicalAddress-firstLine" placeholder="Exactly as Written on Supporting Documentaion"  value={object.middleName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rpap-lastName">Last Name</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'rpap-lastName', i)} type="text" className="form-control" id="physicalAddress-firstLine" placeholder="Exactly as Written on Supporting Documentaion"  value={object.lastName} />
                    </div>
                    <div className="form-group">
                            <label htmlFor="cipNotice">Occupation </label>
                            <select onChange={(e) => thisRef.updateForm(e, 'rpap-occupation', i)} id="cipNotice" className="form-control" value={object.occupation}>
                                <option value="Proprietor, Professional, Managerial">Proprietor, Professional, Managerial</option>
                                <option value="other" >Other</option>
                            </select>
                    </div>
                    <div className="form-group">
                            <label htmlFor="cipNotice">WCIS Related Party Type </label>
                            <select onChange={(e) => thisRef.updateForm(e, 'rpap-wcisRelatedPartyType', i)} id="cipNotice" className="form-control" value={object.wcisRelatedPartyType}>
                                <option value="Benefical Owner">Benefical Owner</option>
                                <option value="other" >Other</option>
                            </select>
                            
                    </div>
                    <p>WCIS ID: {object.wcisId}</p>        
                    <div className="form-group">
                        <label htmlFor="physicalAddress-firstLine">Address Line 1</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'rpap-firsLine', i)} type="text" className="form-control" id="physicalAddress-firstLine" placeholder={(i === 0 )?"No P.O Boxes In First Address" :"Add P.O Boxes here"} value={object.firstLine} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="physicalAddress-secondLine">Address Line 2</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'rpap-secondLine', i)} type="text" className="form-control" id="physicalAddress-secondLine" value={object.secondLine} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'rpap-city', i)} type="text" className="form-control" id="city" placeholder="Exactly As it is Written in Attached Document, Misspellings and all." value={object.city} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customerState">State/Province</label>
                        <select onChange={(e) => thisRef.updateForm(e, 'rpap-state', i)} id="customerState" className="form-control" value={object.state}>
                            <option value="0">Select a State</option>
                            {usStates.map((state, index) =>

                                <option key={index} value={state} >{state}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <select onChange={(e) => thisRef.updateForm(e, 'rpap-country' ,i)} id="customerState" className="form-control" value={object.country} disabled>
                            <option value="0">Select a Country</option>
                            {countries.map((country, index) =>

                                <option key={index} value={country} >{country}</option>
                            )}
                        </select>
                        <p className="help-block">Countries Limited to the United States in the Alpha Build</p>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="city">Date Of Birth</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'rpap-dateOfBirth', i )} type="text" className="form-control" id="rpap-postal-code"  value={object.dateOfBirth} />
                    </div>
                    <div className="form-group">
                            <label>Tax ID or Government ID Number </label>
                            <select onChange={(e) => thisRef.updateForm(e, 'rpap-idType', i)}  className="form-control" value={object.idType}>
                                <option value="Tax Identification Number">Tax Identification Number</option>
                                <option value="Government Identification Number" >Government Identification Number</option>
                            </select>  
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Tax ID / Government ID Number</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'rpap-tin', i)} type="text" className="form-control" id="city" placeholder="Do not include dashes." value={object.tin} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customerState">Tax Identification Numbe (TIN) Type</label>
                        <select onChange={(e) => thisRef.updateForm(e, 'rpap-tinType', i)} className="form-control" value={object.tinType}>
                            <option value="Social Security Number (SSN)" >Social Security Number (SSN)</option>
                            <option value="Employer Identification Number (EIN)">Employer Identification Number (EIN)</option>
                            <option value="Individual Taxpayer Identification Number (ITIN)">Individual Taxpayer Identification Number (ITIN)</option>
                            <option value="Taxpayer Identification Number for Pending U.S. Adoptions (ATIN)">Taxpayer Identification Number for Pending U.S. Adoptions (ATIN)</option>
                            <option value="Preparer Taxpayer Identification Number (PTIN)">Preparer Taxpayer Identification Number (PTIN)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country of Issuance</label>
                        <select onChange={(e) => thisRef.updateForm(e, 'rpap-countryOfIssuance' ,i)} className="form-control" value={object.countryOfIssuance} >
                            <option value="0">Select a Country</option>
                            {countries.map((country, index) =>

                                <option key={index} value={country} >{country}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Expiration Date</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'rpap-expirationDate', i)} type="text" className="form-control" id="city" value={object.expirationDate} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Domicile</label>
                        <select onChange={(e) => thisRef.updateForm(e, 'rpap-countryOfCitizenship' ,i)} className="form-control" value={object.domicile} >
                            <option value="0">Select a Country</option>
                            {countries.map((country, index) =>

                                <option key={index} value={country} >{country}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country of Citizenship</label>
                        <select onChange={(e) => thisRef.updateForm(e, 'rpap-countryOfCitizenship' ,i)} className="form-control" value={object.countryOfCitizenship} >
                            <option value="0">Select a Country</option>
                            {countries.map((country, index) =>

                                <option key={index} value={country} >{country}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                            <label>Legal Entity Type of the Related Party</label>
                            <select onChange={(e) => thisRef.updateForm(e, 'rpap-legalEntityType', i)}  className="form-control" value={object.legalEntityType}>
                                <option value="INDIVIDUALS">INDIVIDUALS</option>
                                <option value="Other" >Other</option>
                            </select>  
                    </div>
                    <div className="form-group">
                            <label>Organization Type / Sub-Type of the Related Party</label>
                            <select onChange={(e) => thisRef.updateForm(e, 'rpap-organizationType', i)}  className="form-control" value={object.organizationType}>
                                <option value="Individuals ~ Individuals">Individuals ~ Individuals</option>
                                <option value="Other" >Other</option>
                            </select>  
                    </div>
                    <div className="form-group">
                            <label>Relationship Type of the Related Party</label>
                            <select onChange={(e) => thisRef.updateForm(e, 'rpap-relationshipType', i)}  className="form-control" value={object.relationshipType}>
                                <option value="Beneficial Owner">Beneficial Owner</option>
                                <option value="Authorized Person" >Authorized Person</option>
                                <option value="Control Prong" >Control Prong</option>
                            </select>  
                    </div>
                    <div className="form-group">
                            <label>Beneficial Owner Type</label>
                            <select onChange={(e) => thisRef.updateForm(e, 'rpap-beneficialOwnerType', i)}  className="form-control" value={object.beneficialOwnerType}>
                                <option value="Control & Ownership">Control & Ownership</option>
                                <option value="Control" >Control</option>
                                <option value="Ownership" >Ownership</option>
                            </select>  
                    </div>
                    <div className="form-group">
                        <label>State of Registration (Entities Only)</label>
                        <select onChange={(e) => thisRef.updateForm(e, 'rpap-stateOfRegistration', i)} id="customerState" className="form-control" value={object.stateOfRegistration}>
                            <option value="0">Select a State</option>
                            {usStates.map((state, index) =>

                                <option key={index} value={state} >{state}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                            <label>CDDI Task Request (Related Party)</label>
                            <select onChange={(e) => thisRef.updateForm(e, 'rpap-cddiTaskRequest', i)}  className="form-control" value={object.cddiTaskRequest}>
                                <option value="None">None</option>
                                <option value="Screening" >Screening</option>
                                <option value="Verification" >Verification</option>
                                <option value="Screening & Verification" >Screening & Verification</option>
                            </select>  
                    </div>
                    <div className=" form-group checkbox">
                        <label>
                            <input onChange={(e) => thisRef.updateForm(e, 'rpap-isPep', i)} type="checkbox" defaultChecked={object.isPep } /> Is PEP?
                        </label>
                    </div>
                    
                    <div className="checkbox">
                        <label>
                            <input onChange={(e) => thisRef.updateForm(e, 'rpap-correction-required', i)} type="checkbox" defaultChecked={object.raCorrectionRequired } /> Analyst Correction Required
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Comments</label>
                        <textarea onChange={(e) => thisRef.updateForm(e, 'rpap-comments', i)} className="form-control" rows="3" placeholder="" value={object.comments}></textarea>
                    </div>
                </div>
            })
        }
    }

    
    updateData(data) {
        //var thisRef = this;
        this.caseService.update(data, this.props.case.ecmId, (data) => {
           // this.caseData = data;
           // thisRef.setState({ case: data });
        })
    }

    componentWillMount() {
        this.fillData();
    }

    componentDidUpdate(prevProps, prevState, snapshot){ 
        var updatedCase = prevState.case;
        
        this.updateData(this.props.case);
       if (updatedCase.requirement.hasOwnProperty('cip')){
            this.updateData(updatedCase);
       } else {
         return false;
       }

    }

    //Routes the changed information to the right poperty
    handleFormDataRouting(event, name, index){
        switch (name) { 
            case "rpap-non-ubo":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.anyNonUlimitmadeBo = (event.target.value === "true")?true:false;
                break;
            case "rpap-individual":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].isIndividual = (event.target.value === "true")?true:false;
                break;
            case "rpap-firstName":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].firstName = event.target.value;
                break;
            case "rpap-middleName":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].middleName = event.target.value;
                break;
            case "rpap-lastName":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].lastName = event.target.value;
                break;
            case "rpap-occupation":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].occupation = event.target.value;
                break;
            case "rpap-wcisRelatedPartyType":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].wcisRelatedPartyType = event.target.value;
                break;
            case "rpap-firsLine":
               this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].firstLine = event.target.value;
                break;
            case "rpap-secondLine":
               this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].secondLine = event.target.value;
                break;
            case "rpap-city":
               this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].city = event.target.value;
                break;
            case "rpap-state":
               this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].state = event.target.value;
                break;
            case "rpap-country":
               this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].country = event.target.value;
                break;
            case "rpap-postalCode":
               this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].postalCode = event.target.value;
                break;
            case "rpap-dateOfBirth":
            this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].dateOfBirth = event.target.value;
                break;
            case "rpap-idType":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].idType = event.target.value;
                break;
            case "rpap-tin":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].tin = event.target.value;
                break;
            case "rpap-tinType":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].tinType = event.target.value;
                break;
            case "rpap-countryOfIssuance":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].countryOfIssuance = event.target.value;
                break;
            case "rpap-expirationDate":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].expirationDate = event.target.value;
                break;
            case "rpap-domicile":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].domicile = event.target.value;
                break;
            case "rpap-countryOfCitizenship":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].countryOfCitizenship = event.target.value;
                break;
            case "rpap-legalEntityType":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].legalEntityType = event.target.value;
                break;
            case "rpap-organizationType":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].organizationType = event.target.value;
                break;
            case "rpap-relationshipType":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].relationshipType = event.target.value;
                break;
            case "rpap-beneficialOwnerType":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].beneficialOwnerType = event.target.value;
                break;
            case "rpap-stateOfRegistration":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].stateOfRegistration = event.target.value;
                break;
            case "rpap-cddiTaskRequest":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].cddiTaskRequest = event.target.value;
                break;
            case "rpap-comments":
               this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].comments = event.target.value;
                break;
            case "rpap-isPep":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].isPep = event.target.checked;
                 break;
            case "rpap-correction-required":
               this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons[index].raCorrectionRequired = event.target.checked;
                break;
            case "rpap-complete":
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.complete = event.target.checked;
                break;
            default:
                return false;

        }
    }

    updateForm = (event, name, index) => {
        this.handleFormDataRouting(event, name, index);
        if(name === "rpap-complete" || name === "rpap-isPep"){
            this.setState({[name]: event.target.checked});
        } else {
            this.setState({[name]: event.target.value});
        }
        
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
        this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons.push(newAuthorizedPerson);
        this.setState(this.state);
    }
    removeAuthorizedPerson(event, key){ 
        event.preventDefault();
        this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.authorizedPersons.splice(key,1);
        this.setState(this.state);
    }

    render() {
        var componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.complete){
            componentClass += " complete";
        }
        
        return (

                   
                    <div className={"related-parties " + componentClass}>
                   
                        <label> 
                            <input onChange={(e) => this.updateForm(e, 'rpap-complete', 0)} type="checkbox" checked={this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.complete ? 'checked' : ''} /> Related Parties / Authorized Persons
                        </label>
                        <div className="form-group">
                            <label htmlFor="cipNotice">Are there any Related Parties / Authorized Persons that are not Ultimate Benefical Owners?</label>
                            <select onChange={(e) => this.updateForm(e, 'rpap-non-ubo')} id="cipNotice" className="form-control" value={this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.anyNonUlimitmadeBo}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        {this.tabRow()}
                       
                        <div className="checkbox">
                            <p className="pull-right">
                            {(this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.anyNonUlimitmadeBo === true)?
                                (<button onClick={(e) => {this.addAuthorizedPerson(e)}}  className="btn btn-success btn-sm ad-click-event">
                                    Add Another Related Parties / Authorized Person
                                </button>):
                                ""
                            }
                                
                            </p>
                        </div>
                    </div>               
             
        );
    }
}
