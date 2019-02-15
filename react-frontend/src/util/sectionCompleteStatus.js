export default function  sectionCompletStatus(id, data) {
    let incompleteCount = 0; 
    let atLeastOneFalse = false;
    
    if(data.sectionComplete === true){
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
        Object.keys(data).forEach(function(key,index){   
            if(key !==  'sectionComplete'){
                if(data[key].complete === false || (  key === "physicalAddress"  && data[key][0].complete === false ) ) {
                    incompleteCount++;
                }
            }  
        });
        if(incompleteCount === 0){
            data.sectionComplete = true;
        } 
    }

    return data.sectionComplete;
}