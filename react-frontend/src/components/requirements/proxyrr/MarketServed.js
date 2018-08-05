import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import EntityType from '../../../util/EntityType';
import Location from '../../../util/Location';
import Select from 'react-select';



export default class NatureOfBusiness extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.locations = new Location();
        this.entitTypes = new EntityType();
        this.usCountries = this.locations.getCountries();
        this.state = this.caseStructure.getStructure();
        this.entites = this.entitTypes.getEntities();
    }

    fillData() { 
        var thisRef = this;
        this.caseData = this.props.case;   
        thisRef.countriesDropdown = [];
        
        for(var c of thisRef.usCountries){
           
            thisRef.countriesDropdown.push({ label: c, value: c });
        }
        thisRef.setState({ countriesDropdown: thisRef.countriesDropdown });
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
            case "ms-filter":
               
                this.props.case.requirement.proxyRR.marketsServed.countries = this.formatMarketsForSave(event);
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

    getSlectedMarkets(markets){
        var marketList = [];
        marketList['key'] = 0;
        for(let m in markets){
           
            marketList[m] = {label:markets[m],value:markets[m]};
        }
        return marketList;
    }

    formatMarketsForSave(markets){
        var marketList = [];
       
        for(let m in markets){
            marketList.push(markets[m].label);
        }
        
        return marketList;
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
        } else if("ms-filter"){
           
            this.setState({[name]: event.value});
        } else{
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
        var componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        return (

                   
                    <div className={componentClass}>
                        <label>
                            <input type="checkbox" checked={this.props.case.requirement.proxyRR.natureOfBusiness.complete ? 'checked':''} />  Markets Served
                        </label>
                        <div className="form-group">
                            <label htmlFor="markets-filter">Primary Markets Served</label>
                            <Select name="marketsFilter" onChange={(e) => this.updateForm(e, 'ms-filter')} options={this.state.countriesDropdown} isMulti  value={this.getSlectedMarkets(this.props.case.requirement.proxyRR.marketsServed.countries)} />
                            
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

