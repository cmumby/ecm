//Case.js

let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ProxyRR = require("./proxyRR/ProxyRR");
let Cip = require("./cip/Cip");
let Remediation = require("./remediation/Remediation");
let RelatedParties = require("./related-parties/RelatedParties");
let Screening = require("./screening/Screening");
let Documentation = require("./documentation/Documentation");
let TransportationSarf = require("./transportationSarf/TransportationSarf");
let HraEdd = require("./hraedd/HraEdd");
let QcChecklist = require("./qcchecklist/QcChecklist");
let Mmb = require("./mmb/Mmb");
let OusEntity = require("./ousentity/OusEntity");


//schema
let Requirement = new Schema({
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