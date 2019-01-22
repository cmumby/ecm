import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';


export default class ParticipationPurchased extends Component {
    
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
            case "pp-purchased":
                this.props.case.requirement.remediation.participationPurchased.isPurchased = event.target.value;
                break;
            case "pp-comments":
                this.props.case.requirement.remediation.participationPurchased.comments = event.target.value;
                break;
            case "pp-correction-required":
                this.props.case.requirement.remediation.participationPurchased.raCorrectionRequired = event.target.checked;
                break;
            case "pp-complete":
                this.props.case.requirement.remediation.participationPurchased.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "pp-correction-required" || "pp-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
        
    }
  
    render() {
        const{
            complete,
            isPurchased,
            raCorrectionRequired, 
            comments
        } = this.props.case.requirement.remediation.participationPurchased;

        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"remediation " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'pp-complete')} checked={complete ? 'checked':''} /> Participation Purchased
                        </label>
                        <div className="form-group">
                            <label htmlFor="participationPurchased">Participation Purchased</label>
                            <select onChange={(e) => this.updateForm(e, 'pp-purchased')} id="participationPurchased" className="form-control" value={isPurchased}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                        
                        
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'pp-correction-required')} type="checkbox" checked={raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'pp-comments')} className="form-control" rows="3" placeholder="" value={comments}></textarea>
                        </div>
                    </div>               
            
        );
    }
}
