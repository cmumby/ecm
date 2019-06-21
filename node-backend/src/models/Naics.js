//Naics.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schema
const Naics = new Schema({ 
    _comment: String,
    trilateral: Number,
    code: Number,
    description: String,
    title: String
}, {
    collection: 'Naics'
});

module.exports = mongoose.model('Naics', Naics);

/*{  "_comment": "http://api.naics.us/v0/q?year=2012",
        "seq_no": 1,
        "trilateral": 1,
        "code": 11,
        "description": [
            "The Sector as a Whole",
            "The Agriculture, Forestry, Fishing and Hunting sector comprises establishments primarily engaged in growing crops, raising animals, harvesting timber, and harvesting fish and other animals from a farm, ranch, or their natural habitats.",
            "The establishments in this sector are often described as farms, ranches, dairies, greenhouses, nurseries, orchards, or hatcheries.  A farm may consist of a single tract of land or a number of separate tracts which may be held under different tenures.  For example, one tract may be owned by the farm operator and another rented.  It may be operated by the operator alone or with the assistance of members of the household or hired employees, or it may be operated by a partnership, corporation, or other type of organization. When a landowner has one or more tenants, renters, croppers, or managers, the land operated by each is considered a farm.",
            "The sector distinguishes two basic activities: agricultural production and agricultural support activities.  Agricultural production includes establishments performing the compconste farm or ranch operation, such as farm owner-operators, tenant farm operators, and sharecroppers.  Agricultural support activities include establishments that perform one or more activities associated with farm operation, such as soil preparation, planting, harvesting, and management, on a contract or fee basis.",
            "Excluded from the Agriculture, Forestry, Fishing and Hunting sector are establishments primarily engaged in agricultural research and establishments primarily engaged in administering programs for regulating and conserving land, mineral, wildlife, and forest use.  These establishments are classified in Industry 54171, Research and Development in the Physical, Engineering, and Life Sciences; and Industry 92412, Administration of Conservation Programs, respectively."
        ],
        "title": "Agriculture, Forestry, Fishing and Hunting"
}, */