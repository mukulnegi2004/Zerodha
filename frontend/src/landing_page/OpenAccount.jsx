import {Link} from "react-router-dom";

function OpenAccount(){
    return(
        <div className="container p-5 mb-5">
            <div className="row text-center">
                <h1 className="mt-5">Open a Zerodha Account</h1>
                <p>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
                <button className="p-2 fs-5 btn btn-primary mb-5" style={{width: "20%", margin: "0 auto"}}><Link className="nav-link active" to="/signup" style={{marginLeft: 0}}>Signup now</Link></button>
            </div>

        </div>
    );
}

export default OpenAccount;