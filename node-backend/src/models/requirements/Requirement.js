//Case.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProxyRR = require("./proxyRR/ProxyRR");
const Cip = require("./cip/Cip");
const Remediation = require("./remediation/Remediation");
const RelatedParties = require("./related-parties/RelatedParties");
const Screening = require("./screening/Screening");
const Documentation = require("./documentation/Documentation");
const TransportationSarf = require("./transportationSarf/TransportationSarf");
const HraEdd = require("./hraedd/HraEdd");
const QcChecklist = require("./qcchecklist/QcChecklist");
const Mmb = require("./mmb/Mmb");
const OusEntity = require("./ousentity/OusEntity");


//schema
const Requirement = new Schema({
  proxyRR: ProxyRR,
  cip: Cip,
  remediation: Remediation,
  relatedParties: RelatedParties,
  screening: Screening,
  documentation: Documentation,
  transportationSarf: TransportationSarf,
  hraEdd: HraEdd,
  qcChecklist: QcChecklist,
  ousEntity: OusEntity,
  mmb: Mmb
});