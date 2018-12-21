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
        let thisRef = this;
        this.caseData = this.props.case;   
        thisRef.countriesDropdown = [];
        
        for(let c of thisRef.usCountries){
           
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
            case "nc-naics":
                this.props.case.requirement.proxyRR.natureOfBusiness.naics = event.target.value;
                break;
            case "ms-filter":
                this.props.case.requirement.proxyRR.marketsServed.countries = this.formatMarketsForSave(event);
                break;
            case "ms-comments":
                this.props.case.requirement.proxyRR.marketsServed.comments = event.target.value;
                break;
            case "ms-correction-required":
                this.props.case.requirement.proxyRR.marketsServed.raCorrectionRequired = event.target.checked;
                break;
            case "ms-complete":
                this.props.case.requirement.proxyRR.marketsServed.complete = event.target.checked;
                break;
            default:
                return false;

        }
    }

    getSlectedMarkets(markets){
        let marketList = [];
        marketList['key'] = 0;
        for(let m in markets){
           
            marketList[m] = {label:markets[m],value:markets[m]};
        }
        return marketList;
    }

    formatMarketsForSave(markets){
        let marketList = [];
       
        for(let m in markets){
            marketList.push(markets[m].label);
        }
        
        return marketList;
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        //leaving this in for a select multple example
        if(name === "nc-naics"){
            let options = event.target.options;
            let value = [];
            for (let i = 0, l = options.length; i < l; i++) {
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
        const { complete, 
                countries, 
                raCorrectionRequired, 
                comments
        } = this.props.case.requirement.proxyRR.marketsServed;
        
        const { countriesDropdown } = this.state;
                
        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.proxyRR.marketsServed.complete){
            componentClass += " complete";
        }
        return (

                    <div className={"proxyrr " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e, 'ms-complete')} checked={complete ? 'checked':''} />  Markets Served
                        </label>
                        <div className="form-group">
                            <label htmlFor="markets-filter">Primary Markets Served</label>
                            <Select className="requirement-filter" name="marketsFilter" onChange={(e) => this.updateForm(e, 'ms-filter')} options={countriesDropdown} isMulti  value={this.getSlectedMarkets(countries)} />
                        </div>
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'ms-correction-required')} type="checkbox" checked={raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'ms-comments')} className="form-control" rows="3" placeholder="" value={comments}></textarea>
                        </div>
                    </div>               
        );
    }
}

