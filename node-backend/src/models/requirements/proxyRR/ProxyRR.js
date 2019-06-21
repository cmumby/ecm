const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RegisteredAddress = require('./RegisteredAddress');
const PhysicalAddress = require('./PhysicalAddress');
const LegalEntity = require('./LegalEntity');
const LegalFormation = require('./LegalFormation');
const NatureOfBusiness = require('./NatureOfBusiness');
const MarketsServed = require('./MarketsServed');
const RelatedParties = require('./RelatedParties');
const ProductsAndServices = require('./ProductsAndServices');
const Pep = require('./Pep');

const ProxyRR = new Schema({
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