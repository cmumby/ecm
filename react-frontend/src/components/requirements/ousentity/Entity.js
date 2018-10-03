import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';


export default class Entity extends Component {
    
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
        this.caseService.update(data, this.props.case.ecmId, (data) => {
        })
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
            case "ous-hasOus":
                this.props.case.requirement.ousEntity.entity.hasOus = (event.target.value === "true")?true:false; 
                break;
            case "ous-complete":
                this.props.case.requirement.ousEntity.entity.complete = event.target.checked;
                break;
            default:
                return false;

        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "ous-correction-required" || "ous-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
        
    }
  

    render() {  
        var componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.ousEntity.entity.complete){
            componentClass += " complete";
        }
        
        return (

                   
                    <div className={"ous-entity " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'ous-complete')} checked={this.props.case.requirement.ousEntity.entity.complete ? 'checked':''} /> OUS Entity Information
                        </label>
                        <div className="form-group">
                            <label htmlFor="internetGambling">Does the Customer have OUS entities?</label>
                            <select onChange={(e) => this.updateForm(e, 'ous-hasOus')} id="internetGambling" className="form-control" value={this.props.case.requirement.ousEntity.entity.hasOus}>
                                <option value="true">Yes</option>
                                <option value="false" >No</option>
                            </select>
                        </div>
                    </div>               
            
        );
    }
}
