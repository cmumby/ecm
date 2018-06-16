import React, { Component } from 'react';
import CaseService from './CaseService';
import CaseStructure from './structures/CaseStructure';

export default class Case extends Component {

    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.state = this.caseStructure.getStructure();
        this.usStates = this.caseStructure.getStates();
     }

    componentWillMount() {
        this.fillData();
    }
    

    fillData() {
        var thisRef = this;
        this.caseService.get(this.props.match.params.ecmId, (data) => {
            thisRef.setState({ case: data });
        })
    }

    handStateLabel() {
        var statusClass = "";
        switch (this.props.obj.status) {
            case "Review In Progress":
                statusClass = "label-info";
                break;
            case 'Review Pending':
                statusClass = "label-warning";
                break;
            case 'Revisions Required':
                statusClass = "label-danger";
                break;
            case 'Requirements Complete':
                statusClass = "label-success";
                break;
            default:
                statusClass = "label-info";
        }
        return statusClass;
    }


    handleDaysSince() {
        const ONE_DAY = 24 * 60 * 60 * 1000;
        let statusTimestap = new Date(this.props.obj.statusTimestamp);
        return Math.round(Math.abs((statusTimestap.getTime() - new Date().getTime()) / (ONE_DAY)));
    }

    render() {
    
        var usStates = this.usStates;

        return (
            <div className="box box-primary">
                <div className="box-header with-border">
                    <h3 className="box-title">Requirements for Case: {this.state.case.name}</h3>
                </div>
                <form>
                    
                    <div className="box-body">
                        <label>
                            <input type="checkbox" checked={this.state.case.requirement.proxyRR.registeredAddress.complete ? 'checked':''} /> Registered / Residential Address
                        </label>
                        <div className="form-group">
                            <label htmlFor="addressLine1">Address Line 1</label>
                            <input type="text" className="form-control" id="addressLine1" placeholder="No P.O Boxes" value={this.state.case.requirement.proxyRR.registeredAddress.firstLine} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="addressLine2">Address Line 2</label>
                            <input type="text" className="form-control" id="addressLine2" value={this.state.case.requirement.proxyRR.registeredAddress.secondLine}  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" id="city" placeholder="Exactly As it is Written in Attached Document, Misspellings and all." value={this.state.case.requirement.proxyRR.registeredAddress.city} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerState">State</label>
                            <select id="customerState" className="form-control" value={this.state.case.requirement.proxyRR.registeredAddress.state}>
                                <option value="0">Select a State</option>
                            {usStates.map((state,index) =>
                                   
                                    <option value={state} selected={ this.state.case.requirement.proxyRR.registeredAddress.state == state? 'selected':''}>{state}</option>
                            )}
                            </select>

                            <p className="help-block">Example block-level help text here.</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input type="text" className="form-control" id="country" placeholder="Exactly As it is Written in Attached Document, Misspellings and all." value={this.state.case.requirement.proxyRR.registeredAddress.country} />
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" /> Check me out
                            </label>
                        </div>
                    </div>               
                </form>
            </div>
        );
    }
}
