import React, { Component } from 'react';
import CaseService from '../CaseService';
import CaseStructure from '../structures/CaseStructure';
import { connect } from "react-redux";
const dateFormat = require('dateformat');


class Attachments extends Component {

    constructor(props) {
        super(props);
        this.caseService = new CaseService();
        this.caseStructure = new CaseStructure();
        
     }

    componentWillMount() {
       // this.fillData();
       this.setState({expanded: false});
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

    documentRow(){
        return this.props.attachments.map( function (doc, i){
            return <tr key={i}>
                <td><img className="svg-icon" alt={`Icon for ${doc.fileName}`} src={`/dist/svg/${doc.icon.toLowerCase()}.svg`}/></td>
                <td>{ doc.fileName}</td>
                <td>{ doc.fileType }</td>
                <td>{ doc.uploader }</td>
                <td>{ doc.comment }</td>
                <td>{ dateFormat(doc.date, 'mm-dd-yyyy') }</td>
            </tr>
        });
    }

    setExpanded(){
        this.setState({expanded:!(this.state.expanded)});
    }

    render() {
        let docMessage = "No Documents";
        if(this.props.attachments.length >= 1){
            docMessage = `${this.props.attachments.length} Document`;
        }
        if(this.props.attachments.length > 1){ 
            docMessage += 's';
        }
        let expandMessage = (this.state.expanded === true)?'Collapse Panel ( - )':'Expand Panel ( + )';
        let expandClass = (this.state.expanded === true)?'expanded':'collapsed';
        return (
          <div className="attachments box">
            <div className="box-header">
              <h3 className="box-title">Attachments - { docMessage }</h3>
              <div className="box-tools">
              {(this.props.attachments.length) > 3 &&
              <button className="btn btn-info pull-right" onClick={(e) => this.setExpanded(e)} > {expandMessage}</button> }

                <div className="input-group input-group-sm" style={{width: 150 + "px"}}>
                  <input type="text" name="table_search" className="form-control pull-right" placeholder="Search" />

                  <div className="input-group-btn">
                    <button type="submit" className="btn btn-default"><i className="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`box-body table-responsive no-padding ${expandClass}`}>
              <table className="table table-hover table-striped">
                <tbody>
                    <tr>
                        <th>Document Type</th>
                        <th>Filename</th>
                        <th>File Type</th>
                        <th>Uploader</th>
                        <th>Comments</th>
                        <th>Upload Date</th>
                    </tr>
                    { this.documentRow() }
                </tbody>
            </table>
        </div>
    </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
      statuses: state.sectionStatuses,
      hash: state.hash,
      attachments: state.attachments,
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
