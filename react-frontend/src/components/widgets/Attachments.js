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
            <div className="box">
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
              <table className="table table-hover">
                <tbody><tr>
                  <th>File Type</th>
                  <th>Filename</th>
                  <th>Uploader</th>
                  <th>Comments</th>
                  <th>Reason</th>
                </tr>
                <tr>
                  <td><img src="/dist/svg/pdf.svg"/></td>
                  <td>John Doe</td>
                  <td>11-7-2014</td>
                  <td><span className="label label-success">Approved</span></td>
                  <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                </tr>
                <tr>
                  <td><img src="/dist/svg/pdf.svg"/></td>
                  <td>Alexander Pierce</td>
                  <td>11-7-2014</td>
                  <td><span className="label label-warning">Pending</span></td>
                  <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                </tr>
                <tr>
                  <td><img src="/dist/svg/doc.svg"/></td>
                  <td>John Doe</td>
                  <td>11-7-2014</td>
                  <td><span className="label label-primary">Approved</span></td>
                  <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                </tr>
                <tr>
                  <td><img src="/dist/svg/png.svg"/></td>
                  <td>Mike Doe</td>
                  <td>11-7-2014</td>
                  <td><span className="label label-danger">Denied</span></td>
                  <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
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
