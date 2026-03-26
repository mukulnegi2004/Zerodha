const mongoose = require("mongoose");
const {PositionsSchema} = require("../schemas/positionsSchema");


const PositionsModel = mongoose.model("Position", PositionsSchema);



module.exports = {PositionsModel};





























