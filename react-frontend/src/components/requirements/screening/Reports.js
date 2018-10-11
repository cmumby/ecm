import React, { Component } from 'react';
import CaseService from '../../CaseService';
import CaseStructure from '../../structures/CaseStructure';


export default class Reports extends Component {
    
    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.state = this.caseStructure.getStructure();
    }

    fillData() { 
        this.caseData = this.props.case;
    }

    tabRow() {
        if (this.props.case.requirement.screening.reports.investagationIds instanceof Array) {
            let thisRef = this;
            return this.props.case.requirement.screening.reports.investagationIds.map(function (object, i) { 
                return <div className="form-group" key={i}>
                        {(i > 0)?
                            (<p className="pull-right">
                            <button onClick={(e) => {thisRef.removeReport(e,i)}}  className="btn btn-danger btn-sm ad-click-event">
                                Remove Investgation ID # {i + 1 }
                            </button>
                        </p>)
                        :
                            ""
                        }
                        <label htmlFor="r-firstName">Investgation ID # {i + 1 }</label>
                        <input onChange={(e) => thisRef.updateForm(e, 'r-investagationId', i)} type="text" className="form-control" value={object.investagationId} />
                </div>
            });
        }
    }

    updateData(data) {
        this.caseService.update(data, this.props.case.ecmId, (data) => {});
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
    handleFormDataRouting(event, name, index){
        switch (name) { 
            case "r-investagationId":
                this.props.case.requirement.screening.reports.investagationIds[index].investagationId = event.target.value;
                break;
            case "r-comments":
                this.props.case.requirement.screening.reports.comments = event.target.value;
                break;
            case "r-correction-required":
                this.props.case.requirement.screening.reports.raCorrectionRequired = event.target.checked;
                break;
            case "r-complete":
                this.props.case.requirement.screening.reports.complete = event.target.checked;
                break;
            default:
                return false;
        }
    }

    updateForm = (event, name, index) => {
        this.handleFormDataRouting(event, name, index);
        if(name === "r-complete" || name === "r-isPep"){
            this.setState({[name]: event.target.checked});
        } else {
            this.setState({[name]: event.target.value});
        } 
    }

    addReport(event){
        event.preventDefault();
        let newInvestagationId = {
            investagationId: ""
        };
        this.props.case.requirement.screening.reports.investagationIds.push(newInvestagationId);
        this.setState(this.state);
    }

    removeReport(event, key){ 
        event.preventDefault();
        this.props.case.requirement.screening.reports.investagationIds.splice(key,1);
        this.setState(this.state);
    }
  
    render() {  
        let componentClass = 
        (this.props.color === "light")?"box-body box-component-light":
        (this.props.color === "dark")?"box-body box-component-dark":"";
        if(this.props.case.requirement.screening.reports.complete){
            componentClass += " complete";
        }
        
        return (
                    <div className={"screening " + componentClass}>
                        <label>
                            <input type="checkbox" onChange={(e) => this.updateForm(e,'r-complete')} checked={this.props.case.requirement.screening.reports.complete ? 'checked':''} /> Screening
                        </label>
                        
                        {this.tabRow()}
                        <div className="checkbox">
                            <p className="pull-right">
                            <button onClick={(e) => {this.addReport(e)}}  className="btn btn-success btn-sm ad-click-event">
                                    Add Another Investigation ID
                            </button>
                                
                            </p>
                        </div>
                        
                        <div className="checkbox">
                            <label>
                                <input onChange={(e) => this.updateForm(e, 'r-correction-required')} type="checkbox" checked={this.props.case.requirement.screening.reports.raCorrectionRequired ?'checked':''} /> Analyst Correction Required
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea onChange={(e) => this.updateForm(e, 'r-comments')} className="form-control" rows="3" placeholder="" value={this.props.case.requirement.screening.reports.comments}></textarea>
                        </div>
                    </div>               
        );
    }
}