import "./register.scss";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import ADD from '../assets/add.png';
import BKG from '../assets/MATESAPP.png';

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
        if (e.target.files[0]) {
            document.getElementById(
                "avt-test"
            ).innerHTML = `<img src=${URL.createObjectURL(
                e.target.files[0]
            )} alt="" /> <span>${e.target.files[0].name} </span>`;
        }
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
        <div className="register-container" style={{ backgroundImage: `url(${BKG})` }}>
            <div className="register-wrapper">
                <h1 className="register-title">YouChat</h1>
                <p className="register-title2">Register</p>
                <form className="register-form">
                    <input className="user" name='user' type="text" placeholder="Username" onChange={handleChange} />
                    <input className="mail" name='mail' type="email" placeholder="Email" onChange={handleChange} />
                    <input className="pwd" name='pwd' type="password" placeholder="Password" onChange={handleChange} />
                    <div className="avat-div">
                        <label htmlFor='file' id='avt-test' className="avatar-txt"><img src={ADD}></img><p>Add an avatar</p></label>
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