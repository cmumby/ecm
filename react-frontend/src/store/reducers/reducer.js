const initialState = {
    hash: (window.location.hash !=="") ? window.location.hash: '#proxyrr',
    sectionStatuses: {},
    attachments:[],
    ecmId: null
}; 

const reducer = (state=initialState, action) => {
    const newState = {...state};
    switch(action.type){
        case 'HASH':
            newState.hash = action.value;
            break;
        case 'STATUS_UPDATE':
            newState.sectionStatuses = action.value;
            break;
        case 'ATTACHMENT_LOAD':
            newState.attachments = action.value;
            break;
        case 'CASE_FOCUS':
            newState.ecmId = action.value;
            break;
        default:
            newState.hash = "#proxyrr";
    }

    return newState;
};

export default reducer;