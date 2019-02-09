import CaseService from '../components/CaseService';

export default function  sectionCompletStatus(id, data) {
    let statusChange = false;
    let atLeastOneFalse = false;
    let caseService = new CaseService();
    Object.keys(data).forEach(function(key,index){
       
        if(key !==  'sectionComplete'){
            console.log('KEY:', key);
            console.log('section case', data[key] );
            if(data[key].complete === false){
                //Section Complete change from true to false 
                if(data.sectionComplete === true){
                    statusChange = true;
                    atLeastOneFalse = true;
                    data.sectionComplete = false;

                }  
            }
        }
    });
    
    //Section Complete change false true to true 
    if(atLeastOneFalse === false) {
        data.sectionComplete = true;
        statusChange = true
    }

    if (statusChange === true){
        caseService.update(data, id, (data) => {});
    }
    console.log('EOD', data)
}