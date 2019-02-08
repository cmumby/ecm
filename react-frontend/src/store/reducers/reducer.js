const initialState = {
    focus:'proxyRR'
};

const reducer = (state=initialState, action) => {
    const newState = {...state};

    switch(action.type){
        case 'PROXY_RR':
            newState.focus = 'proxyRR';
            newState.loading = false;
            break;
        case 'CIP': 
            newState.focus = 'cip';
            break;
        case 'REMEDIATION':
            newState.focus = "remediation";
            break;
        default:
            newState.focus = "proxyRR";
    }

    return newState;
};

export default reducer;