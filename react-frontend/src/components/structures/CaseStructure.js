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
                    },
                    cip: {
                        customerName:{
                            legalName: "",
                            dbaName: "",
                        },
                        taxOrGovernmentId:{
                            id: "",
                        } 
                    },
                    remediation:{
                        investmentVechiclesFunds:{
                            secRiaNumber: ""
                        },
                        customerDetails:{

                        },
                        accountRelationship:{

                        },
                        legalFormation:{
                            
                        },
                        customerStructure:{

                        },
                        sourceOfWealth:{

                        },
                        generalDescriptionOfBusiness:{

                        },
                        sourceOfFunds:{

                        },
                        participationPurchased:{

                        },
                        cipNotice:{

                        },
                        internetGambling:{

                        },
                        prohibitedCustomers:{

                        },
                        relationshipManager:{

                        },
                        cipCddApprovedDate:{

                        },
                        submitter:{

                        }
                    },
                    relatedParties:{
                        relatedPartiesAuthorizedPersons:{
                            
                        },
                        controlProngs:{
                            beneficialOwners:[]

                        }
                    },
                    screening:{
                        cddiTaskRequest:{
                            
                        },
                        reports:{

                        },
                        screeningCustomer:{
                            
                        },
                        screeningParty:{

                        }
                    },
                    documentation:{
                        requiredDocuments:{
                            
                        }
                    },
                    transportationSarf:{
                        sarf:{
                            
                        }
                    },
                    hraEdd:{
                        edd:{

                        }
                    },
                    qcChecklist:{
                        qcInformation:{

                        },
                        qcReview:{
                            
                        }
                    }
                }
            }
        });
    }  
}