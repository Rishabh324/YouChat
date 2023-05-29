import "./login.scss";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from '../firebase';

const Login = () => {
    const [email, setEmail] = useState(null);
    const [pswd, setPswd] = useState(null);
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "pswd") {
            setPswd(value);
        }
    }

    const myFunction = () => {
        var x = document.getElementById("pwd");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    };

    const styleForShowPassLabel = {
        color: "white",
        userSelect: "none",
    };


    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, pswd);
            navigate("/");
        }
        catch (e) {
            setErr(true);
        }
    }

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <h1 className="login-title">YouChat</h1>
                <p className="login-title2">Login</p>
                <form className="login-form">
                    <input className="user" name='email' type="text" placeholder="Email" onChange={handleChange} />
                    <input className="pwd" id='pwd' name='pswd' type="password" placeholder="Password" onChange={handleChange} />
                    <div style={{ display: "flex" }}>
                        <input type="checkbox" onClick={myFunction} id="showpass" />
                        <label style={styleForShowPassLabel} htmlFor="showpass">
                            Show Password
                        </label>
                    </div>
                    <button className="sb-btn" type="submit" onClick={handleClick}>Login</button>
                    {err && <p>User does not exist!</p>}
                </form>
                <p className="reg-temp">Don't have an account? <span className="reg"><Link to='/register'>Register</Link></span></p>
            </div>
        </div>
    );
}

export default Login;