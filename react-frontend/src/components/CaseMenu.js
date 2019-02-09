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
        this.caseService.update(data, this.props.match.params.ecmId, (data) => {
           // this.caseData = data;
           // thisRef.setState({ case: data });
        })
    }
    

    //Routes the changed information to the right poperty
    handleFormDataRouting(event, name){
        switch (name) {
            case "ra-firsLine":
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

    toggleCaseMenu = function(section){
       //alert("sigh");
        console.log("bs: ", document.getElementsByClassName(section) ); 
        var formSection =  document.getElementsByClassName(section);
        for(var i=0; i < formSection.length; i++){
            document.getElementsByClassName('cip')[0].display = "none";
        }
        return false;

    }

    render() {
        
       // var usStates = this.usStates;
       // var countries = this.countries;

        return (
            <div className="box box-solid box-primary ecm-affix" >
                <div className="box-header with-border">
                    <h3 className="box-title">Case Requirements</h3>
                    {/* <h3>{this.props.focus}</h3> */}
                    <div className="box-tools">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                    </button>
                    </div>
                </div>
                <div className="box-body no-padding">
                    <ul className="case-menu nav nav-pills nav-stacked">
                    <li className={this.props.focus === "#proxyrr" ? "active": "" }><a href="#proxyrr" onClick={this.props.onProxyRR} className="proxyrr-toggle-1"><i className="fa fa-exclamation-triangle"></i> Proxy RR Requirements
                        <span className="label label-primary pull-right">12</span></a></li>
                    <li className={this.props.focus === "#cip" ? "active": "inactive" }><a href="#cip" onClick={this.props.onCIP} className="cip-toggle-1" ><i className="fa fa-user-circle"></i> CIP Requirements</a></li>
                    <li className={this.props.focus === "#remediation" ? "active": "inactive" }><a href="#remediation" onClick={this.props.onRemediation} className="remediation-toggle-1"><i className="fa fa-wrench"></i> Remediation Requirements</a></li>
                    <li className={this.props.focus === "#related-parties" ? "active": "inactive" }><a href="#related-parties" onClick={this.props.onRelatedParties} className="related-parties-toggle-1"><i className="fa fa-users"></i> Related Parties</a></li>
                    <li className={this.props.focus === "#screening" ? "active": "inactive" }><a href="#screening" onClick={this.props.onScreening} className="screening-toggle-1"><i className="fa fa-search"></i> Screening <span className="label label-warning pull-right">65</span></a></li>
                    <li className={this.props.focus === "#documentation" ? "active": "inactive" }><a href="#documentation" onClick={this.props.onDocumentation} className="documentation-toggle-1"><i className="fa fa-file"></i> Documentation</a></li>
                    <li className={this.props.focus === "#transportation-sarf" ? "active": "inactive" }><a href="#transportation-sarf" onClick={this.props.onTransportaionSarf} className="transportation-sarf-toggle-1"><i className="fa fa-truck"></i> Transportation SARF</a></li>
                    <li className={this.props.focus === "#hraedd" ? "active": "inactive" }><a href="#hraedd" onClick={this.props.onHRAEDD} className="hraedd-toggle-1"><i className="fa fa-microscope"></i> HRA EDD Determination</a></li>
                    <li className={this.props.focus === "#qc-checklist" ? "active": "inactive" }><a href="#qc-checklist" onClick={this.props.onQcChecklist} className="qc-checklist-toggle-1"><i className="fa fa-clipboard-check"></i> QC Checklist</a></li>
                    <li className={this.props.focus === "#ous-entity" ? "active": "inactive" }><a href="#ous-entity" onClick={this.props.onOUSEntity} className="ous-entity-toggle-1"><i className="fa fa-globe"></i> OUS Requirements</a></li>
                    <li className={this.props.focus === "#mmb" ? "active": "inactive" }><a href="#mmb" onClick={this.props.onMMB} className="mmb-toggle-1"><i className="fa fa-plus"></i> MMB Additional Requirements</a></li>
                    </ul>
                </div>
          </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
      focus: state.focus,
      loading: state.loading
    };
  };
  
  const mapDispachToProps = dispatch => {
    return {
    onProxyRR: () => dispatch({ type: "PROXY_RR", value: '#proxyrr' }),
    onCIP: () => dispatch({ type: "CIP", value: '#cip' }),
    onRemediation: () => dispatch({ type: "REMEDIATION", value: '#remediation' }),
    onRelatedParties: () => dispatch({type: "RELATED_PARTIES", value: "#related-parties"}),
    onScreening: () => dispatch({type: "SCREENING", value: "#screening"}),
    onDocumentation: () => dispatch({type: "DOCUMENTATION", value: "#documentation"}),
    onTransportaionSarf: () => dispatch({type: "TRANSPORTATION_SARF", value: "#transportation-sarf"}),
    onHRAEDD: () => dispatch({type: "HRA_EDD", value: "#hraedd"}),
    onQcChecklist: () => dispatch({type: "QC_CHECKLIST", value: "#qc-checklist"}),
    onOUSEntity: () => dispatch({type: "OUS_ENTITY", value: "#ous-entity"}),
    onMMB: () => dispatch({type: "MMB", value: "#mmb"}),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(CaseMenu);
