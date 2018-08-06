import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import EntityType from '../../../util/EntityType';
import Select from 'react-select';


export default class NatureOfBusiness extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.entitTypes = new EntityType();
        this.state = this.caseStructure.getStructure();
        this.entites = this.entitTypes.getEntities();
    }

    fillData() { 
        var thisRef = this;
        this.caseData = this.props.case;   
        this.caseService.naics((data)=>{
            thisRef.naicsCodes = data;
            thisRef.codelist = [];
            thisRef.setState({ naics: data });
            for(var d of data){
                var nacsDropdownTitle =  d.code  + " - " + d.title
                thisRef.codelist[d.code] = { label: nacsDropdownTitle, value: d.code };
            }
            thisRef.setState({ codeList: thisRef.codelist });
           
        })
    }

    updateData(data) {
        this.caseService.update(data, this.props.case.ecmId, (data) => {
        });
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
            case "nc-naics":
                this.props.case.requirement.proxyRR.natureOfBusiness.naics = event.target.value;
                break;
            case "nc-filter":
                this.props.case.requirement.proxyRR.natureOfBusiness.naics = event.value;
                break;
            case "nc-comments":
                this.props.case.requirement.proxyRR.natureOfBusiness.comments = event.target.value;
                break;
            case "nc-correction-required":
                this.props.case.requirement.proxyRR.natureOfBusiness.raCorrectionRequired = event.target.checked;
                break;
            case "nc-complete":
                this.props.case.requirement.proxyRR.natureOfBusiness.complete = event.target.checked;
                break;
            default:
                return false;

        }
    }

    getNaicsTitle(naics){
        var defaultNaicsTitle = "Type the proper code or search from the dropdown for the correct NAICS...";
        for(let nc in this.codelist){
            if(this.codelist[nc].value === naics){
                this.codelist[nc].selected = true;
                return this.codelist[nc].label;
            }
        }
        return defaultNaicsTitle;
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        //leaving this in for a select multple example
        if(name === "nc-naics"){
            var options = event.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
              if (options[i].selected) {
                value.push(options[i].value);
              }
            }
           this.setState({[name]: value}); 
        } else if("nc-filter"){
            this.setState({"naicsValue": event});
        } else{
            this.setState({[name]: event.target.value});
        }
        
    }

    render() {  
       
        var componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        return (

                   
                    <div className={componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e, 'nc-complete')} checked={this.props.case.requirement.proxyRR.natureOfBusiness.complete ? 'checked':''} />  Nature of Business
                        </label>
                        <div className="form-group">
                            <label htmlFor="naics-filter">Nature of the Customer's Business / NAICS Code</label>
                            <Select name="naicsFilter" onChange={(e) => this.updateForm(e, 'nc-filter')} options={this.state.codeList}  value={{label: this.getNaicsTitle(this.props.case.requirement.proxyRR.natureOfBusiness.naics)} } />
                            
                        </div>
                        
                      { /* saving for possible future use
                            <div className="form-group">
                            <label>Nature of the Customer's Business / NAICS Code</label>
                            <select name="naicsSelection" onChange={(e) => this.updateForm(e, 'nc-naics')} multiple={true}  className="form-control naics-form"  value={[this.props.case.requirement.proxyRR.natureOfBusiness.naics]}>
                            {this.tabRow()}

                             </select> 
                        </div>*/ }
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'nc-correction-required')} type="checkbox" checked={this.props.case.requirement.proxyRR.natureOfBusiness.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'nc-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.proxyRR.natureOfBusiness.comments}></textarea>
                        </div>
                    </div>               
            
        );
    }
}

