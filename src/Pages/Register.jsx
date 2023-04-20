import "./register.scss";

const Register = () => {
    return (
        <div className="login-container">
            <div className="login-wrapper">
                <h1 className="login-title">MatesApp</h1>
                <p className="login-title2">Register</p>
                <form className="login-form">
                    <input className="user" type="text" placeholder="Username" />
                    <input className="mail" type="email" placeholder="Email" />
                    <input className="pwd" type="password" placeholder="Password" />
                    <button className="sb-btn" type="submit">Register</button>
                </form>
                <p className="reg-temp">Already have an account? <span className="reg">Login</span></p>
            </div>
        </div>
    );
}

export default Register;