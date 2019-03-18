import React, { Component } from 'react';
import CaseService from '../../CaseService';
import { connect } from "react-redux";
import createDocumentRows from './createDocumentRows';
import uploadDocumentForm from './uploadDocumentForm';

class Attachments extends Component {

  constructor(props) { 
      super(props);
      this.caseService = new CaseService();
  }

  componentWillMount() {
      this.setState({
        expanded: false,
        mode: 'display',
        upload: false,
        uploadType:0,
        uploadComment: '',
        alerts:[],
        markedItems: []
    });
  }

  setExpanded(){
      this.setState({expanded:!(this.state.expanded)});
  }

  setUpload(event){
      this.setState({upload:!(this.state.upload)});
  }

  setMode(event){
    this.setState({
      mode:(this.state.mode === 'display')?'edit':'display'
    });
    if(this.state.mode === 'display'){
      this.setState({"markedItems":[]});
    }
  }
  
  updateData(data) {
      this.caseService.updateAttachments(data, this.props.ecmId, (data) => {});
  }

  render() {
      let expandClass = (this.state.expanded === true)?'expanded':'collapsed';
      let expandIcon = (this.state.expanded === true)?'fa-compress':'fa-expand';
      let modeMessage = (this.state.mode === 'display')?'Edit Documents':'End Document Editing';
      let docMessage = "No Documents";
      
      if(this.props.attachments.length >= 1){
          docMessage = `${this.props.attachments.length} Document${(this.props.attachments.length > 1)?'s':''}`;
      }
    
      return (
        <div className="attachments box">
          <div className="box-header">
            <h3 className="box-title">Attachments - { docMessage }</h3>
            {(this.state.markedItems.length > 0 && this.state.mode === 'edit') &&  <h4><strong>Warning: </strong>{this.state.markedItems.length} item{(this.state.markedItems.length > 1) && 's'} Marked <span style={{'color':'#FFAAAA'}}><strong>RED</strong></span> will be PERMANENTLY DELETED once the corresponding <i className="fa fa-trash"/> icon is clicked.</h4>}
            <div className="box-tools">
            <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
              </button>
              
            {(this.props.attachments.length) > 3 &&
            <button type="button" onClick={(e) => this.setExpanded(e)} className="btn btn-box-tool" ><i className={`fa ${expandIcon}`}></i>
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
                  { createDocumentRows(this.state.mode, this.props.attachments, this) }
              </tbody>
          </table>
      </div>
      <div className="box-footer clearfix">
        <button  onClick={(e)=> this.setUpload(e)} className="btn btn-sm btn-info btn-flat pull-left">Add New Document</button>
        <button  onClick={(e)=> this.setMode(e)} className="btn btn-sm btn-default btn-flat pull-right">{ modeMessage }</button>
        <br/>
      </div>
      {(this.state.upload === true) && uploadDocumentForm(this.state.alerts, this.state.uploadType, this)}
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