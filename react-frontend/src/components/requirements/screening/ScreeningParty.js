import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';


export default class ScreeningParty extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.state = this.caseStructure.getStructure();
    }

    fillData() { 
        this.caseData = this.props.case;
        
        
    }

    tabRow() {
        if (this.props.case.requirement.screening.screeningParty.parties instanceof Array) {
       // alert('hey');
            var thisRef = this;
            //return this.props.case.requirement.proxyRR.physicalAddress.map(function (object, i) 
            return this.props.case.requirement.screening.screeningParty.parties.map(function (object, i) { 
                let partyFirstName = null;
                let partyLastName = null;
                console.log("where are we:", thisRef.props.case.requirement.relatedParties.controlProngs.beneficialOwners[i]);
                if(thisRef.props.case.requirement.relatedParties.controlProngs.beneficialOwners[i] !== undefined &&
                   thisRef.props.case.requirement.relatedParties.controlProngs.beneficialOwners[i].hasOwnProperty('firstName') &&
                   thisRef.props.case.requirement.relatedParties.controlProngs.beneficialOwners[i].hasOwnProperty('lastName') 
                ){
                    
                    partyFirstName = thisRef.props.case.requirement.relatedParties.controlProngs.beneficialOwners[i].firstName;
                    partyLastName = thisRef.props.case.requirement.relatedParties.controlProngs.beneficialOwners[i].lastName;
                }
                
                return <div key={i} className="box-body" >
                        <h3> Related Party # {i + 1 }: {(partyFirstName != null && partyLastName != null)?partyFirstName + " " + partyLastName:"New Party"}</h3>
                        {(i > 0)?
                            (<p className="pull-right">
                            <button onClick={(e) => {thisRef.removeParty(e,i)}}  className="btn btn-danger btn-sm ad-click-event">
                                Remove Related Party # {i + 1 }
                            </button>
                        </p>)
                        :
                            ""
                        }
                      <div className="form-group">
                            <label>Are there any resluts from OFAC/PEP screening?</label>
                            <select onChange={(e) => thisRef.updateForm(e, 'sp-pepScreening',i)} className="form-control" value={object.pepScreening}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Please explain all the true hits and false positives</label>
                            <textarea onChange={(e) => thisRef.updateForm(e, 'sp-pepComments',i)} className="form-control" rows="3" placeholder="" value={object.pepComments}></textarea>
                        </div>

                        <div className="form-group">
                            <label>Are there any resluts from BSA Hotlist screening?</label>
                            <select onChange={(e) => thisRef.updateForm(e, 'sp-bsaHotlistScreening',i)} className="form-control" value={object.bsaHotlistScreening}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Please explain all the true hits and false positives</label>
                            <textarea onChange={(e) => thisRef.updateForm(e, 'sp-bsaHotlistComments',i)} className="form-control" rows="3" placeholder="" value={object.bsaHotlistComments}></textarea>
                        </div>

                         <div className="form-group">
                            <label>Are there any resluts from Negative News screening?</label>
                            <select onChange={(e) => thisRef.updateForm(e, 'sp-negativeNewsScreening',i)} className="form-control" value={object.negativeNewsScreening}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Please explain all the true hits and false positives</label>
                            <textarea onChange={(e) => thisRef.updateForm(e, 'sp-negativeNewsComments',i)} className="form-control" rows="3" placeholder="" value={object.negativeNewsComments}></textarea>
                        </div>
                </div>
            });
        }
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
    handleFormDataRouting(event, name, index){
        switch (name) { 
            case "sp-pepScreening":
                this.props.case.requirement.screening.screeningParty.parties[index].pepScreening = (event.target.value === "true")?true:false; 
                break;
            case "sp-pepComments":
                this.props.case.requirement.screening.screeningParty.parties[index].pepComments = event.target.value;
                break;
            case "sp-bsaHotlistScreening":
                this.props.case.requirement.screening.screeningParty.parties[index].bsaHotlistScreening = (event.target.value === "true")?true:false;
                break;
            case "sp-bsaHotlistComments":
                this.props.case.requirement.screening.screeningParty.parties[index].bsaHotlistComments = event.target.value;
                break;
            case "sp-negativeNewsScreening":
                this.props.case.requirement.screening.screeningParty.parties[index].negativeNewsScreening = (event.target.value === "true")?true:false;
                break;
            case "sp-negativeNewsComments":
                this.props.case.requirement.screening.screeningParty.parties[index].negativeNewsComments = event.target.value;
                break;
            case "sp-comments":
                this.props.case.requirement.screening.screeningParty.comments = event.target.value;
                break;
            case "sp-correction-required":
                this.props.case.requirement.screening.screeningParty.raCorrectionRequired = event.target.checked;
                break;
            case "sp-complete":
                this.props.case.requirement.screening.screeningParty.complete = event.target.checked;
                break;
            default:
                return false;

        }
    }

    updateForm = (event, name, index) => {
        this.handleFormDataRouting(event, name, index);
        if(name === "sp-complete" || name === "sp-isPep"){
            this.setState({[name]: event.target.checked});
        } else {
            this.setState({[name]: event.target.value});
        }
        
    }

    addParty(event){
        event.preventDefault();
        let newRelatedParty = {
            "pepScreening": false,
            "pepComments": "",
            "bsaHotlistScreening": false,
            "bsaHotlistComments": "",
            "negativeNewsScreening": false,
            "negativeNewsComments": ""
            };
        this.props.case.requirement.screening.screeningParty.parties.push(newRelatedParty);
        this.setState(this.state);
    }
    removeParty(event, key){ 
        event.preventDefault();
        this.props.case.requirement.screening.screeningParty.parties.splice(key,1);
        this.setState(this.state);
    }
  

    render() {  
        var componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.screening.screeningParty.complete){
            componentClass += " complete";
        }
        
        return (

                   
                    <div className={"screening " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'sp-complete')} checked={this.props.case.requirement.screening.screeningParty.complete ? 'checked':''} /> Screening (Party)
                        </label>
                        {this.tabRow()}
                        <div className="checkbox">
                            <p className="pull-right">
                            <button onClick={(e) => {this.addParty(e)}}  className="btn btn-success btn-sm ad-click-event">
                                    Add Another Related Party
                            </button>
                                
                            </p>
                        </div>
                        
                        
                        
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'sp-correction-required')} type="checkbox" checked={this.props.case.requirement.screening.screeningParty.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'sp-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.screening.screeningParty.comments}></textarea>
                        </div>
                    </div>               
            
        );
    }
}
