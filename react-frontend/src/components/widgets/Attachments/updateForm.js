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
      if(event.target.value === true){ 
        _this.props.attachments.splice(key,1);
      }
      if(event.target.value !== true){
        let newMakredItems = _this.state.markedItems.concat(key);
        _this.setState({'markedItems':newMakredItems});
        
        event.target.value = true;
      }
    }

    if(name !== 'upload-fileType') {_this.setState({mode:'edit'}) };
    _this.props.onAttachmentsFill(_this.props.attachments);
    _this.updateData(_this.props.attachments);
  }