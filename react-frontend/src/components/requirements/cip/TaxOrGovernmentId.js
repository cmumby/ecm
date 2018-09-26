import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import Location from '../../../util/Location';


export default class TaxOrGovernmentId extends Component {
    
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
      //  var thisRef = this;
        this.caseData = this.props.case;
        
        
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
        this.handleFormDataRouting(event, name);
        if(name === "ra-correction-required" || "ra-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
        
    }
  

    render() {  
        var componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.cip.taxOrGovernmentId.complete){
            componentClass += " complete";
        }
        
        return (

                   
                    <div className={"cip " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'ti-complete')} checked={this.props.case.requirement.cip.taxOrGovernmentId.complete ? 'checked':''} /> Tax ID/ Government ID Number
                        </label>
                        <div className="form-group">
                            <label htmlFor="customerState">Tax ID or Government ID Number</label>
                            <select onChange={(e) => this.updateForm(e, 'ti-idType')} id="customerState" className="form-control" value={this.props.case.requirement.cip.taxOrGovernmentId.idType}>
                                <option value="Tax Identification Number">Tax Identification Number</option>
                                <option value="Government Identification Number" >Government Identification Number</option>
                           
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Legal-Name">Tax ID / Government ID Number</label>
                            <input name="Legal-Name" onChange={(e) => this.updateForm(e,'ti-id')} type="text" className="form-control" value={this.props.case.requirement.cip.taxOrGovernmentId.id} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerState">Tax Identification Numbe (TIN) Type</label>
                            <select onChange={(e) => this.updateForm(e, 'ti-tinType')} id="customerState" className="form-control" value={this.props.case.requirement.cip.taxOrGovernmentId.tinType}>
                                <option value="Social Security Number (SSN)" >Social Security Number (SSN)</option>
                                <option value="Employer Identification Number (EIN)">Employer Identification Number (EIN)</option>
                                <option value="Individual Taxpayer Identification Number (ITIN)">Individual Taxpayer Identification Number (ITIN)</option>
                                <option value="Taxpayer Identification Number for Pending U.S. Adoptions (ATIN)">Taxpayer Identification Number for Pending U.S. Adoptions (ATIN)</option>
                                <option value="Preparer Taxpayer Identification Number (PTIN)">Preparer Taxpayer Identification Number (PTIN)</option>
                            </select>
                        </div>
                       
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'ti-correction-required')} type="checkbox" checked={this.props.case.requirement.cip.taxOrGovernmentId.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'ti-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.cip.taxOrGovernmentId.comments}></textarea>
                        </div>
                    </div>               
            
        );
    }
}
