const initialState = {
    hash: window.location.hash,
    sectionStatuses: {}, 
}; 

const reducer = (state=initialState, action) => {
    const newState = {...state};
    
    switch(action.type){
        case 'PROXY_RR':
            newState.focus = '#proxyrr';
            break;
        case 'CIP': 
            newState.focus = '#cip';
            break;
        case 'REMEDIATION':
            newState.focus = "#remediation";
            break;
        case 'RELATED_PARTIES':
            newState.focus = "#related-parties";
            break;
        case 'SCREENING':
            newState.focus = "#screening";
            break;
        case 'DOCUMENTATION':
            newState.focus = "#documentation";
            break;
        case 'TRANSPORTATION_SARF':
            newState.focus = "#transportation-sarf";
            break;
        case 'HRA_EDD':
            newState.focus = "#hraedd";
            break;
        case 'QC_CHECKLIST':
            newState.focus = "#qc-checklist";
            break;
        case 'OUS_ENTITY':
            newState.focus = "#ous-entity";
            break;
        case 'MMB':
            newState.focus = "#mmb";
            break;   
        case 'HASH':
            newState.hash = action.value;
            break;
        case 'STATUS_UPDATE':
            newState.sectionStatuses = action.value;
            break;
        default:
            newState.focus = "#proxyrr";
    }

    return newState;
};

export default reducer;