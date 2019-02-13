import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import sectionCompleteStatus from '../../../util/sectionCompleteStatus';


export default class TaxOrGovernmentId extends Component {
    
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
        this.caseService.update(data, this.props.case.ecmId, (data) => { });
    }

    componentWillMount() {
        this.fillData();
    }

    componentDidUpdate(prevProps, prevState, snapshot){ 
        let updatedCase = prevState.case;
        this.updateData(this.props.case);
       if (updatedCase.requirement.hasOwnProperty('cip')){
            //this.updateData(updatedCase);
       } else {
         return false;
       }

    }

    //Routes the changed information to the right poperty
    handleFormDataRouting(event, name){
        switch (name) { 
            case "ti-idType":
                this.props.case.requirement.cip.taxOrGovernmentId.idType = event.target.value;
                break;
            case "ti-id":
                this.props.case.requirement.cip.taxOrGovernmentId.id = event.target.value;
                break;
            case "ti-tinType":
                this.props.case.requirement.cip.taxOrGovernmentId.tinType = event.target.value;
                break;
            case "ti-comments":
                this.props.case.requirement.cip.taxOrGovernmentId.comments = event.target.value;
                break;
            case "ti-correction-required":
                this.props.case.requirement.cip.taxOrGovernmentId.raCorrectionRequired = event.target.checked;
                break;
            case "ti-complete":
                this.props.case.requirement.cip.taxOrGovernmentId.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name) => {
        const {ecmId, requirement} = this.props.case; 
        this.handleFormDataRouting(event, name);
        if(name === "ticorrection-required" || "ti-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }

        if(name === "ti-complete"){
            sectionCompleteStatus(ecmId, requirement.cip);
        }
    }
  
    render() {
        const {
            complete,
            idType,
            id,
            tinType,
            raCorrectionRequired,
            comments
        } = this.props.case.requirement.cip.taxOrGovernmentId;

        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"cip " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'ti-complete')} checked={complete ? 'checked':''} /> Tax ID/ Government ID Number
                        </label>
                        <div className="form-group">
                            <label htmlFor="customerState">Tax ID or Government ID Number</label>
                            <select onChange={(e) => this.updateForm(e, 'ti-idType')} id="customerState" className="form-control" value={idType}>
                                <option value="Tax Identification Number">Tax Identification Number</option>
                                <option value="Government Identification Number" >Government Identification Number</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Legal-Name">Tax ID / Government ID Number</label>
                            <input name="Legal-Name" onChange={(e) => this.updateForm(e,'ti-id')} type="text" className="form-control" value={id} />
                        </div>
                        <div className="form-group">
                            <label>Tax Identification Numbe (TIN) Type</label>
                            <select onChange={(e) => this.updateForm(e, 'ti-tinType')} className="form-control" value={tinType}>
                                <option value="Social Security Number (SSN)" >Social Security Number (SSN)</option>
                                <option value="Employer Identification Number (EIN)">Employer Identification Number (EIN)</option>
                                <option value="Individual Taxpayer Identification Number (ITIN)">Individual Taxpayer Identification Number (ITIN)</option>
                                <option value="Taxpayer Identification Number for Pending U.S. Adoptions (ATIN)">Taxpayer Identification Number for Pending U.S. Adoptions (ATIN)</option>
                                <option value="Preparer Taxpayer Identification Number (PTIN)">Preparer Taxpayer Identification Number (PTIN)</option>
                            </select>
                        </div>
                       
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'ti-correction-required')} type="checkbox" checked={raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'ti-comments')} className="form-control" rows="3" placeholder="" value={comments}></textarea>
                        </div>
                    </div>               
        );
    }
}