import "./Signup.css";
import { useState } from "react";
import axios from "axios";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const signUp = async () => {
        setLoading(true);
        setError("");
        try{
            let newUser = {
                name: username.trim(),
                email: email.toLowerCase(),
                password: pass
            }

            const url = `${import.meta.env.VITE_API_URL}/signup`;
            await axios.post(url, newUser, {
                withCredentials: true
            });
            setUsername("");
            setEmail("");
            setPass("");

            window.location.href = `${import.meta.env.VITE_DASH_URL}`;
        }catch(err){
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp();
    }

    return (
        <div className="container signup p-5 mt-3">
            <h1 className="text-center">Signup</h1>
            <form className="needs-validation"  onSubmit={handleSubmit} noValidate>
                <div className="mb-3 row align-items-center">
                    <label htmlFor="username" className="col-4 col-form-label">Username</label>
                    <div className="col-12">
                        <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} value={username} className="form-control" required/>
                        <div className="valid-feedback">Looks good!</div>
                    </div>
                </div>

                <div className="mb-3 row align-items-center">
                    <label htmlFor="email" className="col-4 col-form-label col-md-12">Email</label>
                    <div className="col-12">
                        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" required/>
                    </div>
                </div>

                <div className="mb-3 row align-items-center">
                    <label htmlFor="password" className="col-4 col-form-label col-md-12">Password</label>
                    <div className="col-12">
                        <input type="password" id="password" name="password" onChange={(e) => setPass(e.target.value)} value={pass} className="form-control" required/>
                    </div>
                </div>

                {error && <p style={{color: "red"}} className="mt-4">{error}</p>}

                <div className="d-flex justify-content-center mt-4 mb-4">
                    <button className="px-4 fs-5 btn btn-primary mb-5">{loading? "signing up..": "signup"}</button>
                </div>
            </form>
        </div>
    )

}

export default Signup;