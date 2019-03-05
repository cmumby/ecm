import React, { Component } from 'react';
import CaseService from '../CaseService';
import CaseStructure from '../structures/CaseStructure';
import { connect } from "react-redux";
const dateFormat = require('dateformat');


class Attachments extends Component {
  //EVENTS
  constructor(props) {
      super(props);
      this.caseService = new CaseService();
      this.caseStructure = new CaseStructure();
      
    }

  componentWillMount() {
      this.setState({
        expanded: false,
        mode: 'display',
        upload: false,
        alerts:[]
    });
    this.setState({"markedItems":[]})
  }
  
  //STATE ALTERATIONS
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
     // this.setState({ mode:'display'});
    }
  }
  
  //FORM OPERATIONS
  handleUpload(event, name){
    if(name === 'select'){
        this.setState({
        selectedFile:event.target.files[0]
      });
    } else if (name === 'submit'){
        this.caseService.upload(this.state.selectedFile, (data) => {
          console.log("after", data);
          if(data.statusText === "OK"){
            let newAlertState = this.state.alerts;
            
            newAlertState.push({
              exclamation:'Success!',
              message:`${this.state.selectedFile.name} has been added to this case.`,
              type: 'success',
            });

            this.setState({
              alerts:newAlertState,
              selectedFile: null,
            });
            this.fileInput.value = "";
            

          }
        }); 
    }
      
  }

  updateData(data) {
      this.caseService.updateAttachments(data, this.props.ecmId, (data) => {});
  }

  updateForm = (event, name, key=0) => {
    if(name === 'comments'){
      this.props.attachments[key].comment = event.target.value;
    }

    if(name === 'fileType'){
      this.props.attachments[key].fileType = event.target.value;
    }

    if(name === 'delete'){ 
      if(event.target.value === true){ 
        this.props.attachments.splice(key,1);
      }
      if(event.target.value !== true){
        let newMakredItems = this.state.markedItems.concat(key);
        this.setState({'markedItems':newMakredItems});
        
        event.target.value = true;
      }
    }

    this.setState({mode:'edit'});
    this.props.onAttachmentsFill(this.props.attachments);
    this.updateData(this.props.attachments);
  }
  
  //COMPONENT RENDERING 
  getFileTypeOptions(current=false,index=0){
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
              <option  value="0" >Select an File Type</option>
              {fileTypeOptions.map((option, index) =>

                  <option  key={index} value={option} >{option}</option>
              )}
          </select>
  }

  createDocumentRows(mode){ 
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
        return <tr key={i} className={(thisRef.state.markedItems.includes(i))?'marked':''}>
            <td><img className="svg-icon" alt={`Icon for ${doc.fileName}`} src={`/dist/svg/${doc.icon.toLowerCase()}.svg`}/></td>
            <td>{ doc.fileName}</td>
            <td>{thisRef.getFileTypeOptions(doc.fileType, i)  }</td>
            <td>{ doc.uploader }</td>
            <td>
              <textarea onChange={(e) => thisRef.updateForm(e, 'comments', i )} className="form-control" rows="1" placeholder="" value={ doc.comment }></textarea>
            </td>
            <td>{ dateFormat(doc.date, 'mm-dd-yyyy') }</td>
            <td><button onClick={(e) => thisRef.updateForm(e, 'delete', i )} className="btn btn-danger" value={false}><i className="fa fa-trash" style={{'color':'white'}}></i></button></td>
        </tr>
      });
    }
      
  }

  writeAlerts(){
    
    return this.state.alerts.map( function (alert, i){
      let boxColor = "green";
      switch(alert.type){
        case 'success':
          boxColor = "green"
          break;
        case 'failure':
          boxColor = "red"
          break;
        default:
          boxColor = "green";
      }

      return <div key={i} className={`small-box bg-${boxColor}`}>
              <div className="inner">
                <h3>{alert.exclamation}</h3>
                    <p>{alert.message}</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-checkmark"></i>
                  </div>
                <a className="small-box-footer">Close Alert <i className="fa fa-close"></i></a>
              </div>
      });
  }

  uploadForm(){
      return <div id="upload-form" className="box">
            {(this.state.alerts.length > 0) && 
              this.writeAlerts()
            }
              <div className="box-header">
                  <h3 className="box-title">Upload a new Document</h3>
              </div>
              <div className="proxyrr box-body">
                  <div className="form-group">
                      <label htmlFor="exampleInputFile">File input</label>
                      <input onChange={(e) => this.handleUpload(e,'select')} type="file" ref={ref=> this.fileInput = ref} id="exampleInputFile" />

                      <p className="help-block">Select a document to upload to this case.</p>
                  </div>
                  <div className="form-group">
                      <label htmlFor="exampleInputFile">File Type</label>
                      {this.getFileTypeOptions()}
                  </div>
                  <div className="form-group">
                      <label htmlFor="exampleInputFile">File Comments</label>
                      <p className="help-block">Add comments to help describe this document.</p>
                      <textarea className="form-control" rows="3" placeholder="" ></textarea>
                  </div>
                  <button onClick={(e) => this.handleUpload(e,'submit')} className="btn btn-sm btn-info btn-flat pull-left">Submit and Upload</button>
                  <button onClick={(e) => this.setUpload(e)} className="btn btn-sm btn-danger btn-flat pull-right">Close Dialog</button>
              </div>
              </div>
  }

  render() {
      let expandClass = (this.state.expanded === true)?'expanded':'collapsed';
      let expandIcon = (this.state.expanded === true)?'fa-compress':'fa-expand';
      let modeMessage = (this.state.mode === 'display')?'Edit Documents':'End Document Editing';
      
      let docMessage = "No Documents";
      
      if(this.props.attachments.length >= 1){
          docMessage = `${this.props.attachments.length} Document`;
      }
      
      if(this.props.attachments.length > 1){ 
          docMessage += 's';
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
                  { this.createDocumentRows(this.state.mode) }
              </tbody>
          </table>
      </div>
      <div className="box-footer clearfix">
        <button  onClick={(e)=> this.setUpload(e)} className="btn btn-sm btn-info btn-flat pull-left">Upload New Document</button>
        <button  onClick={(e)=> this.setMode(e)} className="btn btn-sm btn-default btn-flat pull-right">{ modeMessage }</button>
        <br/>
      </div>
      {(this.state.upload === true) && this.uploadForm()}
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