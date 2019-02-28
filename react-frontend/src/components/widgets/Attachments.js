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
       this.setState({
         expanded: false,
         mode: 'display'
      });
    }

    fillData() { 
        var thisRef = this;
        this.caseService.get(this.props.match.params.ecmId, (data) => {
            this.caseData = data;
            thisRef.setState({ case: data });
        })
    }
   
    updateData(data) {
       //var thisRef = this;
       this.caseService.updateAttachments(data, this.props.ecmId, (data) => {
           // this.caseData = data;
           // thisRef.setState({ case: data });
        })
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

    updateForm = (event, name, key=0) => { 
      if(name === 'comments'){
        this.props.attachments[key].comment = event.target.value;
      }

      if(name === 'fileType'){
        this.props.attachments[key].fileType = event.target.value;
      }

      if(name === 'comments' || name === 'fileType'){
        this.setState({expanded:'edit'});
        this.props.onAttachmentsFill(this.props.attachments);
        this.updateData(this.props.attachments);
      }
      
    }

    documentRow(mode){
      if(mode === 'display'){
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
      } else if (mode === 'edit'){ 
        const thisRef = this;
        return this.props.attachments.map( function (doc, i){
          return <tr key={i}>
              <td><img className="svg-icon" alt={`Icon for ${doc.fileName}`} src={`/dist/svg/${doc.icon.toLowerCase()}.svg`}/></td>
              <td>{ doc.fileName}</td>
              <td>{thisRef.getFileTypeOptions(doc.fileType, i)  }</td>
              <td>{ doc.uploader }</td>
              <td>
                <textarea onChange={(e) => thisRef.updateForm(e, 'comments', i )} className="form-control" rows="3" placeholder="" value={ doc.comment }></textarea>
              </td>
              <td>{ dateFormat(doc.date, 'mm-dd-yyyy') }</td>
              <td><button className="btn btn-danger" href="#"><i className="fa fa-trash" style={{'color':'white'}}></i></button></td>
          </tr>
        });
      }
        
    }

    getFileTypeOptions(current,index=0){
      const fileTypeOptions = [
        'Formation Documents - SOS Documentation',
        'Benficial Ownership Form',
        'Banker Files - StoreVision',
        'Screening Report',
        'Formation Documents - Articles of Organization',
        'Customer Due Dillegence - HRA FORM',
        'Customer Due Dillegence - RM Response',
      ];

     
        return <select onChange={(e) => this.updateForm(e, 'fileType', index )} className="form-control" value={current}>
                  {fileTypeOptions.map((option, index) =>

                      <option  key={index} value={option} >{option}</option>
                  )}
              </select>

      
    }

    setExpanded(){
        this.setState({expanded:!(this.state.expanded)});
    }

    setMode(event){
      this.setState({
        mode:(this.state.mode === 'display')?'edit':'display'
      });
    }

    render() {
        let docMessage = "No Documents";
        if(this.props.attachments.length >= 1){
            docMessage = `${this.props.attachments.length} Document`;
        }
        if(this.props.attachments.length > 1){ 
            docMessage += 's';
        }
        let expandClass = (this.state.expanded === true)?'expanded':'collapsed';
        let modeMessage = (this.state.mode === 'display')?'Edit Documents':'End Document Editing';
        return (
          <div className="attachments box">
            <div className="box-header">
              <h3 className="box-title">Attachments - { docMessage }</h3>
              <div className="box-tools">
              <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                </button>
                
              {(this.props.attachments.length) > 3 &&
             <button type="button" onClick={(e) => this.setExpanded(e)} className="btn btn-box-tool" ><i className="fa fa-expand"></i>
             </button>}

               
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
                        {(this.state.mode === 'edit') &&
                        <th>Action</th>
                        }
                    </tr>
                    { this.documentRow(this.state.mode) }
                </tbody>
            </table>
        </div>
        <div className="box-footer clearfix">
          <button  className="btn btn-sm btn-info btn-flat pull-left">Upload New Document</button>
          <button  onClick={(e)=>this.setMode(e)} className="btn btn-sm btn-default btn-flat pull-right">{ modeMessage }</button>
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
      ecmId: state.ecmId,
    };
  };
  
  const mapDispachToProps = dispatch => {
    return {
        onHashDetect: (hash) => dispatch({type: "HASH", value: hash}),
        onAttachmentsFill: (attachments) => dispatch({type:"ATTACHMENT_LOAD", value: attachments})
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(Attachments);