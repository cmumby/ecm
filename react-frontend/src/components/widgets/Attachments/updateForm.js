 //handle state changes in upload form.
 export default function updateForm (event, name, key=0, _this={}) { 

    if(name === 'comments'){
      _this.props.attachments[key].comment = event.target.value;
    }

    //file type per item in attachment list
    if(name === 'edit-fileType'){
      _this.props.attachments[key].fileType = event.target.value;
    }

    // file type of new document upload
    if(name === 'upload-fileType'){
     _this.setState({
       uploadType:(event.target.value === "0")? Number(event.target.value) : event.target.value 
      });
    }

    //Mark for deletion if trash icon is clicked. Delete if item is marked.
    if(name === 'delete'){
      
     let deletionData = {
        id: _this.props.ecmId,
        filePath: _this.props.attachments[key].filePath,
      }
      //If Item is red marked delete item from db, store and filesystem
      if(_this.state.markedItems.includes(key)){ 
        let removeMarked =  _this.state.markedItems.indexOf(key);
        
        if(removeMarked > -1){ 
          _this.state.markedItems.splice(removeMarked,1);
        }
        _this.props.attachments.splice(key,1);
       
        _this.caseService.deleteAttachment(deletionData, (data) => {
  
          if(data.statusText === "OK"){ console.log('THISISISS', _this.props)
            _this.props.onAttachmentsFill(_this.props.attachments); // update attachment store
            _this.updateData(_this.props.attachments); // update attachments database
            _this.setState({mode:'edit'});
          }
        }); //delete file from filesystem

      //If Item is not marked then add to the items marked for deletion 
      } else if(!_this.state.markedItems.includes(key)){
        let newMakredItems = _this.state.markedItems.concat(key);
        _this.setState({'markedItems':newMakredItems});
        event.target.value = true;
      }
    }

    if(name !== 'upload-fileType' && name !== 'delete') {_this.setState({mode:'edit'}) };
    _this.props.onAttachmentsFill(_this.props.attachments); // update attachment store
    _this.updateData(_this.props.attachments); // update attachments database
  }