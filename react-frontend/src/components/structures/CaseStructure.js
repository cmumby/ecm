export default class CaseStructure {
    getStructure(){
        return ({
            case: {
                requirement: {
                    proxyRR: {
                        registeredAddress: {
                            firstLine: "",
                            secondLine: "",
                            city: "",
                            state: "",
                            country:"",
                            postalCode:"",
                            comments:"",
                            raCorrectionRequired:Boolean
                        },
                        physicalAddress:[
                            {
                                firstLine: "",
                                secondLine: "",
                                city: "",
                                state: "",
                                country:"",
                                postalCode:"",
                                comments:"",
                                raCorrectionRequired:Boolean
                            }
                        ],
                        legalEntity:{
                            
                        },
                        legalFormation:{
                            
                        },
                        natureOfBusiness:{
                            naics:Number
                        },
                        marketsServed:{

                        },
                        relatedParties:{
                            
                        },
                        pep:{

                        },
                        productsAndServices:{

                        }
                    }
                }
            }
        });
    }  
}