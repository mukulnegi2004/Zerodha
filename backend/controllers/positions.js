const { PositionsModel } = require("../models/PositionsModel")

const totalPositions = async (req, res, next) => {
    let allPositions = await PositionsModel.find();
    res.json(allPositions);
}












module.exports = { totalPositions };