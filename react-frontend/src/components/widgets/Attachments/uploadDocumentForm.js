import React from 'react';
import handleUpload from './handleUpload';
import fileTypeOptions from './fileTypeOptions';
import Alerts from '../Alerts';

export default function uploadDocumentForm(alerts, uploadType, _this={}){

  return <div id="upload-form" className="box">
          {(alerts !== 0) && 
            <Alerts alerts={alerts} />
          }
            <div className="box-header">
                <h3 className="box-title">Upload a new Document</h3>
            </div>
            <div className="proxyrr box-body">
                <div className="form-group">
                    <label htmlFor="exampleInputFile">File input</label>
                    <input onChange={(e) => handleUpload(e,'select',  _this)} type="file" ref={ref=> _this.fileInput = ref} id="exampleInputFile" />

                    <p className="help-block">Select a document to upload to this case.</p>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputFile">File Type</label>
                    {fileTypeOptions(uploadType,0,'upload', _this)}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputFile">File Comments</label>
                    <p className="help-block">Add comments to help describe this document.</p>
                    <textarea onChange={(e) => handleUpload(e,'comment', _this)} className="form-control" rows="3" placeholder="" value={_this.state.uploadComment}></textarea>
                </div>
                <button onClick={(e) => handleUpload(e,'submit', _this)} className="btn btn-sm btn-info btn-flat pull-left">Submit and Upload</button>
                <button onClick={(e) => _this.setUpload(e)} className="btn btn-sm btn-danger btn-flat pull-right">Close Dialog</button>
            </div>
          </div>
}