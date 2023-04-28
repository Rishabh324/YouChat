import { useContext, useState } from "react";
import Chats from "./Chats";
import { collection, query, where, getDocs, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const SearchBar = () => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const searchUser = async () => {
        // const userRef = ref(db, 'users');
        const q = query(collection(db, 'users'), where('displayName', '==', username));

        try {
            console.log(q);
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            })
        } catch (e) {
            console.log(e);
            setErr(true);
        }
    };

    const handleKey = (e) => {
        e.code === 'Enter' && searchUser();
    };

    const { currentUser } = useContext(AuthContext);

    const handleSelect = async () => {
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDocs(doc(db, 'chats', combinedId));
            if (!res.exists()) {
                await setDoc(doc, db, "chats", combinedId, {
                    messages: []
                })

                await updateDoc(doc, db, 'userChats', currentUser.uid), {
                    [combinedId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                }

                await updateDoc(doc, db, 'userChats', user.uid), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                }
            }
        } catch (e) {
            
        }
    };

    return (
        <div className="search-bar">
            <input className='inputInput' placeholder='Search Contact...' onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)}></input>
            {err && <p style={{ color: 'red' }}>User not found</p>}
            {user && <Chats user={user} />}
        </div>
    )
};

export default SearchBar;