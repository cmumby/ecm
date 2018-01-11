//Case.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
var Case = new Schema({
  desc: {
    ecmId: Number,
    assignee: ObjectId,
    type: String,
    name: String,
    status: String,
    notes: String,
    requirments: {
      attachments : Array,
      proxyRR: {
        registerdAddress:[{
          firstLine: String,
          secondLine: String,
          city: String,
          state: String,
          country: String,
          postalCode: Number,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        }],
        differentPhysical: Boolean,
      physicalAddress:[{
          firstLine: String,
          secondLine: String,
          city: String,
          state: String,
          country: String,
          postalCode: Number,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        }],
        legalEntity:{
          entityType: String,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        legalFormation:{
          countryOfRegistration: String,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        natureOfBusiness:{
          naics: String,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        marketsServed:{
          countries: Array,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        relatedParties:{
          anyForeignParties: Boolean,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        pep:{
          isPep: Boolean,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        productsAndServices:{
          currentProducts: Array,
          userProducts: Array,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        sectionComplete: Boolean
      }, // end ProxyRR
      cip{
        customerName:{
          legalName: Boolean,
          dbaName: String,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        taxOrGovernmentId:{
          IdType: String,
          id: Number,
          tinType: String,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        sectionComplete: Boolean
      }, // end cip
      remediation:{
        investmentVechiclesFunds:{
          isInvestment: Boolean,
          relatedEntityFunds: Boolean,
          secRiaNumber: Number,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        customerDetails:{
          organizationType: String,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        accountRelationship:{
          accountPurpose: String,
          accountType: String,
          attachments: Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        legalFormation:{
          stateOfRegistration: String,
          attachments: Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        customerStructure:{
          isPubliclyTraded: Boolean,
          attachments: Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        sourceOfWealth:{
          wealthSource: String,
          attachments: Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        generalDescriptionOfBusiness:{
          description: String,
          attachments: Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        sourceOfFunds:{
          wealthSource: String,
          attachments: Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        participationPurchased:{
          isPurchased: Boolean,
          attachments: Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        cipNotice:{
          noticeProvided: Boolean,
          attachments: Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        internetGambling:{
          isInternetGambling: Boolean,
          attachments: Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        prohibitedCustomers:{
          isMarijunaDistributor: Boolean,
          customerHasWarrents: Boolean,
          isNonUsMexicanCdc: Boolean,
          isUsOwnsMexicanCdc: Boolean,
          isShellBank: Boolean,
          isVirtualCurrencyExchange: Boolean,
          isThroughAccount: Boolean,
          isThirdPartyCheckCasher: Boolean,
          isPuipidTransactor: Boolean,
          isInternationalCurrencyShipper: Boolean,
          attachments: Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        relationshipManager:{
          rm: String,
          attachments: Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        cipCddApprovedDate:{
          date: Date,
          attachments: Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        submitter:{
          rm: String,
          attachments: Array,
          complete: Boolean
        },
        sectionComplete: Boolean
      }, // end remediation
      relatedParties:{
        relatedPartiesAuthorizedPersons:{
          anyNonUlimitmadeBo: Boolean,
          attachments: Array,
          complete: Boolean
        },
        relatedPartiesAuthorizedPersons:{
          anyNonUlimitmadeBo: Boolean,
          attachments: Array,
          complete: Boolean
        },
        beneficialOwner:[{
          isIndividual: Boolean,
          firstName: String,
          middleName: String,
          lastName: String,
          occupation: String,
          wcisRelatedPartyType: String,
          wcisId: Number,
          firstLine: String,
          secondLine: String,
          city: String,
          state: String,
          country: String,
          postalCode: Number,
          dateOfBirth: Date,
          idType: String,
          tin:, Number,
          tinType: String,
          countryOfIussuance: String,
          expirationDate: Date,
          domicile: String,
          CountryOfCitizenship: String,
          LegalEntityType: String,
          organizationType: String,
          relationshipType: String,
          beneficialOwnerType: String,
          stateOfRegistration: String,
          cddiTaskRequest: String,
          isPep: Boolean,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        }],
        sectionComplete: Boolean
      }, // end relatedParties
      screening:{
        ccdiTaskRequest:{
          taskRequest: String,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        screening:[{
          investagationId: String,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        }],
        screeningCustomer:[{
          pepScreening: Boolean,
          pepComments:String,
          bsaHotlistScreeining: Boolean,
          bsaHotlistComments: String,
          negativeNewsScreening: Boolean,
          negativeNewsComments:String,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        }],
        sectionComplete: Boolean
      }, // end screening
      documentation:{
        documentation:{
          formationDocuments: Boolean,
          evidenceOfFiling: Boolean,
          signedBoForm: Boolean,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        sectionComplete: Boolean
      },//end documentation
      transportationSarf:{
        transportationSarf{
          handlesSouthwestTrucks: Boolean,
          highRiskTransportation: Boolean,
          CountryOfCitizenship: String,
          attachments : Array,
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        sectionComplete: Boolean
      }, // end transportationSarf
    }, //end requirments
    research:{
      caseReasearch:{
        issueDescription: String,
        exceptionExemptionAndExit: String,
        lobResponse: String,
        wfcrcResponse: String
      }, //end caseReasearch
      dataQaulityExceptions:{
        exception: String
      },// end dataQaulityExceptions
      customerOutreachReasons:{
        reason: String,
        extension: String
      }, //end customerOutreachReasons
      financialInstitutionTracking:{
        crmsOverride: Boolean,
        fiIdentified: Boolean
      }, // end financialInstitutionTracking
      forProgramUseOnly:{
        disputeTo: String,
        dateDisupteRaised: Date,
        dateDisputeSettled: Date,
        dateOfDisposition: Date,
        artifactUploaded: Boolean,
        isSharedCustomer: Boolean
      }, // end forProgramUseOnly
    }, // end research
    history:{

    }// end history
  },

},{
    collection: 'Tasks'
});

module.exports = mongoose.model('TodoList', TodoList);
