import React, { Component } from 'react';
import { connect } from "react-redux";
import CaseService from './CaseService';
import CaseStructure from './structures/CaseStructure';
import RegisteredAddress from './requirements/proxyrr/RegisteredAddress';
import PhysicalAddress from './requirements/proxyrr/PhysicalAddress';
import LegalEntity from './requirements/proxyrr/LegalEntity';
import LegalFormation from './requirements/proxyrr/LegalFormation';
import NatureOfBusiness from './requirements/proxyrr/NatureOfBusiness';
import MarketServed from './requirements/proxyrr/MarketServed';
import RelatedParties from './requirements/proxyrr/RelatedParties';
import Pep from './requirements/proxyrr/Pep';
import ProductsAndServices from './requirements/proxyrr/ProductsAndServices';
import CustomerName from './requirements/cip/CustomerName';
import TaxOrGovernmentId from './requirements/cip/TaxOrGovernmentId';
import InvestmentVechiclesFunds from './requirements/remediation/InvestmentVechiclesFunds';
import CustomerDetails from './requirements/remediation/CustomerDetails';
import AccountRelationship from './requirements/remediation/AccountRelationship';
import LegalFormationRemediation from'./requirements/remediation/LegalFormationRemediation';
import CustomerStructure from './requirements/remediation/CustomerStructure';
import SourceOfWealth from './requirements/remediation/SourceOfWealth';
import GeneralDescriptionOfBusiness from './requirements/remediation/GeneralDescriptionOfBusiness';
import SourceOfFunds from './requirements/remediation/SourceOfFunds';
import ParticipationPurchased from './requirements/remediation/ParticipationPurchased';
import CipNotice from './requirements/remediation/CipNotice';
import InternetGambling from './requirements/remediation/InternetGambling';
import ProhibitedCustomers from './requirements/remediation/ProhibitedCustomers';
import RelationshipManager from './requirements/remediation/RelationshipManager';
import CipCddApprovedDate from './requirements/remediation/CipCddApprovedDate';
import Submitter from './requirements/remediation/Submitter';
import RelatedPartiesAuthorizedPersons from './requirements/related-parties/RelatedPartiesAuthorizedPersons';
import ControlProngs from './requirements/related-parties/ControlProngs';
import CddiTaskRequest from './requirements/screening/CddiTaskRequest';
import Reports from './requirements/screening/Reports';
import ScreeningCustomer from './requirements/screening/ScreeningCustomer';
import ScreeningParty from './requirements/screening/ScreeningParty';
import RequiredDocuments from './requirements/documentation/RequiredDocuments';
import Sarf from './requirements/transportationSarf/Sarf';
import Edd from './requirements/hraedd/Edd';
import QcInformation from './requirements/qcchecklist/QcInformation';
import QcReview from './requirements/qcchecklist/QcReview';
import Entity from './requirements/ousentity/Entity';
import ManagedReportingAttributes from './requirements/mmb/ManagedReportingAttributes';

