//Case.js

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ProxyRR = require("./proxyRR/ProxyRR");
var Cip = require("./cip/Cip");
var Remediation = require("./remediation/Remediation");
var RelatedParties = require("./related-parties/RelatedParties");
var Screening = require("./screening/Screening");
var Documentation = require("./documentation/Documentation");
var TransportationSarf = require("./transportationSarf/TransportationSarf");
var HraEdd = require("./hraedd/HraEdd");
var QcChecklist = require("./qcchecklist/QcChecklist");

//schema
var Requirement = new Schema({
  proxyRR: ProxyRR,
  cip: Cip,
  remediation: Remediation,
  relatedParties: RelatedParties,
  screening: Screening,
  documentation: Documentation,
  transportationSarf: TransportationSarf,
  hraEdd: HraEdd,
  qcChecklist: QcChecklist
});


/*
var Case = new Schema({
  desc: {
    ecmId: Number,
    assignee: String,
    type: String,
    name: String,
    status: String,
    notes: String,
    requirments: {
      attachments : [{
                      icon: String,
                      fileName: String,
                      filePath: String,
                      fileType: String,
                      uploader: String,
                      section: String,
                      comment: String
                    }],
      proxyRR: {
        registerdAddress:[{
          firstLine:String,
          secondLine: String,
          city: String,
          state: String,
          country: String,
          postalCode: Number,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
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
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        }],
        legalEntity:{
          entityType: String,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        legalFormation:{
          countryOfRegistration: String,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        natureOfBusiness:{
          naics: String,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        marketsServed:{
          countries: Array,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        relatedParties:{
          anyForeignParties: Boolean,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        pep:{
          isPep: Boolean,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        productsAndServices:{
          currentProducts: Array,
          userProducts: Array,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        sectionComplete: Boolean
      }, // end ProxyRR
      cip:{
        customerName:{
          legalName: Boolean,
          dbaName: String,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        taxOrGovernmentId:{
          IdType: String,
          id: Number,
          tinType: String,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
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
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        customerDetails:{
          organizationType: String,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
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
          tin: Number,
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
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        }],
        sectionComplete: Boolean
      }, // end relatedParties
      screening:{
        ccdiTaskRequest:{
          taskRequest: String,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        screening:[{
          investagationId: String,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
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
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
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
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        sectionComplete: Boolean
      },//end documentation
      transportationSarf:{
        transportationSarf:{
          handlesSouthwestTrucks: Boolean,
          highRiskTransportation: Boolean,
          CountryOfCitizenship: String,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        sectionComplete: Boolean
      }, // end transportationSarf
      hraEdd:{
        hraEdd:{
          eddRequired: Boolean,
          addTracking: Boolean,
          rationale: String,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          raCorrectionRequired: Boolean,
          comments: String,
          complete: Boolean
        },
        sectionComplete: Boolean
      }, // end hraEdd
      qcChecklist:{
        qcInformation:{
          qcName: String,
          dateReceived: Date,
          firstReview: Boolean,
          secondReview: Boolean,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          complete: Boolean
        },
        qcReview:{
          spellingAndLanguage:String,
          reasonableness: Boolean,
          documentation: Boolean,
          completeSarf: Boolean,
          completeFields: Boolean,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }],
          comments: String,
          complete: Boolean
        }
      },//end qcChecklist
      ousEntity:{
        ousEntity:{
          hasOus: Boolean,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }]
        },
        sectionComplete: Boolean
      }, // end ousEntity
      mmb:{
        managedReportingAttributes:{
          customer: String,
          divison: String,
          rcbo: String,
          div: String,
          attachments : [{
                icon: String,
                fileName: String,
                filePath: String,
                fileType: String,
                uploader: String,
                section: String,
                comment: String
              }]
        },
        sectionComplete: Boolean
      } //end mmb
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
      wfrcRejectReason:{
        administrative: Boolean,
        ccdNotMet: Boolean,
        missingBo: Boolean,
        sharedCustomer: Boolean,
        incompleteInfo: Boolean,
        incorrectCustomerType: Boolean,
        screeningAndDispositioning: Boolean,
        missingHraForm: Boolean,
        badAmlFactors: Boolean,
        badAmlRisk: Boolean,
        escalations: Boolean
      },// end wfrcRejectReason
      middleOfficeFlags:{
         raiseQuestion: Boolean,
         generalScopeQuestion: Boolean,
         lobDispute: Boolean,
         disregardedEntity: Boolean,
         incorrectInvestment: Boolean,
         crossLobEscalation: Boolean,
         pendingDisposition: Boolean,
         riskChange: Boolean,
         fund: Boolean,
         pendingMerge: Boolean
      }, //end middleOfficeFlags
      lobFlags:{
        pepEscalation: Boolean,
        sarfNegativeNews: Boolean,
        systemOfRecordUpdateRequired: Boolean,
        sarfOther: Boolean
      }, // end LobFlags
      wfcrcFlags:{
        bearerShareIssuingEntity: Boolean,
        exemptionRequested: Boolean,
        referredToExit: Boolean,
        exceptionRquested: Boolean,
        customerTypeQuestion: Boolean,
        materialNegativeNews: Boolean,
        restrictedCustomer: Boolean
      }, // end wfcrcFlags
      primaryLobTracking:{
        primaryLobGroup: String,
        receivedDate: Date,
        requestDate: Date,
        escalationRequired: Boolean,
        escalationDate: Date,
        primaryRm: String,
        primaryRmRequestDate: Date,
        primaryLobContactName: String,
        primaryLobReceiveDate: Date,
        primaryLobEscalationContact: String
      }, //end primaryLobTracking
      customerInformation:{
        reportDate: Date,
        fullLegalNameOfCustomer: String,
        fullLegalAddressOfCustomer: String,
        relationshipName: String,
        reviewPeriodFrom: Date,
        reviewPeriodTo: Date,
        customerType: String
      }, // end customerInformation
      summaryOfCustomerRelationShip:{
        customerBusinessModel: String,
        wcisRelationship: String,
        customerRelationship: String
      }, // end summaryOfCustomerRelationShip
      highRiskCustomerFactors:{
        countryRisk: String,
        highRiskCustomerFactors: String,
        industryRisk: String,
        ownershipAndOperationalRisk: String,
        bsaRiskRatingAndRiskCode: String
      }, //end highRiskCustomerFactors
      relationshipOverview:{
        products: String,
        productsAndServicesOverview: String,
        avaAlerts: String,
        highRiskProductUsageAnalysis: String,
        transactionRisk: String
      }, // end relationshipOverview
      productAnalysisAndHighRiskProducts:{
        cashVault: String,
        internationalWires: String,
        desktopDeposit: String,
        achDomestic: String
      }, // end productAnalysisAndHighRiskProducts
      dueDiligenceUpdate:{
        unusualActivitiy: String,
        totalNumberofUnusualActivity: String,
        pep: String,
        adverseNews: String,
        publicInfo: String,
        highRiskProductUsage: String,
        amlRiskSummary: String
      }, // end dueDiligenceUpdate
      enhancedDdueDiligence:{
        highRiskFactors: String,
        sourceOfWealth: String,
        adversNewsSearch: String
      }, //end enhancedDdueDiligence
      relationShipNameApproval:{
        rmName: String,
        primayLobApproverName: String,
        wfcrcApproverName: String,
        rmApprovalDate: Date,
        primaryLobApprovalDate: Date,
        wfcrcApprovalDate: Date
      } // end relationShipNameApproval
    }, // end research
    history:{

    }// end history
  } // end desc

},{
    collection: "Cases"
});*/

//module.exports = mongoose.model('Requirement', Requirement);
