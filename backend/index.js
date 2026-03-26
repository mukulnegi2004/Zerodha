require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());                                          //parses incoming JSON request data and makes it available in req.body

let port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`app is listening at port: ${port}`)
})

async function main() {
    try {
        let url = process.env.MONGO_URL;
        await mongoose.connect(url);
        console.log("connection successful");

    } catch (err) {
        console.log(err);
    }
}
main();




// // Adding starter data
// const {HoldingsModel} = require("./models/HoldingsModel");
// const {holdings} = require("../dashboard/src/data/data");
// app.get("/addHoldings", async (req, res, next) => {
//     try{
//         await HoldingsModel.deleteMany({});
//         const inserted = await HoldingsModel.insertMany(holdings);
//         console.log(inserted);
//         res.send("data inserted");

//     }catch(err){
//         next(err);
//     }
// })


// const {PositionsModel} = require("./models/PositionsModel");
// const {positions} = require("../dashboard/src/data/data");
// app.get("/addPositions", async (req, res, next) => {
//     try{
//         await PositionsModel.deleteMany({});
//         const inserted = await PositionsModel.insertMany(positions);
//         console.log(inserted);
//         res.send("data inserted");

//     }catch(err){
//         next(err);
//     }
// })




app.get("/allHoldings", async (req, res, next) => {
    try {
        let allHoldings = await HoldingsModel.find();
        res.json(allHoldings);

    } catch (err) {
        next(err);
    }

})

app.get("/allPositions", async (req, res, next) => {
    try {
        let allPositions = await PositionsModel.find();
        res.json(allPositions);
    } catch (err) {
        next(err);
    }

})

app.post("/newOrder", async (req, res, next) => {
    try {
        let newOrder = new OrdersModel({
            name: req.body.name,
            qty: req.body.qty,
            price: req.body.price,
            mode: req.body.mode,
        })
        await newOrder.save();

    } catch (err) {
        next(err);
    }
})




























