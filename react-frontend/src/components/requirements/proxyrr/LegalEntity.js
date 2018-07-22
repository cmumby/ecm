import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import Location from '../../../util/Location';
import EntityType from '../../../util/EntityType';


export default class Case extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.locations = new Location();
        this.entitTypes = new EntityType();
        this.state = this.caseStructure.getStructure();
        this.usStates = this.locations.getStates();
        this.countries = this.locations.getCountries();
        this.entites = this.entitTypes.getEntities();
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
        if(name === "ra-correction-required"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
        
    }
  

    render() {  
        
        var usStates = this.usStates;
        var countries = this.countries;
        var entitySelections = this.entites;
        var componentClass = 
        (this.props.color == "light")?"box-body box-component-light":
        (this.props.color == "dark")?"box-body box-component-dark":"";
        return (

                   
                    <div className={componentClass}>
                        <label>
                            <input type="checkbox" checked={this.props.case.requirement.proxyRR.legalEntity.complete ? 'checked':''} />  Legal Entity Type
                        </label>
                        <div className="form-group">
                            <label htmlFor="city">What is the Legal Entity Type</label>
                    
                            <select onChange={(e) => this.updateForm(e, 'le-entity')} id="customerState" className="form-control" value={this.props.case.requirement.proxyRR.legalEntity.entityType}>
                                <option value="0">Select the proper entity for this customer</option>
                            {entitySelections.map((state,index) =>
                                   
                                    <option key={index} value={state} >{state}</option>
                            )}
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
