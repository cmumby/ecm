import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';


export default class Edd extends Component {
    
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
            case "edd-eddRequired":
                this.props.case.requirement.hraEdd.edd.eddRequired = (event.target.value === "true")?true:false; 
                break;
            case "edd-addTracking":
                this.props.case.requirement.hraEdd.edd.addTracking = (event.target.value === "true")?true:false; 
                break;
            case "edd-rationale":
                this.props.case.requirement.hraEdd.edd.rationale = event.target.value; 
                break;
            case "edd-comments":
                this.props.case.requirement.hraEdd.edd.comments = event.target.value;
                break;
            case "edd-correction-required":
                this.props.case.requirement.hraEdd.edd.raCorrectionRequired = event.target.checked;
                break;
            case "edd-complete":
                this.props.case.requirement.hraEdd.edd.complete = event.target.checked;
                break;
            default:
                return false;

        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "edd-correction-required" || "edd-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
        
    }
  

    render() { 
        var componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.hraEdd.edd.complete){
            componentClass += " complete";
        }
        
        return (

                   
                    <div className={"hraedd " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'edd-complete')} checked={this.props.case.requirement.hraEdd.edd.complete ? 'checked':''} /> HRA EDD Determination
                        </label>
                        <div className="form-group">
                            <label>Is EDD required?</label>
                            <select onChange={(e) => this.updateForm(e, 'edd-eddRequired')}  className="form-control" value={this.props.case.requirement.hraEdd.edd.eddRequired}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label>Do you want to add HRA Form Tracking Details</label>
                            <select onChange={(e) => this.updateForm(e, 'edd-addTracking')}  className="form-control" value={this.props.case.requirement.hraEdd.edd.addTracking}>
                            <option value="na">&nbsp;</option>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>EDD Determination rationale</label>
                            <textarea onChange={(e) => this.updateForm(e, 'edd-rationale')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.hraEdd.edd.rationale}></textarea>
                        </div>

                       
                        
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'edd-correction-required')} type="checkbox" checked={this.props.case.requirement.hraEdd.edd.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'edd-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.hraEdd.edd.comments}></textarea>
                        </div>
                    </div>               
            
        );
    }
}
