import React, { Component } from 'react';
import CaseService from '../CaseService';
import CaseStructure from '../structures/CaseStructure';
import { connect } from "react-redux";
import Alerts from './Alerts';

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
        uploadType:0,
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

  /**  handles the from events for the upload dialog *
  * File input, File Type and File Comments
  **/
  handleUpload(event, name){
    if(name === 'select'){
        this.setState({
        selectedFile:event.target.files[0]
      });

    } else if (name === 'submit'){

        let stateAlerts = this.state.alerts;
        const ACCEPTED_FILE_TYPES = [
          "application/msword", //.doc
          "application/pdf",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xslx
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
          "image/jpeg",
          "image/png",
          "text/plain", //.txt
        ]

        const FILE_SIZE_LIMIT = 5000000;
            
        //Validations   
        if(!ACCEPTED_FILE_TYPES.includes(this.state.selectedFile.type )){
          stateAlerts.push({
            exclamation:'Document Format Not Supported',
            message:`Please upload a document with one of the following extensions: (.doc, .docx, .jpg, .pdf, .png, .txt, .xsl, .xslx )`,
            type: 'warning',
          });

          this.setState({
            alerts: this.state.alerts
          });
        }


        if(this.state.selectedFile.size > FILE_SIZE_LIMIT){
          stateAlerts.push({
            exclamation:'Document Too Large',
            message:`Please upload smaller document. The upload file size limit is 5MB.`,
            type: 'warning',
          });

          this.setState({
            alerts: this.state.alerts
          });
        }

        if(this.state.uploadType === 0 ){
          stateAlerts.push({
            exclamation:'Missing file type',
            message:`Please select a file type for the upload.`,
            type: 'warning',
          });

          this.setState({
            alerts: this.state.alerts
          });
        }
        
        if (this.fileInput.value === ''){
          stateAlerts.push({
            exclamation:'Missing File',
            message:`Please select a new file to upload to this case.`,
            type: 'warning',
          });

          this.setState({
            alerts: stateAlerts
          });
        }

        //Upload attempt if validations are cleared
        if(this.state.uploadType !== 0 && this.fileInput.value !== '' ){
          this.caseService.upload(this.state.selectedFile, (data) => {
            if(data.statusText === "OK"){
              const newFileNameParts = data.data.file.split('/');
              const newFileName = newFileNameParts[(newFileNameParts.length - 1)];
              let newAlertState = this.state.alerts;
              
              newAlertState.push({
                exclamation:'Success!',
                message:`${newFileName} has been added to this case.`,
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
  }

  //send the updated case attachment list to the database
  updateData(data) {
      this.caseService.updateAttachments(data, this.props.ecmId, (data) => {});
  }
  
  //handle state changes in upload form.
  updateForm = (event, name, key=0) => {
    if(name === 'comments'){
      this.props.attachments[key].comment = event.target.value;
    }

    //file type per item in attachment list
    if(name === 'edit-fileType'){
      this.props.attachments[key].fileType = event.target.value;
    }

    // file type of new document upload
    if(name === 'upload-fileType'){
     this.setState({
       uploadType:(event.target.value === "0")? Number(event.target.value) : event.target.value 
      });
    }

    //Mark for deletion if trash icon is clicked. Delete if item is marked.
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

    if(name !== 'upload-fileType') {this.setState({mode:'edit'}) };
    this.props.onAttachmentsFill(this.props.attachments);
    this.updateData(this.props.attachments);
  }
  
  //COMPONENT RENDERING 
  getFileTypeOptions(current=false,index=0, type='edit'){
    const fileTypeOptions = [
      'Formation Documents - SOS Documentation',
      'Benficial Ownership Form',
      'Banker Files - StoreVision',
      'Screening Report',
      'Formation Documents - Articles of Organization',
      'Customer Due Dillegence - HRA FORM',
      'Customer Due Dillegence - RM Response',
    ];

    

    return <select onChange={(e) => this.updateForm(e, `${type}-fileType`, index )}  className="form-control" value={current}>
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
            <td>{thisRef.getFileTypeOptions(doc.fileType, i,'edit')  }</td>
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

  uploadForm(){ 
      return <div id="upload-form" className="box">
              {(this.state.alerts.length !== 0) && 
                <Alerts alerts={this.state.alerts} />
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
                        {this.getFileTypeOptions(this.state.uploadType,0,'upload')}
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
        <button  onClick={(e)=> this.setUpload(e)} className="btn btn-sm btn-info btn-flat pull-left">Add New Document</button>
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