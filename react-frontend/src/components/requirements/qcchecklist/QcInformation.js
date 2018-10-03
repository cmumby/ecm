import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';
import Location from '../../../util/Location';


export default class QcInformation extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.locations = new Location();
        this.state = this.caseStructure.getStructure();
        this.usStates = this.locations.getStates();
        this.countries = this.locations.getCountries();
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
            case "qci-qcName":
                this.props.case.requirement.qcChecklist.qcInformation.qcName = event.target.value;
                break;
            case "qci-dateReceived":
                this.props.case.requirement.qcChecklist.qcInformation.dateReceived = event.target.value;
                break;
            case "qci-comments":
                this.props.case.requirement.qcChecklist.qcInformation.comments = event.target.value;
                break;
            case "qci-firstReview":
                this.props.case.requirement.qcChecklist.qcInformation.firstReview = event.target.checked;
                break;
            case "qci-secondReview":
                this.props.case.requirement.qcChecklist.qcInformation.secondReview = event.target.checked;
                break;
            case "qci-correction-required":
                this.props.case.requirement.qcChecklist.qcInformation.raCorrectionRequired = event.target.checked;
                break;
            case "qci-complete":
                this.props.case.requirement.qcChecklist.qcInformation.complete = event.target.checked;
                break;
            default:
                return false;

        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        if(name === "qci-correction-required" || "qci-complete"){
            this.setState({[name]: event.target.checked});
        }  else{
            this.setState({[name]: event.target.value});
        }
        
    }
  

    render() {  
        var componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.qcChecklist.qcInformation.complete){
            componentClass += " complete";
        }
        
        return (

                   
                    <div className={"qc-checklist " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'qci-complete')} checked={this.props.case.requirement.qcChecklist.qcInformation.complete ? 'checked':''} /> QC Information
                        </label>
                        <div className="form-group">
                            <label htmlFor="Legal-Name">QC Name</label>
                            <input name="Legal-Name" onChange={(e) => this.updateForm(e,'qci-qcName')} type="text" className="form-control"  placeholder="Exactly As it is Written on the Supporting Documentaion" value={this.props.case.requirement.qcChecklist.qcInformation.qcName} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dba-name">Date Received</label>
                            <input name="dba-name" onChange={(e) => this.updateForm(e, 'qci-dateReceived')} type="text" className="form-control"  placeholder="Doing Business As Name from offical supporting documentaion"  value={this.props.case.requirement.qcChecklist.qcInformation.dateReceived}  />
                        </div>
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'qci-firstReview')} type="checkbox" checked={this.props.case.requirement.qcChecklist.qcInformation.firstReview ?'checked':''} /> First Review
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'qci-secondReview')} type="checkbox" checked={this.props.case.requirement.qcChecklist.qcInformation.secondReview ?'checked':''} /> Second Review
                            </label>
                        </div>
                    </div>               
            
        );
    }
}
