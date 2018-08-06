import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import Location from '../../../util/Location';
import Products from '../../../util/Products';
import Select from 'react-select';



export default class NatureOfBusiness extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.locations = new Location();
        this.products = new Products();
        this.currentProducts = this.products.getCurrentProducts();
        this.userProducts = this.products.getUserProducts();
        this.state = this.caseStructure.getStructure();
       
    }

    fillData() { 
        var thisRef = this;
        this.caseData = this.props.case;   
        thisRef.currentProductsDropDown = [];
        thisRef.userProducstsDropDown = [];
        
        for(var cp of thisRef.currentProducts){
           
            thisRef.currentProductsDropDown.push({ label: cp, value: cp });
        }
        
        for(var up of thisRef.userProducts){
           
            thisRef.userProducstsDropDown.push({ label: up, value: up });
        }
        thisRef.setState({ currentProductsDropdown: thisRef.currentProductsDropDown });
        thisRef.setState({ userProducstsDropdown: thisRef.userProducstsDropDown });
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
            case "cp-filter":
                this.props.case.requirement.proxyRR.productsAndServices.currentProducts = this.formatProductsForSave(event);
                break;
            case "cp-user":
                this.props.case.requirement.proxyRR.productsAndServices.userProducts = this.formatProductsForSave(event);
                break;
            case "cp-comments":
                this.props.case.requirement.proxyRR.productsAndServices.comments = event.target.value;
                break;
            case "cp-correction-required":
                this.props.case.requirement.proxyRR.productsAndServices.raCorrectionRequired = event.target.checked;
                break;
            case "cp-complete":
                this.props.case.requirement.proxyRR.productsAndServices.complete = event.target.checked;
                break;
            default:
                return false;

        }
    }

    getSlectedCurrentProducts(products){
        var productList = [];
        for(let p in products){
           
            productList[p] = {label:products[p],value:products[p]};
        }
        return productList;
    }

    formatProductsForSave(markets){
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
                            <input type="checkbox" onChange={(e) => this.updateForm(e, 'cp-complete')} checked={this.props.case.requirement.proxyRR.productsAndServices.complete ? 'checked':''} />  Products and Services
                        </label>
                        <div className="form-group">
                            <label htmlFor="productsFilter">Current Products</label>
                            <Select name="productsFilter" onChange={(e) => this.updateForm(e, 'cp-filter')} options={this.state.currentProductsDropdown} isMulti  value={this.getSlectedCurrentProducts(this.props.case.requirement.proxyRR.productsAndServices.currentProducts)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="productsUserFilter">User Products and Services</label>
                            <Select name="productsUserFilter" onChange={(e) => this.updateForm(e, 'cp-user')} options={this.state.userProducstsDropdown} isMulti  value={this.getSlectedCurrentProducts(this.props.case.requirement.proxyRR.productsAndServices.userProducts)} />  
                        </div>
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'cp-correction-required')} type="checkbox" checked={this.props.case.requirement.proxyRR.productsAndServices.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'cp-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.proxyRR.productsAndServices.comments}></textarea>
                        </div>
                    </div>               
            
        );
    }
}

