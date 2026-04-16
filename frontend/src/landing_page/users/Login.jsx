import { useState } from "react";
import "./Login.css";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        setError("");
        try{
            let user = {
                email: email.toLowerCase(),
                password: pass
            }
            console.log("LOGIN FUNCTION CALLED");
            const url = `${import.meta.env.VITE_API_URL}/login`;

            let resp = await axios.post(url, user, {
                withCredentials: true
            });

            console.log(resp.data);

            setEmail("");
            setPass("");

            window.location.href = `${import.meta.env.VITE_DASH_URL}`;

        }catch(err){
            setError(err.response?.data?.message || err.message);
        }finally{
            setLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
    }

    return (
        <div className="container login p-5 mt-3">
            <h1 className="text-center">Login</h1>
            <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                <div className="mb-3 row align-items-center">
                    <label htmlFor="email" className="col-4 col-form-label col-md-12">Email</label>
                    <div className="col-12">
                        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" required />
                    </div>
                </div>

                <div className="mb-3 row align-items-center">
                    <label htmlFor="password" className="col-4 col-form-label col-md-12">Password</label>
                    <div className="col-12">
                        <input type="password" id="password" name="password" onChange={(e) => setPass(e.target.value)} value={pass} className="form-control" required />
                    </div>
                </div>

                {error && <p style={{color: "red"}} className="mt-4" >{error}</p>}

                <div className="d-flex justify-content-center mt-4 mb-4">
                    <button type="submit" className="px-4 fs-5 btn btn-primary mb-5" disabled={loading}>{loading? "Logging in" : "Login"}</button>
                </div>
            </form>
        </div>
    )

}

export default Login;