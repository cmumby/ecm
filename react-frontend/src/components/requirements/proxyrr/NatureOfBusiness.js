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
            thisRef.setState({ naics: data });
           
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
            case "le-entity":
                this.props.case.requirement.proxyRR.legalEntity.entityType = event.target.value;
                break;
            
            case "le-comments":
                this.props.case.requirement.proxyRR.legalEntity.comments = event.target.value;
                break;
            case "le-correction-required":
                this.props.case.requirement.proxyRR.legalEntity.raCorrectionRequired = event.target.checked;
                break;
            default:
                return false;

        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "le-correction-required"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
        
    }

    tabRow(){
        if(this.state.naics instanceof Array){
  
          var thisRef = this;
          return this.state.naics.map(function(object, i){
              return  <option key={i} value={object.code} >{object.code} - {object.title}</option>;
          })
        }
      }
  

    render() {  
        var entitySelections = this.entites;
        var usNaicsCodes = this.state.naics;
        console.log('nc',this.state.naics);
        var componentClass = 
        (this.props.color == "light")?"box-body box-component-light":
        (this.props.color == "dark")?"box-body box-component-dark":"";
        return (

                   
                    <div className={componentClass}>
                        <label>
                            <input type="checkbox" checked={this.props.case.requirement.proxyRR.legalEntity.complete ? 'checked':''} />  Nature of Business
                        </label>
                        <div className="form-group">
                            <label htmlFor="city">Filter the codes</label>
                    
                            <select onChange={(e) => this.updateForm(e, 'le-entity')} id="customerState" className="form-control" value={this.props.case.requirement.proxyRR.legalEntity.entityType}>
                                <option value="0">Select the proper entity for this customer</option>
                            {entitySelections.map((state,index) =>
                                   
                                    <option key={index} value={state} >{state}</option>
                            )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Nature of the Customer's Business / NAICS Code</label>
                            <select multiple={true}  className="form-control naics-form">
                            {this.tabRow()}
                            </select>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'le-correction-required')} type="checkbox" checked={this.props.case.requirement.proxyRR.legalEntity.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'le-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.proxyRR.legalEntity.comments}></textarea>
                        </div>
                    </div>               
            
        );
    }
}
