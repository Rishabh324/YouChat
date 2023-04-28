import "./register.scss";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [user, setUser] = useState(null);
    const [mail, setMail] = useState(null);
    const [pwd, setPwd] = useState(null);
    const [profimg, setProfimg] = useState(null);
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, 'hello', value);
        if (name === "user") {
            setUser(value);
        } else if (name === "mail") {
            setMail(value);
        } else {
            setPwd(value);
        }
    }

    const onChangePicture = e => {
        setProfimg(e.target.files[0]);
    };

    const handleClick = async (e) => {
        e.preventDefault();


        try {
            const res = await createUserWithEmailAndPassword(auth, mail, pwd);
            const storageRef = ref(storage, `images/${profimg.name}`);
            const uploadTask = uploadBytesResumable(storageRef, profimg);

            uploadTask.on('state_changed',
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log(downloadURL)
                        await updateProfile(res.user, {
                            displayName: user,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName: user,
                            email: mail,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, 'userChats', res.user.uid), {});
                        navigate("/");
                    })
                }
            );


        }
        catch (e) {
            setErr(true);
        }
    }

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <h1 className="login-title">MatesApp</h1>
                <p className="login-title2">Register</p>
                <form className="login-form">
                    <input className="user" name='user' type="text" placeholder="Username" onChange={handleChange} />
                    <input className="mail" name='mail' type="email" placeholder="Email" onChange={handleChange} />
                    <input className="pwd" name='pwd' type="password" placeholder="Password" onChange={handleChange} />
                    <div className="avat-div">
                        <img src='src/assets/add.png'></img>
                        <label htmlFor='file' className="avatar-txt">Add an avatar</label>
                        <input type="file" id="file" multiple='single' name="file" accept="image/*" onChange={onChangePicture} />
                    </div>
                    <button className="sb-btn" type="submit" onClick={handleClick}>Register</button>
                    {err && <span className="err-msg">Something went wrong!</span>}
                </form>
                <p className="reg-temp" >Already have an account? <span className="reg"><Link to='/login'>Login</Link></span></p>
            </div>
        </div>
    );
}

export default Register;