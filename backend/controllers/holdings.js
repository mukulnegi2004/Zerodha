const { HoldingsModel } = require("../models/HoldingsModel");

const totalHoldings = async (req, res, next) => {
    let allHoldings = await HoldingsModel.find();
    res.json(allHoldings);

}


module.exports = { totalHoldings };