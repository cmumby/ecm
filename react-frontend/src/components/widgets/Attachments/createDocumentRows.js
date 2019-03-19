import React from 'react';
import updateForm from './updateForm';
import fileTypeOptions from './fileTypeOptions';
import createImageLink from '../../../util/createImageLink';

const dateFormat = require('dateformat');

export default function createDocumentRows(mode, attachments, _this={}){ 
    if(mode === 'display'){
      return attachments.map( function (doc, i){
        return <tr key={i}>
            <td><a href={`${createImageLink(doc.filePath)}`} target="_blank"><img className="svg-icon" alt={`Icon for ${doc.fileName}`} src={`/dist/svg/${doc.icon.toLowerCase()}.svg`}/></a></td>
            <td>{ doc.fileName}</td>
            <td>{ doc.fileType }</td>
            <td>{ doc.uploader }</td>
            <td>{ doc.comment }</td>
            <td>{ dateFormat(doc.date, 'mm-dd-yyyy') }</td>
        </tr>
      });
    } else if (mode === 'edit'){ 
      const thisRef = _this;
      return _this.props.attachments.map( function (doc, i){
        return <tr key={i} className={(thisRef.state.markedItems.includes(i))?'marked':''}>
            <td><img className="svg-icon" alt={`Icon for ${doc.fileName}`} src={`/dist/svg/${doc.icon.toLowerCase()}.svg`}/></td>
            <td>{ doc.fileName}</td>
            <td>{fileTypeOptions(doc.fileType, i,'edit', _this)  }</td>
            <td>{ doc.uploader }</td>
            <td>
              <textarea onChange={(e) => updateForm(e, 'comments', i, _this )} className="form-control" rows="1" placeholder="" value={ doc.comment }></textarea>
            </td>
            <td>{ dateFormat(doc.date, 'mm-dd-yyyy') }</td>
            <td><button onClick={(e) => updateForm(e, 'delete', i, _this )} className="btn btn-danger" value={false}><i className="fa fa-trash" style={{'color':'white'}}></i></button></td>
        </tr>
      });
    }  
  }