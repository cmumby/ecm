import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import EntityType from '../../../util/EntityType';



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
            case "rp-parties":
                this.props.case.requirement.proxyRR.relatedParties.anyForeignParties = event.target.value;
                break;
            case "rp-comments":
                this.props.case.requirement.proxyRR.relatedParties.comments = event.target.value;
                break;
            case "rp-correction-required":
                this.props.case.requirement.proxyRR.relatedParties.raCorrectionRequired = event.target.checked;
                break;
            case "rp-complete":
                this.props.case.requirement.proxyRR.relatedParties.complete = event.target.checked;
                break;
            default:
                return false;

        }
    }


    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        //leaving this in for a select multple example
        this.setState({[name]: event.target.value});
        
    }

    tabRow(){
        if(this.state.naics instanceof Array){
  
          return this.state.naics.map(function(object, i){
              return  <option id={'naics-' + object.code} key={i} value={[object.code]} >{object.code} - {object.title}</option>;
          })
        }
      }
  

    render() {  
       
        var componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.proxyRR.relatedParties.complete){
            componentClass += " complete";
        }
        return (

                   
                    <div className={componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e, 'rp-complete')} checked={this.props.case.requirement.proxyRR.relatedParties.complete ? 'checked':''} />  Related Parties
                        </label>
                        <div className="form-group">
                            <label htmlFor="customerState">Are any of the entity's princapals, beneficial oweners, or gurantors permanent residents of a different country then whe the entity's products/service accunts are booked?</label>
                            <select onChange={(e) => this.updateForm(e, 'rp-parties')} id="customerState" className="form-control" defaultValue={false} value={this.props.case.requirement.proxyRR.relatedParties.anyForeignParties}>
                                
                                <option value={true} >Yes</option>
                                <option value={false} >No</option>
                            </select>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'rp-correction-required')} type="checkbox" checked={this.props.case.requirement.proxyRR.relatedParties.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'rp-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.proxyRR.relatedParties.comments}></textarea>
                        </div>
                    </div>               
            
        );
    }
}

