import "./login.scss";

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-wrapper">
                <h1 className="login-title">MatesApp</h1>
                <p className="login-title2">Login</p>
                <form className="login-form">
                    <input className="user" type="text" placeholder="Username" />
                    <input className="pwd" type="password" placeholder="Password" />
                    <button className="sb-btn" type="submit">Login</button>
                </form>
                <p className="reg-temp">Don't have an account? <span className="reg">Register</span></p>
            </div>
        </div>
    );
}

export default Login;