import React, { Component } from 'react';
import CaseService from './CaseService';
import CaseStructure from './structures/CaseStructure';
import Location from '../util/Location';
import { connect } from "react-redux";


class CaseMenu extends Component {

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
      /*  this.caseService.update(data, this.props.match.params.ecmId, (data) => {
           // this.caseData = data;
           // thisRef.setState({ case: data });
        }) */
    }
    

    //Routes the changed information to the right poperty
    handleFormDataRouting(event, name){
        switch (name) {
            case "ra-firsLine":
                this.caseData.requirement.proxyRR.registeredAddress.firstLine = event.target.value;
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

    toggleCaseMenu = function(section){
        var formSection =  document.getElementsByClassName(section);
        for(var i=0; i < formSection.length; i++){
            document.getElementsByClassName('cip')[0].display = "none";
        }
        return false;

    }

    setClassNames(hash){
        let classNames = (this.props.hash === hash)?'active':'inactive';
        const {
            proxyRR,
            cip, 
            remediation, 
            relatedParties, 
            screening, 
            documentation,
            transportationSarf,
            hraEdd,
            qcChecklist,
            ousEntity,
            mmb 
        } = this.props.statuses;
        
        switch(hash){
            case '#proxyrr':
                classNames += (proxyRR === true)?' complete':' incomplete';
                break;
            case '#cip':
                classNames += (cip === true)?' complete':' incomplete';
                break;
            case '#remediation':
                classNames += (remediation === true)?' complete':' incomplete';
                break;
            case '#related-parties':
                classNames += (relatedParties === true)?' complete':' incomplete';
                break;
            case '#screening':
                classNames += (screening === true)?' complete':' incomplete';
                break;
            case '#documentation':
                classNames += (documentation === true)?' complete':' incomplete';
                break;
            case '#transportation-sarf':
                classNames += (transportationSarf === true)?' complete':' incomplete';
                break;
            case '#hraedd':
                classNames += (hraEdd === true)?' complete':' incomplete';
                break;
            case '#qc-checklist':
                classNames += (qcChecklist === true)?' complete':' incomplete';
                break;
            case '#ous-entity':
                classNames += (ousEntity === true)?' complete':' incomplete';
                break;
            case '#mmb':
                classNames += (mmb === true)?' complete':' incomplete';
                break;
            default:
                classNames +='';
        }
        
        return classNames;
    }

    render() {
        
        return (
            <div className="box box-solid box-primary ecm-affix" >
                <div className="box-header with-border">
                    <h3 className="box-title">Case Requirements</h3>
                    <div className="box-tools">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                    </button>
                    </div>
                </div>
                <div className="box-body no-padding">
                    <ul className="case-menu nav nav-pills nav-stacked">
                        <li className={this.setClassNames("#proxyrr")  }><a href="#proxyrr" onClick={()=> this.props.onHashDetect('#proxyrr')} className="proxyrr-toggle-1"><i className="fa fa-exclamation-triangle"></i> Proxy RR Requirements
                            <span className="label label-primary pull-right">12</span></a>
                        </li>
                        
                        <li className={this.setClassNames("#cip")}><a href="#cip" onClick={() => this.props.onHashDetect('#cip')} className="cip-toggle-1" ><i className="fa fa-user-circle"></i> CIP Requirements</a></li>
                        
                        <li className={this.setClassNames("#remediation")}><a href="#remediation" onClick={() => this.props.onHashDetect('#remediation')} className="remediation-toggle-1"><i className="fa fa-wrench"></i> Remediation Requirements</a></li>
                        
                        <li className={this.setClassNames("#related-parties")}><a href="#related-parties" onClick={()=> this.props.onHashDetect('#related-parties')} className="related-parties-toggle-1"><i className="fa fa-users"></i> Related Parties</a></li>
                        
                        <li className={this.setClassNames("#screening")}><a href="#screening" onClick={() => this.props.onHashDetect('#screening')} className="screening-toggle-1"><i className="fa fa-search"></i> Screening <span className="label label-warning pull-right">65</span></a></li>
                        
                        <li className={this.setClassNames("#documentation")}><a href="#documentation" onClick={() => this.props.onHashDetect('#documentation')} className="documentation-toggle-1"><i className="fa fa-file"></i> Documentation</a></li>
                        
                        <li className={this.setClassNames("#transportation-sarf")}><a href="#transportation-sarf" onClick={() => this.props.onHashDetect('#transportation-sarf')} className="transportation-sarf-toggle-1"><i className="fa fa-truck"></i> Transportation SARF</a></li>
                        
                        <li className={this.setClassNames("#hraedd")}><a href="#hraedd" onClick={() => this.props.onHashDetect('#hraedd')} className="hraedd-toggle-1"><i className="fa fa-microscope"></i> HRA EDD Determination</a></li>
                        
                        <li className={this.setClassNames("#qc-checklist")}><a href="#qc-checklist" onClick={() => this.props.onHashDetect('#qc-checklist')} className="qc-checklist-toggle-1"><i className="fa fa-clipboard-check"></i> QC Checklist</a></li>
                        
                        <li className={this.setClassNames("#ous-entity")}><a href="#ous-entity" onClick={() => this.props.onHashDetect('#ous-entity')} className="ous-entity-toggle-1"><i className="fa fa-globe"></i> OUS Requirements</a></li>
                        
                        <li className={this.setClassNames("#mmb")}><a href="#mmb" onClick={() => this.props.onHashDetect('#mmb')} className="mmb-toggle-1"><i className="fa fa-plus"></i> MMB Additional Requirements</a></li>
                    </ul>
                </div>
          </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
      statuses: state.sectionStatuses,
      hash: state.hash,
    };
  };
  
  const mapDispachToProps = dispatch => {
    return {
        onHashDetect: (hash) => dispatch({type: "HASH", value: hash}),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(CaseMenu);
