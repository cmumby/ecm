
import React from 'react';
import updateForm from './updateForm';

export default function fileTypeOptions(current=false,index=0, type='edit', _this={}){
    const fileTypeOptions = [
      'Formation Documents - SOS Documentation',
      'Benficial Ownership Form',
      'Banker Files - StoreVision',
      'Screening Report',
      'Formation Documents - Articles of Organization',
      'Customer Due Dillegence - HRA FORM',
      'Customer Due Dillegence - RM Response',
      'Taxation Documents - W9 Form'
    ];

    

    return <select onChange={(e) => updateForm(e, `${type}-fileType`, index, _this)}  className="form-control" value={current}>
              <option  value="0" >Select a File Type</option>
              {fileTypeOptions.map((option, index) =>

                  <option  key={index} value={option} >{option}</option>
              )}
          </select>
  }