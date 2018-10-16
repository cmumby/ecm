let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let RegisteredAddress = require('./RegisteredAddress');
let PhysicalAddress = require('./PhysicalAddress');
let LegalEntity = require('./LegalEntity');
let LegalFormation = require('./LegalFormation');
let NatureOfBusiness = require('./NatureOfBusiness');
let MarketsServed = require('./MarketsServed');
let RelatedParties = require('./RelatedParties');
let ProductsAndServices = require('./ProductsAndServices');
let Pep = require('./Pep');

let ProxyRR = new Schema({
    registeredAddress: RegisteredAddress,
    physicalAddress: [PhysicalAddress],
    legalEntity: LegalEntity,
    legalFormation: LegalFormation,
    natureOfBusiness: NatureOfBusiness,
    marketsServed: MarketsServed,
    relatedParties: RelatedParties,
    pep: Pep,
    productsAndServices: ProductsAndServices,
    sectionComplete: Boolean    
});