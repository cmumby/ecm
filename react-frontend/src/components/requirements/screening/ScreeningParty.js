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
                return <div key={i} className="box-body" >
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

    addReport(event){
        event.preventDefault();
        let newInvestagationId = {
            investagationId: ""
        };
        this.props.case.requirement.screening.screeningParty.investagationIds.push(newInvestagationId);
        this.setState(this.state);
    }
    removeReport(event, key){ 
        event.preventDefault();
        this.props.case.requirement.screening.screeningParty.investagationIds.splice(key,1);
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
