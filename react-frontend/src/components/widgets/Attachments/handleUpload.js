import getAcceptedFileTypes from '../../../util/getAcceptedFileTypes';

export default function handleUpload(event, name, _this={} ){
    let attemptUpload = true;
    if(name === 'select'){
        _this.setState({
        selectedFile:event.target.files[0]
      });

    } else if (name === 'submit'){
        let stateAlerts = _this.state.alerts;
        const ACCEPTED_FILE_TYPES = getAcceptedFileTypes();
        const FILE_SIZE_LIMIT = 5000000;
            
        //Validations   
        if(_this.state.hasOwnProperty('selectedFile') && !ACCEPTED_FILE_TYPES.includes(_this.state.selectedFile.type )){
          stateAlerts.push({
            exclamation:'Document Format Not Supported',
            message:`Please upload a document with one of the following extensions: (.doc, .docx, .jpg, .pdf, .png, .txt, .xsl, .xslx )`,
            type: 'warning',
          });

          _this.setState({
            alerts: _this.state.alerts
          });
          attemptUpload = false;
        }


        if(_this.state.hasOwnProperty('selectedFile') && _this.state.selectedFile.size > FILE_SIZE_LIMIT){
          stateAlerts.push({
            exclamation:'Document Too Large',
            message:`Please upload smaller document. The upload file size limit is 5MB.`,
            type: 'warning',
          });

          _this.setState({
            alerts: _this.state.alerts
          });
          attemptUpload = false;
        }

        if(_this.state.uploadType === 0 ){
          stateAlerts.push({
            exclamation:'Missing file type',
            message:`Please select a file type for the upload.`,
            type: 'warning',
          });

          _this.setState({
            alerts: _this.state.alerts
          });
          attemptUpload = false;
        }
        
        if (_this.fileInput.value === ''){
          stateAlerts.push({
            exclamation:'Missing File',
            message:`Please select a new file to upload to this case.`,
            type: 'warning',
          });

          _this.setState({
            alerts: stateAlerts
          });
          attemptUpload = false;
        }

        //Upload attempt if validations are cleared
        if(attemptUpload === true){
          _this.caseService.upload(_this.state.selectedFile, (data) => {
            if(data.statusText === "OK"){
              const newFileNameParts = data.data.file.split('/');
              const newFileName = newFileNameParts[(newFileNameParts.length - 1)];
              let newAlertState = _this.state.alerts;
              
              newAlertState.push({
                exclamation:'Success!',
                message:`${newFileName} has been added to this case.`,
                type: 'success',
              });
  
              _this.setState({
                alerts:newAlertState,
                selectedFile: null,
              });
              _this.fileInput.value = "";
            }
          }); 
        }
    }    
  }