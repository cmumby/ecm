import React, { Component } from 'react';
import CaseService from './CaseService';
import CaseStructure from './structures/CaseStructure';
import Location from '../util/Location';
import RegisteredAddress from './requirements/proxyrr/RegisteredAddress';
import PhysicalAddress from './requirements/proxyrr/PhysicalAddress';
import LegalEntity from './requirements/proxyrr/LegalEntity';
import LegalFormation from './requirements/proxyrr/LegalFormation';
import NatureOfBusiness from './requirements/proxyrr/NatureOfBusiness';
import MarketServed from './requirements/proxyrr/MarketServed';
import RelatedParties from './requirements/proxyrr/RelatedParties';
import Pep from './requirements/proxyrr/Pep';
import ProductsAndServices from './requirements/proxyrr/ProductsAndServices';

export default class CaseMenu extends Component {

    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.locations = new Location();
        this.state = this.caseStructure.getStructure();
        this.usStates = this.locations.getStates();
        this.countries = this.locations.getCountries();
     }

    componentWillMount() {
        this.fillData();
    }

   componentDidUpdate(prevProps, prevState, snapshot){
        var updatedCase = prevState.case;
        if (updatedCase.requirement.hasOwnProperty('cip')){
            this.updateData(updatedCase);
        } else {
            return false;
        }
    }
    

    fillData() { 
        var thisRef = this;
        this.caseService.get(this.props.match.params.ecmId, (data) => {
            this.caseData = data;
            thisRef.setState({ case: data });
        })
    }
    updateData(data) {
       // var thisRef = this;
        this.caseService.update(data, this.props.match.params.ecmId, (data) => {
           // this.caseData = data;
           // thisRef.setState({ case: data });
        })
    }
    

    //Routes the changed information to the right poperty
    handleFormDataRouting(event, name){
        switch (name) {
            case "ra-firsLine":
                alert('???');
                this.caseData.requirement.proxyRR.registeredAddress.firstLine = event.target.value;
                console.log("new??: " );
                break;
            case "ra-secondLine":
                this.caseData.requirement.proxyRR.registeredAddress.secondLine = event.target.value;
                break;
            case "ra-city":
                this.caseData.requirement.proxyRR.registeredAddress.city = event.target.value;
                break;
            case "ra-state":
                this.caseData.requirement.proxyRR.registeredAddress.state = event.target.value;
                break;
            case "ra-country":
                this.caseData.requirement.proxyRR.registeredAddress.country = event.target.value;
                break;
            case "ra-postalCode":
                this.caseData.requirement.proxyRR.registeredAddress.postalCode = event.target.value;
                break;
            default:
                return false;

        }
    }

    updateForm = (event, name) => {
        this.handleFormDataRouting(event, name);
        this.setState({[name]: event.target.value});
    }

    render() {
        
       // var usStates = this.usStates;
       // var countries = this.countries;

        return (
            <div className="box box-solid position-sticky" >
                <div className="box-header with-border">
                    <h3 className="box-title">Case Requirements</h3>

                    <div className="box-tools">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                    </button>
                    </div>
                </div>
                <div className="box-body no-padding">
                    <ul className="nav nav-pills nav-stacked">
                    <li className="active"><a href="#"><i className="fa fa-align-left"></i> Proxy RR Requirements
                        <span className="label label-primary pull-right">12</span></a></li>
                    <li><a href="#"><i className="fa fa-align-left"></i> CIP Requirements</a></li>
                    <li><a href="#"><i className="fa fa-align-left"></i> Related Parties</a></li>
                    <li><a href="#"><i className="fa fa-align-left"></i> Screening <span className="label label-warning pull-right">65</span></a>
                    </li>
                    <li><a href="#"><i className="fa fa-align-left"></i> Documentation</a></li>
                    <li><a href="#"><i className="fa fa-align-left"></i> Transportation SARF</a></li>
                    <li><a href="#"><i className="fa fa-align-left"></i> HRA EDD Determination</a></li>
                    <li><a href="#"><i className="fa fa-align-left"></i> QC Checklist</a></li>
                    <li><a href="#"><i className="fa fa-align-left"></i> OUS Requirements</a></li>
                    <li><a href="#"><i className="fa fa-align-left"></i> MMD Additional Requirements</a></li>
                    </ul>
                </div>
          </div>
            
        );
    }
}
