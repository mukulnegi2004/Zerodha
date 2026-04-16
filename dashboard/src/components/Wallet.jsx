import { useEffect, useState } from "react";
import axios from "axios";
function Wallet() {
    const [add, setAdd] = useState(0);
    const [error, setError] = useState("");
    const [balance, setBalance] = useState(0);

    const addMoney = async () => {
        const amount = Math.floor(Number(add));

        if (!amount || amount <= 0) {
            setError("Enter a valid amount");
            return;
        }
        try {
            const url = `${import.meta.env.VITE_API_URL}/wallet`;
            let resp = await axios.post(url, { add: amount}, {
                withCredentials: true
            })
            setBalance(resp.data.wallet);
            setError("");
            setAdd(0);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    }

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
        <div className="card shadow wallet-card">
            <h5 className="card-header text-center">Wallet</h5>

            <div className="card-body text-center">

                <div className="input-group  mb-3 w-75 mx-auto">
                    <span className="input-group-text">₹</span>
                    <input
                        type="number"
                        min={1}
                        step={1}
                        className="form-control"
                        placeholder="Enter amount"
                        value={add}
                        onChange={(e) => setAdd(Math.floor(Number(e.target.value)))}
                    />
                    <span className="input-group-text">.00</span>
                </div>

                <button className="btn btn-primary w-50 mb-3" onClick={addMoney}>
                    Add Money
                </button>

                {error && <p className="text-danger">{error}</p>}

                <p className="fw-semibold text-muted balance">
                    Available Balance: ₹{balance}
                </p>

            </div>
        </div >
    )
}



export default Wallet;