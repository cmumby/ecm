var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var RegisteredAddress = require('./RegisteredAddress');
var PhysicalAddress = require('./PhysicalAddress');
var LegalEntity = require('./LegalEntity');
var LegalFormation = require('./LegalFormation');
var NatureOfBusiness = require('./NatureOfBusiness');
var MarketsServed = require('./MarketsServed');
var RelatedParties = require('./RelatedParties');
var ProductsAndServices = require('./ProductsAndServices');
var Pep = require('./Pep');




var ProxyRR = new Schema({
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