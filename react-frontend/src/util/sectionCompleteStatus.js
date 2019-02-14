import CaseService from '../components/CaseService';

export default function  sectionCompletStatus(id, data) {
    let statusChange = false;
    
    let caseService = new CaseService();
    
    if(data.sectionComplete === true){
        let atLeastOneFalse = false;
        Object.keys(data).forEach(function(key,index){   
            if(key !==  'sectionComplete'){
                if(data[key].complete === false || (  key === "physicalAddress"  && data[key][0].complete === false ) ) {
                    atLeastOneFalse = true;
                }
            }
            
        });

        if(atLeastOneFalse === true){
            data.sectionComplete = false;
        }
    } else if(data.sectionComplete === false){
        let incompleteCount = 0;
        Object.keys(data).forEach(function(key,index){   
            if(key !==  'sectionComplete'){
                if(data[key].complete === false || (  key === "physicalAddress"  && data[key][0].complete === false ) ) {
                   incompleteCount ++;
                }
            }
            
        });
        if(incompleteCount == 0){
            data.sectionComplete = true;
        } 
    }

    
    caseService.update(data, id, (data) => {});
    
    //if (statusChange === true){
       // caseService.update(data, id, (data) => {});
    //}

    return statusChange;
}