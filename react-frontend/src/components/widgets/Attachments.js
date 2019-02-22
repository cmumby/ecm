import React, { Component } from 'react';
import CaseService from '../CaseService';
import CaseStructure from '../structures/CaseStructure';
import { connect } from "react-redux";


class Attachments extends Component {

    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
     }

    componentWillMount() {
       // this.fillData();
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
    }

    render() {
        
        return (
          <div className="attachments box">
            <div className="box-header">
              <h3 className="box-title">Attachments</h3>

              <div className="box-tools">
                <div className="input-group input-group-sm" style={{width: 150 + "px"}}>
                  <input type="text" name="table_search" className="form-control pull-right" placeholder="Search" />

                  <div className="input-group-btn">
                    <button type="submit" className="btn btn-default"><i className="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-body table-responsive no-padding">
              <table className="table table-hover table-striped">
                <tbody><tr>
                  <th>Document Type</th>
                  <th>Filename</th>
                  <th>File Type</th>
                  <th>Uploader</th>
                  <th>Comments</th>
                  <th>Upload Date</th>
                </tr>
                <tr>
                  <td><img className="svg-icon" src="/dist/svg/pdf.svg"/></td>
                  <td>CASE_SOS_FORM</td>
                  <td>Formation Documents - SOS Documentation</td>
                  <td>u616323</td>
                  <td>Secutary of State Customer Information</td>
                  <td>2-21-2019</td>
                </tr>
                <tr>
                  <td><img className="svg-icon" src="/dist/svg/pdf.svg"/></td>
                  <td>CASE_AOC_DOC</td>
                  <td>Formation Documents - Articles of Incorporation</td>
                  <td>u616323</td>
                  <td>Customer Articles of Incorporation Information</td>
                  <td>2-21-2019</td>
                </tr>
                <tr>
                  <td><img className="svg-icon" src="/dist/svg/doc.svg"/></td>
                  <td>CASE_RM_RESPONSE</td>
                  <td>Customer Due Diligence - RM Response</td>
                  <td>u616323</td>
                  <td>RM Repsonse from RFI Request</td>
                  <td>2-21-2019</td>
                </tr>
                <tr>
                  <td><img className="svg-icon" src="/dist/svg/png.svg"/></td>
                  <td>CASE_SVP_IMAGE</td>
                  <td>Customer Due Diligence -StoreVision Proile</td>
                  <td>u616323</td>
                  <td>SVP Profile for Customer</td>
                  <td>2-21-2019</td>
                </tr>
              </tbody></table>
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
  )(Attachments);
