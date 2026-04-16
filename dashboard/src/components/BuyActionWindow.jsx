import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
    const { closeBuyWindow} = useContext(GeneralContext);

    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(0.0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0);

    const handleBuyClick = async () => {
        if(loading) return;
        try {
            setLoading(true);
            if(stockQuantity * stockPrice > balance){
                throw new Error("Insufficient balance. Please add more money to complete the purchase.");
            }

            if (stockQuantity <= 0 || stockPrice <= 0) {
                throw new Error("Invalid qty or price", 400);
            }

            const url = `${import.meta.env.VITE_API_URL}/orders`;

            await axios.post(url, {
                name: uid.trim(),
                qty: stockQuantity,
                price: stockPrice,
                mode: "BUY",
            }, {
                withCredentials: true
            });

            closeBuyWindow();
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally{
            setLoading(false);
        }
    };

    const handleCancelClick = () => {
        closeBuyWindow();
    };

    useEffect(() => {
        async function get() {
            try {
                const url = `${import.meta.env.VITE_API_URL}/wallet`;
                let resp = await axios.get(url, {
                    withCredentials: true
                })
                setBalance(resp.data.wallet);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            }
        }
        get();
    }, [])

    return (
        <div className="container" id="buy-window" draggable="true">
            <div className="regular-order">
                <div className="inputs">
                    <fieldset>
                        <legend>Qty.</legend>
                        <input
                            type="number"
                            name="qty"
                            id="qty"
                            step={1}
                            onChange={(e) => {
                                setStockQuantity(Number(e.target.value));
                                setError("");
                            }}
                            min={1}
                            value={stockQuantity}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Price</legend>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            step="0.5"
                            min={0.0}
                            onChange={(e) => {
                                setStockPrice(Number(e.target.value));
                                setError("");
                            }}
                            value={stockPrice}
                        />
                    </fieldset>
                </div>
                {error && <p style={{ color: "red"}}>⚠️{error}</p>}
            </div>

            <div className="buttons">
                <span>Margin required ₹140.65</span>
                <div>
                    <Link className="btn btn-blue" onClick={handleBuyClick}>{loading ? "placing..." : "buy"}</Link>
                    <Link to="" className="btn btn-grey" onClick={handleCancelClick}>Cancel</Link>
                </div>
            </div>
        </div>
    );
};

export default BuyActionWindow;