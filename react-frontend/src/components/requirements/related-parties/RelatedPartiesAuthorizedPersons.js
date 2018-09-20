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
        if (this.props.case.requirement.proxyRR.physicalAddress instanceof Array && this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.anyNonUlimitmadeBo == true ) {
        
            var thisRef = this;
            //return this.props.case.requirement.proxyRR.physicalAddress.map(function (object, i) 
            return this.props.case.requirement.proxyRR.physicalAddress.map(function (object, i) { 
                return <div key={i} className="box-body" >
                        <h3> Related Parties / Authorized Person # {i + 1 }</h3>
                        <hr/>
                            {(i > 0)?
                                (<p className="pull-right">
                                <button onClick={(e) => {thisRef.removeAddress(e,i)}}  className="btn btn-danger btn-sm ad-click-event">
                                    Remove this Related Parties / Authorized Person
                                </button>
                            </p>)
                            :
                                ""
                            }
                             
                    <div className="form-group">
                        <label htmlFor="physicalAddress-firstLine">Address Line 1</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'pa-firsLine', i)} type="text" className="form-control" id="physicalAddress-firstLine" placeholder={(i === 0 )?"No P.O Boxes In First Address" :"Add P.O Boxes here"} value={object.firstLine} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="physicalAddress-secondLine">Address Line 2</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'pa-secondLine', i)} type="text" className="form-control" id="physicalAddress-secondLine" value={object.secondLine} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'pa-city', i)} type="text" className="form-control" id="city" placeholder="Exactly As it is Written in Attached Document, Misspellings and all." value={object.city} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customerState">State/Province</label>
                        <select onChange={(e) => thisRef.updateForm(e, 'pa-state', i)} id="customerState" className="form-control" value={object.state}>
                            <option value="0">Select a State</option>
                            {usStates.map((state, index) =>

                                <option key={index} value={state} >{state}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <select onChange={(e) => thisRef.updateForm(e, 'pa-country' ,i)} id="customerState" className="form-control" value={object.country} disabled>
                            <option value="0">Select a Country</option>
                            {countries.map((country, index) =>

                                <option key={index} value={country} >{country}</option>
                            )}
                        </select>
                        <p className="help-block">Countries Limited to the United States in the Alpha Build</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Postal Code</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'pa-postalCode', i )} type="text" className="form-control" id="pa-postal-code" placeholder="For Best Practice, please only use the first 5 digits of the Postal Code" value={object.postalCode} />
                    </div>
                    <div className="checkbox">
                        <label>
                            <input onChange={(e) => thisRef.updateForm(e, 'pa-correction-required', i)} type="checkbox" defaultChecked={object.raCorrectionRequired } /> Analyst Correction Required
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Comments</label>
                        <textarea onChange={(e) => thisRef.updateForm(e, 'pa-comments', i)} className="form-control" rows="3" placeholder="" value={object.comments}></textarea>
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
                this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.anyNonUlimitmadeBo = (event.target.value == "true")?true:false;
                break;
            case "pa-firsLine":
                this.props.case.requirement.proxyRR.physicalAddress[index].firstLine = event.target.value;
                break;
            case "pa-secondLine":
                this.props.case.requirement.proxyRR.physicalAddress[index].secondLine = event.target.value;
                break;
            case "pa-city":
                this.props.case.requirement.proxyRR.physicalAddress[index].city = event.target.value;
                break;
            case "pa-state":
                this.props.case.requirement.proxyRR.physicalAddress[index].state = event.target.value;
                break;
            case "pa-country":
                this.props.case.requirement.proxyRR.physicalAddress[index].country = event.target.value;
                break;
            case "pa-postalCode":
                this.props.case.requirement.proxyRR.physicalAddress[index].postalCode = event.target.value;
                break;
            case "pa-comments":
                this.props.case.requirement.proxyRR.physicalAddress[index].comments = event.target.value;
                break;
            case "pa-correction-required":
                this.props.case.requirement.proxyRR.physicalAddress[index].raCorrectionRequired = event.target.checked;
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
        if(name === "rpap-complete"){
            this.setState({[name]: event.target.checked});
        } else {
            this.setState({[name]: event.target.value});
        }
        
    }
    
    addAddress(event){
        event.preventDefault();
        let newAddressField = {"firstLine":"","secondLine":"","city":"","state":"","country":"United States","postalCode":"",
                               "comments":"","attachments":null,"raCorrectionRequired":false,"complete":false};
        this.props.case.requirement.proxyRR.physicalAddress.push(newAddressField);
        this.setState(this.state);
    }
    removeAddress(event, key){ 
        event.preventDefault();
        this.props.case.requirement.proxyRR.physicalAddress.splice(key,1);
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
                            <label>
                                <input type="checkbox" /> Check me out
                            </label>
                            <p className="pull-right">
                            {(this.props.case.requirement.relatedParties.relatedPartiesAuthorizedPersons.anyNonUlimitmadeBo == true)?
                                (<button onClick={(e) => {this.addAddress(e)}} href="https://themequarry.com/theme/ample-admin-the-ultimate-dashboard-template-ASFEDA95" className="btn btn-success btn-sm ad-click-event">
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