class Case extends Component {

    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        this.state = this.caseStructure.getStructure(); 
        
       
     }

    componentWillMount() {
        this.fillData();
        
    }

    componentDidUpdate(prevProps, prevState, snapshot){
       
        let updatedCase = prevState.case;
        if (updatedCase.requirement.hasOwnProperty('cip')){
            this.updateData(updatedCase);
        } else {
            return false;
        }
    }
    
    fillData() {
       
        let thisRef = this;
        this.caseService.get(this.props.match.params.ecmId, (data) => {
            this.caseData = data;
            thisRef.setState({ case: data });
            
            this.sectionStatuses = this.getSectionStatuses();
            this.props.onSectionStatusFill(this.sectionStatuses);
        });
    }

    getSectionStatuses(){
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
        } = this.state.case.requirement;

        return {
          "proxyRR": proxyRR.sectionComplete,
          "cip": cip.sectionComplete,
          "remediation": remediation.sectionComplete,
          "relatedParties": relatedParties.sectionComplete,
          "screening": screening.sectionComplete,
          "documentation": documentation.sectionComplete,
          "transportationSarf": transportationSarf.sectionComplete,
          "hraEdd": hraEdd.sectionComplete,
          "qcChecklist": qcChecklist.sectionComplete,
          "ousEntity": ousEntity.sectionComplete,
          "mmb": mmb.sectionComplete
        }
    }

    updateData(data) {
        this.caseService.update(data, this.props.match.params.ecmId, (data) => {
        });
    }
    
    render() {
        
       
        return (
            <div id="form-container" className="box box-solid box-primary">
                <div className="box-header with-border">
                    <h3 className="box-title">Requirements for Case: {this.state.case.name}</h3>
                </div>
                <form name="reqForm">
                {(this.props.hash === '#proxyrr') && 
                    <section className="proxy-rr-section">
                        <RegisteredAddress case={this.state.case} color="light" />
                        <PhysicalAddress case={this.state.case} color="dark"/>
                        <LegalEntity case={this.state.case} color="light"/>
                        <LegalFormation case={this.state.case} color="dark"/>
                        <NatureOfBusiness case={this.state.case} color="light"/>
                        <MarketServed case={this.state.case} color="dark"/> 
                        <RelatedParties case={this.state.case} color="light"/>
                        <Pep case={this.state.case} color="dark"/> 
                        <ProductsAndServices case={this.state.case} color="light"/>
                    </section>
                }

                {(this.props.hash === '#cip') &&
                    <section className="cip-section">
                        <CustomerName case={this.state.case} color="light"/>
                        <TaxOrGovernmentId case={this.state.case} color="dark"/>
                    </section>
                }

                {(this.props.hash === '#remediation') &&
                    <section className="remediation-section">
                        <InvestmentVechiclesFunds case={this.state.case} color="light"/>
                        <CustomerDetails case={this.state.case} color="dark"/>
                        <AccountRelationship case={this.state.case} color="light"/>
                        <LegalFormationRemediation case={this.state.case} color="dark"/>
                        <CustomerStructure case={this.state.case} color="light"/>
                        <SourceOfWealth case={this.state.case} color="dark"/>
                        <GeneralDescriptionOfBusiness case={this.state.case} color="light"/>
                        <SourceOfFunds case={this.state.case} color="dark"/>
                        <ParticipationPurchased case={this.state.case} color="light"/>
                        <CipNotice case={this.state.case} color="dark"/>
                        <InternetGambling case={this.state.case} color="light"/>
                        <ProhibitedCustomers case={this.state.case} color="dark"/>
                        <RelationshipManager case={this.state.case} color="light"/>
                        <CipCddApprovedDate case={this.state.case} color="dark"/>
                        <Submitter case={this.state.case} color="light"/>
                    </section>
                }

                {(this.props.hash === '#related-parties') &&
                    <section className="related-parties-section">
                        <RelatedPartiesAuthorizedPersons case={this.state.case} color="light"/>
                        <ControlProngs case={this.state.case} color="dark"/>
                    </section>
                }

                {(this.props.hash === '#screening') &&
                    <section className="screening-section">
                        <CddiTaskRequest case={this.state.case} color="light"/>
                        <Reports case={this.state.case} color="dark" />
                        <ScreeningCustomer case={this.state.case} color="light" />
                        <ScreeningParty case={this.state.case} color="dark" />
                    </section>
                }

                {(this.props.hash === '#documentation') &&
                    <section className="documentation-section">
                      <RequiredDocuments case={this.state.case} color="light" />
                    </section>
                }

                {(this.props.hash === '#transportation-sarf') &&
                    <section className="transportationSarf-section">
                      <Sarf case={this.state.case} color="light" />
                    </section>
                }

                {(this.props.hash === '#hraedd') &&
                    <section className="hraEdd-section">
                      <Edd case={this.state.case} color="light" />
                    </section>
                }

                {(this.props.hash === '#qc-checklist') &&
                    <section className="qcChecklist-section">
                        <QcInformation case={this.state.case} color="light" />
                        <QcReview case={this.state.case} color="dark" />
                    </section>
                }

                {(this.props.hash === '#ous-entity') &&
                    <section className="ousEntity-section">
                      <Entity case={this.state.case} color="light" />
                    </section>
                }

                {(this.props.hash === '#mmb') &&
                    <section className="mmb-section">
                       <ManagedReportingAttributes case={this.state.case} color="light" />
                    </section>
                }   
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      focus: state.focus,
      loading: state.loading,
      hash: state.hash,
      statuses: state.sectionStatuses,
    };
  };

const mapDispachToProps = dispatch => { 
    return {
        onHashDetect: (hash) => dispatch({type:"HASH", value: hash}),
        onSectionStatusFill: (statuses) => dispatch({type:"STATUS_UPDATE", value: statuses})
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(Case);
