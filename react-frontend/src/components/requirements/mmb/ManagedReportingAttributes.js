import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';


export default class ManagedReportingAttributes extends Component {
    
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
        this.caseService.update(data, this.props.case.ecmId, (data) => {});
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
            case "mmb-complete":
                this.props.case.requirement.mmb.managedReportingAttributes.complete = event.target.checked;
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
        if(this.props.case.requirement.mmb.managedReportingAttributes.complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"mmb " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'mmb-complete')} checked={this.props.case.requirement.mmb.managedReportingAttributes.complete ? 'checked':''} /> Management Reporting Attribures
                        </label>
                        <div className="form-group">
                            <label htmlFor="Legal-Name">MMB Customer Service Manager:</label>
                            <span>{this.props.case.requirement.mmb.managedReportingAttributes.customer}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Legal-Name">MMB Divison Customer Service Manager:</label>
                            <span>{this.props.case.requirement.mmb.managedReportingAttributes.divison}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Legal-Name">MMB RCBO:</label>
                            <span>{this.props.case.requirement.mmb.managedReportingAttributes.rcbo}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Legal-Name">MMB Div Name:</label>
                            <span>{this.props.case.requirement.mmb.managedReportingAttributes.div}</span>
                        </div>     
                    </div>               
        );
    }
}