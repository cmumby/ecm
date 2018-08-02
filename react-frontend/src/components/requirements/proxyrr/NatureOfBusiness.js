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
            case "nc-naics":
                this.props.case.requirement.proxyRR.natureOfBusiness.naics = event.target.value;
                break;
            case "nc-filter":
                this.props.case.requirement.proxyRR.natureOfBusiness.naics = event.target.value;
                
                break;
            case "nc-comments":
                this.props.case.requirement.proxyRR.natureOfBusiness.comments = event.target.value;
                break;
            case "nc-correction-required":
                this.props.case.requirement.proxyRR.natureOfBusiness.raCorrectionRequired = event.target.checked;
                break;
            default:
                return false;

        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "nc-naics"){
            var options = event.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
              if (options[i].selected) {
                value.push(options[i].value);
              }
            }
           // this.props.case.requirement.proxyRR.natureOfBusiness(value);
           this.setState({[name]: value}); 
        }  else{
            this.setState({[name]: event.target.value});
        }
        
    }

    tabRow(){
        if(this.state.naics instanceof Array){
  
          return this.state.naics.map(function(object, i){
              return  <option id={'naics-' + object.code} key={i} value={[object.code]} >{object.code} - {object.title}</option>;
          })
        }
      }
  

    render() {  
       
        console.log('nc',this.props.case);
        var componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        return (

                   
                    <div className={componentClass}>
                        <label>
                            <input type="checkbox" checked={this.props.case.requirement.proxyRR.natureOfBusiness.complete ? 'checked':''} />  Nature of Business
                        </label>
                        <div className="form-group">
                            <label htmlFor="naics-filter">Filter the codes</label>
                            <input onChange={(e) => this.updateForm(e, 'nc-filter')} type="text" className="form-control" id="naics-filter" placeholder="Search for the prooper naics code..."  />
                        </div>
                        
                        <div className="form-group">
                            <label>Nature of the Customer's Business / NAICS Code</label>
                            <select onChange={(e) => this.updateForm(e, 'nc-naics')} multiple={true}  className="form-control naics-form"  value={[this.props.case.requirement.proxyRR.natureOfBusiness.naics]}>
                            {this.tabRow()}

                            </select>
                        </div>
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

